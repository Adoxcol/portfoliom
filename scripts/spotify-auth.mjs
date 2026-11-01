// One-time helper to get a Spotify refresh token.
// 1. Create an app at https://developer.spotify.com/dashboard
//    and add the redirect URI http://127.0.0.1:8888/callback
// 2. Run:  SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/spotify-auth.mjs
//    (PowerShell: $env:SPOTIFY_CLIENT_ID="..."; $env:SPOTIFY_CLIENT_SECRET="..."; node scripts/spotify-auth.mjs)
// 3. Open the printed URL, approve, and copy the refresh token into your
//    Vercel environment variables as SPOTIFY_REFRESH_TOKEN.
import http from "node:http";

const id = process.env.SPOTIFY_CLIENT_ID;
const secret = process.env.SPOTIFY_CLIENT_SECRET;
if (!id || !secret) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET first.");
  process.exit(1);
}
const redirect = "http://127.0.0.1:8888/callback";
const scope = "user-read-currently-playing user-read-recently-played user-top-read playlist-read-private";
const url = `https://accounts.spotify.com/authorize?${new URLSearchParams({
  client_id: id,
  response_type: "code",
  redirect_uri: redirect,
  scope,
})}`;
console.log("Open this URL in your browser:\n\n" + url + "\n");

const server = http.createServer(async (req, res) => {
  const code = new URL(req.url, "http://127.0.0.1:8888").searchParams.get("code");
  if (!code) {
    res.end("Waiting for authorization code...");
    return;
  }
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirect,
    }),
  });
  const data = await response.json();
  res.end(data.refresh_token ? "Done! Check your terminal." : JSON.stringify(data));
  console.log(data.refresh_token ? `SPOTIFY_REFRESH_TOKEN=${data.refresh_token}` : data);
  server.close();
});
server.listen(8888);
