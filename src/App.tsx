import { useEffect, useRef, useState } from "react";
import {
  apps,
  clampRect,
  defaultBounds,
  defaultPreferences,
  initialRect,
  launchWindow,
  parsePreferences,
  taskbarWindow,
  type AppId,
  type Bounds,
  type DesktopWindow,
  type Preferences,
} from "./lib/desktop";
import ListeningRoom from "./components/ListeningRoom";
import Minesweeper from "./components/Minesweeper";
import Terminal from "./components/Terminal";
import Monitor from "./components/Monitor";
import PixelIcon from "./components/PixelIcon";
import DesktopFrame from "./components/DesktopFrame";
import PortfolioContent from "./components/PortfolioContent";
import DisplayProperties from "./components/DisplayProperties";
import { profile } from "./data/content";
import "./index.css";

export default function App() {
  const [windows, setWindows] = useState<DesktopWindow[]>([
    {
      id: "work",
      minimized: false,
      maximized: false,
      rect: initialRect(defaultBounds, 0),
    },
  ]);
  const measuredWorkspace = useRef(false);
  const [bounds, setBounds] = useState<Bounds>(defaultBounds);
  const [startOpen, setStartOpen] = useState(false);
  const [context, setContext] = useState<{ x: number; y: number } | null>(null);
  const [clock, setClock] = useState(new Date());
  const [preferences, setPreferences] = useState<Preferences>(() => {
    try {
      return parsePreferences(localStorage.getItem("mahmood-desktop"));
    } catch {
      return { ...defaultPreferences };
    }
  });
  const [saved, setSaved] = useState(true);
  const [workspace, setWorkspace] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("mahmood-desktop", JSON.stringify(preferences));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }, [preferences]);
  useEffect(() => {
    const target = workspace;
    if (!target) return;
    const observer = new ResizeObserver(() => {
      const next = { width: target.clientWidth, height: target.clientHeight };
      if (!next.width || !next.height) return;
      const firstMeasurement = !measuredWorkspace.current;
      measuredWorkspace.current = true;
      setBounds(next);
      setWindows((current) =>
        current.map((win, index) => ({
          ...win,
          rect: firstMeasurement
            ? initialRect(next, index)
            : clampRect(win.rect, next),
        })),
      );
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [workspace]);
  function open(id: AppId) {
    setWindows((current) => launchWindow(current, id, bounds));
    setStartOpen(false);
    setContext(null);
  }
  function focus(id: AppId) {
    setWindows((current) => {
      if (current[current.length - 1]?.id === id) return current;
      const win = current.find((item) => item.id === id);
      return win ? [...current.filter((item) => item.id !== id), win] : current;
    });
  }
  function showDesktop() {
    setWindows((current) =>
      current.map((win) => ({ ...win, minimized: true })),
    );
    setStartOpen(false);
    setContext(null);
  }
  const focused = windows.filter((win) => !win.minimized).slice(-1)[0]?.id;
  return (
    <Monitor
      intensity={preferences.crt}
      onIntensityChange={(crt) =>
        setPreferences((current) => ({ ...current, crt }))
      }
    >
      <div
        className={`os desktop-system wallpaper-${preferences.wallpaper} accent-${preferences.accent} ${preferences.dark ? "night" : ""}`}
        onPointerDown={(event) => {
          const element = event.target as HTMLElement;
          if (!element.closest(".start-menu,.start-button"))
            setStartOpen(false);
          if (!element.closest(".desktop-context")) setContext(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setStartOpen(false);
            setContext(null);
          }
        }}
      >
        <header className="menu-bar">
          <button
            className="brand"
            aria-label="Open README"
            onClick={() => open("readme")}
          >
            <b>m.</b> mahmood<span>98</span>
          </button>
          <span className="menu-context">
            PERSONAL EDITION / a computer full of things I make
          </span>
          <button
            className="properties-shortcut"
            onClick={() => open("settings")}
          >
            Display Properties
          </button>
        </header>
        <main
          ref={setWorkspace}
          className="desktop workspace"
          onContextMenu={(event) => {
            if (
              (event.target as HTMLElement).closest(
                ".managed-window,.desktop-shortcuts",
              )
            )
              return;
            event.preventDefault();
            const rect = event.currentTarget.getBoundingClientRect();
            setContext({
              x: Math.min(
                event.clientX - rect.left,
                Math.max(0, bounds.width - 210),
              ),
              y: Math.min(
                event.clientY - rect.top,
                Math.max(0, bounds.height - 140),
              ),
            });
            setStartOpen(false);
          }}
        >
          <div className="wallpaper-type" aria-hidden="true">
            mahmood OS<span>PERSONAL EDITION</span>
          </div>
          <nav className="desktop-shortcuts" aria-label="Desktop files">
            {apps.map((app) => (
              <button key={app.id} onClick={() => open(app.id)}>
                <PixelIcon kind={app.id} />
                <span>{app.file}</span>
              </button>
            ))}
          </nav>
          {windows.map((win, index) => (
            <DesktopFrame
              key={win.id}
              win={win}
              bounds={bounds}
              focused={focused === win.id}
              layer={index + 2}
              onFocus={() => focus(win.id)}
              onClose={() =>
                setWindows((current) =>
                  current.filter((item) => item.id !== win.id),
                )
              }
              onMinimize={() =>
                setWindows((current) =>
                  current.map((item) =>
                    item.id === win.id ? { ...item, minimized: true } : item,
                  ),
                )
              }
              onMaximize={() =>
                setWindows((current) =>
                  current.map((item) =>
                    item.id === win.id
                      ? { ...item, maximized: !item.maximized }
                      : item,
                  ),
                )
              }
              onRect={(rect) =>
                setWindows((current) =>
                  current.map((item) =>
                    item.id === win.id ? { ...item, rect } : item,
                  ),
                )
              }
            >
              {win.id === "minesweeper" ? (
                <Minesweeper />
              ) : win.id === "listening" ? (
                <ListeningRoom />
              ) : win.id === "terminal" ? (
                <Terminal open={open} />
              ) : win.id === "readme" ? (
                <article className="window-content readme-content">
                  <div className="notepad-menu">
                    README.txt / Plain text / Read only
                  </div>
                  <p className="readme-date">
                    README.txt / last updated September 2026
                  </p>
                  <h1>Hey, I'm Mahmood.</h1>
                  <p>
                    Welcome to my corner of the internet. Think of this as my
                    personal computer: a few things I've shipped, a few things
                    I'm figuring out, and a lot of curiosity.
                  </p>
                  <p>
                    I'm a full-stack AI developer in Dhaka. I work on web
                    platforms and intelligent systems. I also build things
                    simply because I want them to exist.
                  </p>
                  <h2>A few places to start</h2>
                  <button onClick={() => open("work")}>
                    01. My Projects — the things I've shipped ↗
                  </button>
                  <button onClick={() => open("studio")}>
                    02. Studio.exe — a home for my music ↗
                  </button>
                  <button onClick={() => open("lab")}>
                    03. Experiments — ideas still taking shape ↗
                  </button>
                  <p>
                    Open a couple of windows. Drag them around. Make the desktop
                    yours. On a phone, use the taskbar to switch between apps.
                  </p>
                  <p>
                    Have something in mind?{" "}
                    <button
                      className="inline-link"
                      onClick={() => open("contact")}
                    >
                      Leave me a message.
                    </button>
                  </p>
                  <p className="readme-signature">
                    — Mahmood
                    <br />
                    <span>Engineer by trade. Curious by default.</span>
                  </p>
                </article>
              ) : win.id === "settings" ? (
                <DisplayProperties
                  value={preferences}
                  onChange={setPreferences}
                  saved={saved}
                />
              ) : (
                <PortfolioContent active={win.id} open={open} />
              )}
            </DesktopFrame>
          ))}
          {context && (
            <nav
              className="desktop-context"
              aria-label="Desktop menu"
              style={{ left: context.x, top: context.y }}
            >
              <button autoFocus onClick={() => open("readme")}>
                Read me first
              </button>
              <button onClick={showDesktop}>Show desktop</button>
              <hr />
              <button onClick={() => open("settings")}>Properties…</button>
            </nav>
          )}
          {!windows.some((win) => !win.minimized) && (
            <div className="desktop-rest">
              <p>A little space to think.</p>
              <button onClick={() => open("readme")}>Open README.txt</button>
            </div>
          )}
        </main>
        {startOpen && (
          <nav className="start-menu" id="start-menu" aria-label="Start menu">
            <div className="start-banner">
              mahmood<span>98</span>
            </div>
            <div className="start-items">
              <strong>Your personal corner of the internet.</strong>
              {apps.map((app) => (
                <button key={app.id} onClick={() => open(app.id)}>
                  <PixelIcon kind={app.id} size={24} />
                  <span>{app.name}</span>
                </button>
              ))}
              <hr />
              <button onClick={showDesktop}>▤ Show desktop</button>
              <a href={profile.social.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </div>
          </nav>
        )}
        <nav className="dock taskbar" aria-label="App taskbar">
          <button
            className="start-button"
            aria-expanded={startOpen}
            aria-controls="start-menu"
            onClick={() => {
              setStartOpen(!startOpen);
              setContext(null);
            }}
          >
            <span className="start-logo">▦</span>
            <strong>Start</strong>
          </button>
          <div className="running-apps">
            {windows.map((win) => (
              <button
                key={win.id}
                className={focused === win.id ? "task-active" : ""}
                aria-label={`${win.minimized ? "Restore" : "Switch to"} ${apps.find((app) => app.id === win.id)?.file}`}
                aria-pressed={focused === win.id}
                onClick={() =>
                  setWindows((current) =>
                    taskbarWindow(current, win.id, bounds),
                  )
                }
              >
                <PixelIcon kind={win.id} size={19} />
                <span>{apps.find((app) => app.id === win.id)?.file}</span>
              </button>
            ))}
          </div>
          <button
            className="show-desktop"
            aria-label="Show desktop"
            onClick={showDesktop}
          >
            ▤
          </button>
          <time>
            {clock.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
        </nav>
      </div>
    </Monitor>
  );
}
