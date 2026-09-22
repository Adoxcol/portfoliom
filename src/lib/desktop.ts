export type AppId =
  | "work"
  | "studio"
  | "about"
  | "lab"
  | "contact"
  | "readme"
  | "settings"
  | "terminal"
  | "listening"
  | "minesweeper";
export const apps: { id: AppId; name: string; file: string }[] = [
  { id: "work", name: "My Projects", file: "My Projects" },
  { id: "studio", name: "Studio", file: "Studio.exe" },
  { id: "about", name: "About Mahmood", file: "My Computer" },
  { id: "lab", name: "The Lab", file: "Experiments" },
  { id: "contact", name: "Contact", file: "Contact.txt" },
  { id: "readme", name: "Welcome", file: "README.txt" },
  { id: "settings", name: "Display Properties", file: "Display Settings" },
  { id: "terminal", name: "Terminal", file: "Command.com" },
  { id: "listening", name: "Listening Room", file: "Listening Room" },
  { id: "minesweeper", name: "Minesweeper", file: "Minesweeper.exe" },
];
export interface Bounds {
  width: number;
  height: number;
}
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface DesktopWindow {
  id: AppId;
  minimized: boolean;
  maximized: boolean;
  rect: Rect;
}
export const defaultBounds = { width: 1100, height: 650 };
export function clampRect(rect: Rect, bounds: Bounds): Rect {
  const width = Math.min(Math.max(440, rect.width), bounds.width);
  const height = Math.min(Math.max(280, rect.height), bounds.height);
  return {
    width,
    height,
    x: Math.max(0, Math.min(rect.x, bounds.width - width)),
    y: Math.max(0, Math.min(rect.y, bounds.height - height)),
  };
}
export function initialRect(bounds: Bounds, index: number): Rect {
  return clampRect(
    {
      x: (bounds.width >= 1000 ? 110 : 16) + (index % 3) * 8,
      y: 10 + (index % 3) * 6,
      width: bounds.width - (bounds.width >= 1000 ? 140 : 40),
      height: bounds.height - 32,
    },
    bounds,
  );
}
export function launchWindow(
  windows: DesktopWindow[],
  id: AppId,
  bounds: Bounds,
): DesktopWindow[] {
  const existing = windows.find((win) => win.id === id);
  return [
    ...windows.filter((win) => win.id !== id),
    existing
      ? { ...existing, minimized: false }
      : {
          id,
          minimized: false,
          maximized: false,
          rect: initialRect(bounds, windows.length),
        },
  ];
}
export function taskbarWindow(
  windows: DesktopWindow[],
  id: AppId,
  bounds: Bounds,
): DesktopWindow[] {
  const focused = windows.filter((win) => !win.minimized).slice(-1)[0];
  return focused?.id === id
    ? windows.map((win) => (win.id === id ? { ...win, minimized: true } : win))
    : launchWindow(windows, id, bounds);
}
export interface Preferences {
  wallpaper: "teal" | "clouds" | "grid" | "midnight";
  accent: "navy" | "forest" | "plum";
  crt: number;
  dark: boolean;
}
export const defaultPreferences: Preferences = {
  wallpaper: "teal",
  accent: "navy",
  crt: 35,
  dark: false,
};
export function parsePreferences(raw: string | null): Preferences {
  try {
    const value = JSON.parse(raw ?? "{}");
    if (!value || typeof value !== "object") return { ...defaultPreferences };
    return {
      wallpaper: ["teal", "clouds", "grid", "midnight"].includes(
        value.wallpaper,
      )
        ? value.wallpaper
        : "teal",
      accent: ["navy", "forest", "plum"].includes(value.accent)
        ? value.accent
        : "navy",
      crt:
        typeof value.crt === "number" && Number.isFinite(value.crt)
          ? Math.max(0, Math.min(100, value.crt))
          : 35,
      dark: typeof value.dark === "boolean" ? value.dark : false,
    };
  } catch {
    return { ...defaultPreferences };
  }
}
