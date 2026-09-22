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
        text: "Available commands:\n  whoami          Meet Mahmood\n  projects        Browse selected work\n  ls              List desktop apps\n  open <app>      Open an app (try: open studio)\n  cat readme.txt  Read the welcome note\n  date            Local date and time\n  clear           Clear this screen\n\nUse ↑ / ↓ for history and Tab to complete commands.\nThis is a portfolio terminal, not a system shell.",
      };
    case "whoami":
      return {
        text: "Mahmood Tauhidul\nFull-stack AI developer · Dhaka, Bangladesh\nWeb platforms, intelligent systems, and Studio — my desktop music player.",
      };
    case "projects":
      return { text: "Opening My Projects…", open: "work" };
    case "ls":
      return {
        text: apps.map((app) => `${app.id.padEnd(12)} ${app.file}`).join("\n"),
      };
    case "open": {
      const aliases: Record<string, AppId> = {
        projects: "work",
        "my projects": "work",
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
