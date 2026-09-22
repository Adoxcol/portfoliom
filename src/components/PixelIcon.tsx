import type { AppId } from "../lib/desktop";
export default function PixelIcon({
  kind,
  size = 32,
}: {
  kind: AppId | "github";
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="pixel-icon"
    >
      {kind === "terminal" && (
        <>
          <path d="M2 5h28v23H2z" fill="#d0d2bd" />
          <path d="M4 7h24v18H4z" fill="#122820" />
          <path d="M4 7h24v4H4z" fill="#6b8ba4" />
          <path
            d="M7 14h2v2h2v2H9v2H7v-2h2v-2H7zM14 20h8v2h-8z"
            fill="#b9e2a1"
          />
        </>
      )}
      {kind === "minesweeper" && (
        <>
          <path d="M2 3h28v27H2z" fill="#b9c3b1" />
          <path d="M4 5h24v5H4z" fill="#244d82" />
          <path
            d="M6 13h5v5H6zM13 13h5v5h-5zM20 13h5v5h-5zM6 20h5v5H6zM13 20h5v5h-5zM20 20h5v5h-5z"
            fill="#e8e8cf"
          />
          <path d="M15 11h2v4h3v2h-3v3h-2v-3h-3v-2h3z" fill="#283c2f" />
          <path d="M7 20h1v6H7zM8 20h4v3H8z" fill="#b14740" />
        </>
      )}
      {(kind === "work" || kind === "lab") && (
        <>
          <path d="M2 8h11v3h16v17H2z" fill="#35372c" />
          <path
            d="M3 7h9v4h17v15H3z"
            fill={kind === "lab" ? "#a987cb" : "#e6b443"}
          />
          <path
            d="M4 8h7v4h16v2H4z"
            fill={kind === "lab" ? "#e3c5fa" : "#ffec94"}
          />
          <path
            d="M2 15h28l-4 12H1z"
            fill={kind === "lab" ? "#c6a6e4" : "#f4d36b"}
          />
          <path
            d="M3 16h25v2H3z"
            fill={kind === "lab" ? "#ecd6ff" : "#fff0a4"}
          />
          {kind === "lab" && (
            <path d="M14 14h7v2h-1v4l4 5H11l4-5v-4h-1z" fill="#653b8c" />
          )}
        </>
      )}
      {(kind === "studio" || kind === "listening") && (
        <>
          <path d="M4 5h24v24H4z" fill="#293d3b" />
          <path d="M5 4h22v24H5z" fill="#b6c6b2" />
          <path d="M6 5h20v2H6z" fill="#f5f6d5" />
          <path d="M11 8h10v2h3v3h2v9h-3v3H10v-2H7V12h4z" fill="#ebeed6" />
          <path d="M12 10h9v3h3v8h-3v3H11v-3H8v-8h4z" fill="#76ada7" />
          <path d="M14 13h5v5h-5z" fill="#e6edce" />
          <path
            d="M18 9h3v12h-3v-8h-5v-3zM10 20h6v4h-6zM18 18h6v4h-6z"
            fill="#243d61"
          />
        </>
      )}
      {kind === "about" && (
        <>
          <path d="M4 3h24v21H4zM12 23h8v4h6v3H6v-3h6z" fill="#4f5147" />
          <path d="M3 2h24v21H3z" fill="#d6d1b8" />
          <path d="M5 4h20v15H5z" fill="#38505a" />
          <path d="M7 6h16v11H7z" fill="#479a9a" />
          <path d="M8 7h9v2H8z" fill="#8ed5c7" />
          <path d="M5 20h15v1H5zM12 24h7v3h6v1H7v-1h5z" fill="#f6eed5" />
          <path d="M23 20h2v1h-2z" fill="#7fa854" />
        </>
      )}
      {(kind === "readme" || kind === "contact") && (
        <>
          <path d="M7 3h15l5 5v22H7z" fill="#454d43" />
          <path d="M5 2h16l5 5v21H5z" fill="#ffffe8" />
          <path d="M20 2v6h6" fill="#bbbba6" />
          <path d="M8 11h14v2H8zM8 15h14v2H8zM8 19h9v2H8z" fill="#6b8878" />
          {kind === "contact" && (
            <>
              <path d="M10 17h20v12H10z" fill="#c29b45" />
              <path d="M11 18h18v10H11z" fill="#f3dda1" />
              <path
                d="M11 18h3v2h3v2h6v-2h3v-2h3v2h-2v2h-3v2h-8v-2h-3v-2h-2z"
                fill="#9c7942"
              />
            </>
          )}
        </>
      )}
      {kind === "settings" && (
        <>
          <path d="M3 4h26v23H3z" fill="#35484a" />
          <path d="M2 3h26v23H2z" fill="#d8d6bf" />
          <path d="M4 5h22v4H4z" fill="#2b4d88" />
          <path
            d="M7 12h2v11H7zM14 12h2v11h-2zM21 12h2v11h-2z"
            fill="#808b80"
          />
          <path d="M5 15h6v4H5zM12 19h6v4h-6zM19 12h6v4h-6z" fill="#426c74" />
          <path d="M5 15h5v1H5zM12 19h5v1h-5zM19 12h5v1h-5z" fill="#f6f7df" />
        </>
      )}
      {kind === "github" && (
        <>
          <path d="M8 6h5v3h6V6h5v4h3v13h-5v5H10v-5H5V10h3z" fill="#e7e9da" />
          <path d="M10 14h3v4h-3zM20 14h3v4h-3zM13 22h7v2h-7z" fill="#344d4a" />
        </>
      )}
    </svg>
  );
}
