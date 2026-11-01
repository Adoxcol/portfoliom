// Vercel serverless function: GET /api/spotify
// Returns what Mahmood is listening to, plus recent plays and top items.
// Requires SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET and SPOTIFY_REFRESH_TOKEN.
// Optional: SPOTIFY_PLAYLIST_ID. Run `node scripts/spotify-auth.mjs` to get a token.

interface Res {
  status(code: number): Res;
  setHeader(name: string, value: string): void;
  json(body: unknown): void;
}

interface Image {
  url: string;
}
interface Artist {
  name: string;
  external_urls?: { spotify?: string };
  images?: Image[];
  genres?: string[];
}
interface Track {
  name: string;
  duration_ms: number;
  external_urls?: { spotify?: string };
  artists: Artist[];
  album?: { name: string; images?: Image[] };
}

const API = "https://api.spotify.com/v1";

async function accessToken(): Promise<string> {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
    process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new Error("not-configured");
  }
  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });
  if (!response.ok) throw new Error("auth-failed");
  return (await response.json()).access_token;
}

async function get<T>(token: string, path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 204 || !response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

const shapeTrack = (track: Track) => ({
  title: track.name,
  artist: track.artists.map((artist) => artist.name).join(", "),
  album: track.album?.name ?? "",
  cover: track.album?.images?.[track.album.images.length - 1]?.url ?? null,
  url: track.external_urls?.spotify ?? null,
  durationMs: track.duration_ms,
});

export default async function handler(_req: unknown, res: Res) {
  try {
    const token = await accessToken();
    const playlistId = process.env.SPOTIFY_PLAYLIST_ID;
    const [current, recent, topTracks, topArtists, playlist] =
      await Promise.all([
        get<{
          is_playing: boolean;
          progress_ms: number;
          currently_playing_type: string;
          item: Track | null;
        }>(token, "/me/player/currently-playing"),
        get<{ items: { track: Track; played_at: string }[] }>(
          token,
          "/me/player/recently-played?limit=10",
        ),
        get<{ items: Track[] }>(
          token,
          "/me/top/tracks?limit=10&time_range=short_term",
        ),
        get<{ items: Artist[] }>(
          token,
          "/me/top/artists?limit=10&time_range=short_term",
        ),
        playlistId
          ? get<{ name: string; external_urls?: { spotify?: string }; tracks?: { items: { track: Track | null }[] }; items?: { items: { item?: Track | null; track?: Track | null }[] } }>(
              token,
              `/playlists/${playlistId}?fields=name,external_urls,tracks.items(track(name,duration_ms,artists(name),album(name,images),external_urls)),items.items(item(name,duration_ms,artists(name),album(name,images),external_urls))`,
            )
          : Promise.resolve(null),
      ]);

    const playlistTracks = (
      playlist?.tracks?.items.map((entry) => entry.track) ??
      playlist?.items?.items.map((entry) => entry.item ?? entry.track) ??
      []
    ).filter((track): track is Track => Boolean(track));

    res.setHeader(
      "Cache-Control",
      "s-maxage=20, stale-while-revalidate=60",
    );
    res.status(200).json({
      configured: true,
      nowPlaying:
        current?.item && current.currently_playing_type === "track"
          ? {
              ...shapeTrack(current.item),
              isPlaying: current.is_playing,
              progressMs: current.progress_ms,
            }
          : null,
      recent: (recent?.items ?? []).map((entry) => ({
        ...shapeTrack(entry.track),
        playedAt: entry.played_at,
      })),
      topTracks: (topTracks?.items ?? []).map(shapeTrack),
      topArtists: (topArtists?.items ?? []).map((artist) => ({
        name: artist.name,
        url: artist.external_urls?.spotify ?? null,
        genre: artist.genres?.[0] ?? "",
      })),
      playlist: playlist
        ? {
            name: playlist.name,
            url: playlist.external_urls?.spotify ?? null,
            tracks: playlistTracks.slice(0, 15).map(shapeTrack),
          }
        : null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "error";
    res.status(message === "not-configured" ? 200 : 502).json({
      configured: message !== "not-configured",
      error: message,
    });
  }
}
