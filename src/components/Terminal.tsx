import { useEffect, useRef, useState } from "react";
import { completeCommand, runCommand } from "../lib/terminal";
import type { AppId } from "../lib/desktop";
export default function Terminal({ open }: { open: (id: AppId) => void }) {
  const [lines, setLines] = useState([
    {
      command: "",
      text: "MAHMOOD COMMAND PROMPT [Version 98.2]\nA little curiosity goes a long way. Type help to begin.",
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const draft = useRef("");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!input.trim()) return;
    const result = runCommand(input);
    setHistory((current) => [...current, input].slice(-100));
    setCursor(-1);
    draft.current = "";
    setLines((current) =>
      result.clear
        ? []
        : [...current, { command: input, text: result.text }].slice(-150),
    );
    setInput("");
    if (result.open) open(result.open);
  }
  return (
    <div className="window-content terminal-app">
      <div
        className="terminal-output"
        role="log"
        aria-label="Terminal output"
        aria-live="polite"
      >
        {lines.map((line, index) => (
          <div key={index}>
            {line.command && (
              <p className="terminal-echo">C:\MAHMOOD&gt; {line.command}</p>
            )}
            <pre>{line.text}</pre>
          </div>
        ))}
      </div>
      <form onSubmit={submit}>
        <label htmlFor="terminal-input">C:\MAHMOOD&gt;</label>
        <input
          id="terminal-input"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal command"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setCursor(-1);
          }}
          onKeyDown={(event) => {
            if (event.key === "Tab" && !event.shiftKey) {
              const completed = completeCommand(input);
              if (completed !== input) {
                event.preventDefault();
                setInput(completed);
              }
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              if (!history.length) return;
              if (cursor === -1) draft.current = input;
              const next =
                cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
              setCursor(next);
              setInput(history[next]);
            }
            if (event.key === "ArrowDown") {
              event.preventDefault();
              if (cursor === -1) return;
              const next = cursor + 1;
              if (next >= history.length) {
                setCursor(-1);
                setInput(draft.current);
              } else {
                setCursor(next);
                setInput(history[next]);
              }
            }
          }}
        />
        <button type="submit">Run ↵</button>
      </form>
      <div ref={end} />
      <p className="terminal-hint">
        Try <button onClick={() => setInput("open studio")}>open studio</button>{" "}
        or <button onClick={() => setInput("help")}>help</button>. No files or
        system commands are executed.
      </p>
    </div>
  );
}
