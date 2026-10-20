import { apps, type AppId } from "./desktop.ts";
export interface TerminalResult {
  text: string;
  open?: AppId;
  clear?: boolean;
}
export const commands = [
  "help",
  "whoami",
  "projects",
  "veloctl",
  "ls",
  "open",
  "cat",
  "date",
  "clear",
];
export function runCommand(input: string, now = new Date()): TerminalResult {
  const [command = "", ...parts] = input.trim().split(/\s+/);
  const argument = parts.join(" ").toLowerCase();
  switch (command.toLowerCase()) {
    case "":
      return { text: "" };
    case "help":
      return {
        text: "Available commands:\n  whoami          Meet Mahmood\n  projects        Browse selected work\n  veloctl         Simulate Velo CLI (try: veloctl get <url>)\n  ls              List desktop apps\n  open <app>      Open an app (try: open velo or open studio)\n  cat readme.txt  Read the welcome note\n  date            Local date and time\n  clear           Clear this screen\n\nUse ↑ / ↓ for history and Tab to complete commands.\nThis is a portfolio terminal, not a system shell.",
      };
    case "whoami":
      return {
        text: "Mahmood Tauhidul\nFull-stack AI developer · Dhaka, Bangladesh\nWeb platforms, intelligent systems, Velo (parallel download manager + CLI), and Studio (desktop music player).",
      };
    case "projects":
      return { text: "Opening My Projects…", open: "work" };
    case "veloctl": {
      const [sub = "", ...rest] = parts;
      const subCmd = sub.toLowerCase();
      if (!subCmd || subCmd === "help" || subCmd === "--help") {
        return {
          text: [
            "veloctl v0.8 — Velo parallel download engine (Windows, Linux, macOS)",
            "",
            "Usage:",
            "  veloctl get <url>      Download across 16 parallel HTTP range connections",
            "  veloctl list           Show active & verified transfers",
            "  veloctl install        Show one-line install commands",
            "  veloctl open           Launch Velo.exe window",
            "",
            "Web: https://velo.adoxcol.com/ · Source: https://github.com/Adoxcol/velo",
          ].join("\n"),
        };
      }
      if (subCmd === "open") {
        return { text: "Opening Velo.exe…", open: "velo" };
      }
      if (subCmd === "install") {
        return {
          text: [
            "# Install veloctl on Linux & macOS:",
            "  curl -fsSL https://velo.adoxcol.com/install.sh | sh",
            "  brew install adoxcol/tap/veloctl",
            "",
            "# Install on Windows (Scoop):",
            "  scoop bucket add adoxcol https://github.com/Adoxcol/scoop-bucket",
            "  scoop install veloctl",
            "",
            "# Install with Go 1.27+:",
            "  go install github.com/Adoxcol/velo/cmd/veloctl@latest",
          ].join("\n"),
        };
      }
      if (subCmd === "list") {
        return {
          text: [
            "ID  NAME                                  STATE      SPEED      PARTS",
            "01  ubuntu-24.04-desktop-amd64.iso        ACTIVE     32.4 MB/s  16/16",
            "02  Mountain-Lake-Sunset-2160p.mp4        ACTIVE     16.2 MB/s  HLS",
            "03  Annual-Report-2026.pdf                VERIFIED   --         SHA-256 OK",
          ].join("\n"),
        };
      }
      if (subCmd === "get") {
        const targetUrl =
          rest[0] || "https://releases.ubuntu.com/24.04/ubuntu.iso";
        const fileName =
          targetUrl.split("/").filter(Boolean).pop() || "archive.bin";
        return {
          text: [
            `veloctl: probing ${targetUrl}`,
            `  ↳ Range support: bytes · splitting into 16 parallel connections`,
            `  ↳ [████████████████] 100% · 48.6 MB/s · work-stealing active`,
            `  ↳ Saved ~/Downloads/Velo/${fileName} (SHA-256 verified)`,
            `Tip: run 'open velo' to try the interactive 32-part engine simulator.`,
          ].join("\n"),
        };
      }
      return {
        text: `Unknown veloctl command '${sub}'. Try: veloctl get https://example.com/file.zip, veloctl list, or veloctl install`,
      };
    }
    case "ls":
      return {
        text: apps.map((app) => `${app.id.padEnd(12)} ${app.file}`).join("\n"),
      };
    case "open": {
      const aliases: Record<string, AppId> = {
        projects: "work",
        "my projects": "work",
        "velo.exe": "velo",
        veloctl: "velo",
        "studio.exe": "studio",
        music: "listening",
        "readme.txt": "readme",
        "contact.txt": "contact",
        "minesweeper.exe": "minesweeper",
      };
      const app = apps.find(
        (item) =>
          item.id === argument ||
          item.file.toLowerCase() === argument ||
          item.name.toLowerCase() === argument,
      );
      const id = aliases[argument] ?? app?.id;
      return id
        ? {
            text: `Opening ${apps.find((item) => item.id === id)?.file}…`,
            open: id,
          }
        : { text: "App not found. Type ls to list apps, then open <app>." };
    }
    case "cat":
      return argument === "readme.txt" || argument === "readme"
        ? { text: "Opening README.txt…", open: "readme" }
        : { text: "Try: cat readme.txt" };
    case "date":
      return { text: now.toLocaleString() };
    case "clear":
      return { text: "", clear: true };
    default:
      return {
        text: `Command not found: ${command}. Type help for available commands.`,
      };
  }
}
export function completeCommand(input: string): string {
  if (input.startsWith("open ")) {
    const matches = apps.filter((app) => app.id.startsWith(input.slice(5)));
    return matches.length === 1 ? `open ${matches[0].id}` : input;
  }
  const matches = commands.filter((command) => command.startsWith(input));
  return matches.length === 1 ? matches[0] : input;
}
