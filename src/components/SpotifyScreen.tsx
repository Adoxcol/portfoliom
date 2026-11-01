import { useCallback, useEffect, useState } from "react";

interface TrackInfo {
  title: string;
  artist: string;
  album: string;
  cover: string | null;
  url: string | null;
  durationMs: number;
  playedAt?: string;
}
interface Data {
  configured: boolean;
  error?: string;
  nowPlaying:
    | (TrackInfo & { isPlaying: boolean; progressMs: number })
    | null;
  recent: TrackInfo[];
  topTracks: TrackInfo[];
  topArtists: { name: string; url: string | null; genre: string }[];
  playlist: { name: string; url: string | null; tracks: TrackInfo[] } | null;
}
type Tab = "now" | "recent" | "tracks" | "artists" | "playlist";
const tabs: { id: Tab; label: string; key: string }[] = [
  { id: "now", label: "Now", key: "1" },
  { id: "recent", label: "Recent", key: "2" },
  { id: "tracks", label: "Tracks", key: "3" },
  { id: "artists", label: "Artists", key: "4" },
  { id: "playlist", label: "Playlist", key: "5" },
];
const clock = (ms: number) =>
  `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, "0")}`;
const ago = (iso?: string) => {
  if (!iso) return "";
  const minutes = Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 1440) return `${Math.round(minutes / 60)}h ago`;
  return `${Math.round(minutes / 1440)}d ago`;
};

const demoTrack = (title: string, artist: string, minutes: number): TrackInfo => ({
  title,
  artist,
  album: "Sample Album",
  cover: null,
  url: null,
  durationMs: minutes * 60000,
  playedAt: new Date(Date.now() - minutes * 5 * 60000).toISOString(),
});
const demoData: Data = {
  configured: true,
  nowPlaying: {
    ...demoTrack("Sample Track", "Sample Artist", 3),
    progressMs: 71000,
    isPlaying: true,
  },
  recent: [
    demoTrack("Midnight Drive", "Neon Harbor", 4),
    demoTrack("Soft Static", "Paper Moon", 3),
    demoTrack("Glass Hours", "Low Tide", 5),
  ],
  topTracks: [
    demoTrack("Afterglow", "Violet Line", 4),
    demoTrack("Signal Bloom", "Paper Moon", 3),
    demoTrack("Northern Lights", "Low Tide", 4),
  ],
  topArtists: [
    { name: "Paper Moon", url: null, genre: "dream pop" },
    { name: "Low Tide", url: null, genre: "ambient" },
    { name: "Violet Line", url: null, genre: "synthwave" },
  ],
  playlist: {
    name: "Late Night Coding",
    url: null,
    tracks: [
      demoTrack("Pixel Rain", "Neon Harbor", 3),
      demoTrack("Backup Plan", "Violet Line", 4),
    ],
  },
};
const demoMode =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("spotify-demo");

function Cover({ src }: { src: string | null }) {
  return (
    <div className="spot-cover" aria-hidden="true">
      {src ? <img src={src} alt="" /> : <span>♪</span>}
    </div>
  );
}

export default function SpotifyScreen() {
  const [data, setData] = useState<Data | null>(demoMode ? demoData : null);
  const [state, setState] = useState<"loading" | "ready" | "offline">(
    demoMode ? "ready" : "loading",
  );
  const [tab, setTab] = useState<Tab>("now");
  const [progress, setProgress] = useState(demoMode ? 71000 : 0);

  const load = useCallback(async () => {
    if (demoMode) return;
    try {
      const response = await fetch("/api/spotify");
      if (!response.headers.get("content-type")?.includes("json")) {
        throw new Error("no-api");
      }
      const body = (await response.json()) as Data;
      if (!response.ok || !body.configured) throw new Error("offline");
      setData(body);
      setProgress(body.nowPlaying?.progressMs ?? 0);
      setState("ready");
    } catch {
      setState((current) => (current === "ready" ? current : "offline"));
    }
  }, []);

  useEffect(() => {
    void load();
    const timer = setInterval(() => {
      if (!document.hidden) void load();
    }, 30000);
    return () => clearInterval(timer);
  }, [load]);

  const playing = data?.nowPlaying?.isPlaying ?? false;
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setProgress((value) => value + 1000), 1000);
    return () => clearInterval(timer);
  }, [playing, data]);

  const now = data?.nowPlaying;
  const duration = now?.durationMs ?? 1;
  const pct = Math.min(100, (progress / duration) * 100);
  const status =
    state === "ready"
      ? playing
        ? "ON AIR"
        : "STANDBY"
      : state === "loading"
        ? "TUNING"
        : "OFFLINE";

  function list(items: TrackInfo[], showTime = false) {
    if (!items.length) return <p className="spot-empty">Nothing here yet.</p>;
    return (
      <ol className="spot-list">
        {items.map((item, index) => (
          <li key={`${item.title}-${index}`}>
            <span className="spot-rank">{String(index + 1).padStart(2, "0")}</span>
            <a href={item.url ?? undefined} target="_blank" rel="noreferrer">
              <strong>{item.title}</strong>
              <small>{item.artist}</small>
            </a>
            <em>{showTime ? ago(item.playedAt) : clock(item.durationMs)}</em>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div className="window-content spotify-screen">
      <div className="spot-tabs" role="tablist" aria-label="Spotify views">
        {tabs.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={tab === item.id}
            className={tab === item.id ? "active" : ""}
            onClick={() => setTab(item.id)}
          >
            <kbd>{item.key}</kbd> {item.label}
          </button>
        ))}
      </div>

      <div className="spot-bezel">
        <div className="spot-header">
          <span>
            <i className={`spot-led ${state === "ready" ? "on" : ""} ${playing ? "live" : ""}`} />
            {status}
          </span>
          <span>SPOTIFY // {tabs.find((item) => item.id === tab)?.label.toUpperCase()}</span>
          <span>{demoMode ? "DEMO DATA" : "CH. 01"}</span>
        </div>

        <div className="spot-crt" aria-live="polite">
          {state === "loading" && (
            <div className="spot-center">
              <p className="spot-title">TUNING IN<span className="spot-cursor">_</span></p>
            </div>
          )}
          {state === "offline" && (
            <div className="spot-center">
              <p className="spot-title spot-blink">NO SIGNAL</p>
              <p className="spot-sub">
                The Spotify feed is offline right now. Check back soon.
              </p>
            </div>
          )}
          {state === "ready" && data && tab === "now" && (
            <div className="spot-now">
              <div className={`spot-disc ${playing ? "spin" : ""}`}>
                <Cover src={now?.cover ?? null} />
              </div>
              <div className="spot-meta">
                {now ? (
                  <>
                    <p className="spot-kicker">
                      {playing ? "▶ NOW PLAYING" : "❚❚ PAUSED"}
                    </p>
                    <h2>{now.title}</h2>
                    <p className="spot-artist">{now.artist}</p>
                    <p className="spot-album">{now.album}</p>
                    <div
                      className={`spot-eq ${playing ? "live" : ""}`}
                      aria-hidden="true"
                    >
                      {Array.from({ length: 16 }, (_, index) => (
                        <i key={index} style={{ animationDelay: `${index * 80}ms` }} />
                      ))}
                    </div>
                    <div className="spot-progress" aria-hidden="true">
                      <i style={{ width: `${pct}%` }} />
                    </div>
                    <p className="spot-times">
                      <span>{clock(Math.min(progress, duration))}</span>
                      <span>{clock(duration)}</span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="spot-kicker">■ STANDBY</p>
                    <h2>Silence</h2>
                    <p className="spot-artist">Nothing playing at the moment.</p>
                    {data.recent[0] && (
                      <p className="spot-album">
                        Last heard: {data.recent[0].title} — {data.recent[0].artist}{" "}
                        ({ago(data.recent[0].playedAt)})
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {state === "ready" && data && tab === "recent" && list(data.recent, true)}
          {state === "ready" && data && tab === "tracks" && list(data.topTracks)}
          {state === "ready" && data && tab === "artists" && (
            <ol className="spot-list">
              {data.topArtists.map((artist, index) => (
                <li key={artist.name}>
                  <span className="spot-rank">{String(index + 1).padStart(2, "0")}</span>
                  <a href={artist.url ?? undefined} target="_blank" rel="noreferrer">
                    <strong>{artist.name}</strong>
                    <small>{artist.genre || "—"}</small>
                  </a>
                  <em />
                </li>
              ))}
            </ol>
          )}
          {state === "ready" && data && tab === "playlist" &&
            (data.playlist ? (
              <>
                <p className="spot-kicker">
                  ♫{" "}
                  <a href={data.playlist.url ?? undefined} target="_blank" rel="noreferrer">
                    {data.playlist.name}
                  </a>
                </p>
                {list(data.playlist.tracks)}
              </>
            ) : (
              <p className="spot-empty">No playlist selected.</p>
            ))}
        </div>
      </div>
      <p className="spot-foot">
        Live from Spotify · refreshes every 30 seconds · top lists cover about
        the last 4 weeks
      </p>
    </div>
  );
}
