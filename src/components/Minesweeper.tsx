import { useEffect, useRef, useState } from "react";
import { flagCell, newGame, revealCell } from "../lib/minesweeper";
export default function Minesweeper() {
  const [game, setGame] = useState(() => newGame());
  const [flagMode, setFlagMode] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [best, setBest] = useState<number | null>(() => {
    try {
      const value = Number(localStorage.getItem("mahmood-mines-best"));
      return value > 0 && Number.isFinite(value) ? value : null;
    } catch {
      return null;
    }
  });
  const start = useRef(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [focused, setFocused] = useState(0);
  useEffect(() => {
    if (game.status !== "playing") return;
    if (!start.current) start.current = Date.now();
    const timer = setInterval(
      () =>
        setSeconds(
          Math.min(999, Math.floor((Date.now() - start.current) / 1000)),
        ),
      250,
    );
    return () => clearInterval(timer);
  }, [game.status]);
  useEffect(() => {
    if (game.status !== "won") return;
    const final = Math.max(1, Math.floor((Date.now() - start.current) / 1000));
    setSeconds(final);
    if (best === null || final < best) {
      setBest(final);
      try {
        localStorage.setItem("mahmood-mines-best", String(final));
      } catch {
        /* Score saving is optional. */
      }
    }
  }, [game.status, best]);
  function activateCell(index: number) {
    if (
      !flagMode &&
      game.status === "ready" &&
      !game.cells[index].flagged &&
      !start.current
    )
      start.current = Date.now();
    setGame((current) =>
      flagMode ? flagCell(current, index) : revealCell(current, index),
    );
  }
  function reset() {
    setGame(newGame());
    setSeconds(0);
    start.current = 0;
    setFlagMode(false);
    setFocused(0);
  }
  const flags = game.cells.filter((cell) => cell.flagged).length;
  const status =
    game.status === "won"
      ? "All clear. You found your way through!"
      : game.status === "lost"
        ? "You hit a mine. Start a new game to try again."
        : game.status === "ready"
          ? "Pick a square. Your first reveal is always safe."
          : flagMode
            ? "Flag mode: tap a covered square to mark it."
            : "Reveal every safe square. Numbers count nearby mines.";
  return (
    <div className="window-content mines-app">
      <span className="eyebrow">ACCESSORIES / A QUICK BREAK</span>
      <h2>Minesweeper</h2>
      <p className="intro">Nine by nine. Ten mines. One little distraction.</p>
      <div className="mines-machine">
        <div className="mines-dashboard">
          <output aria-label={`${game.mines - flags} flags remaining`}>
            {String(game.mines - flags).padStart(3, "0")}
          </output>
          <button aria-label="New Minesweeper game" onClick={reset}>
            {game.status === "lost"
              ? "×_×"
              : game.status === "won"
                ? "B)"
                : "☺"}
          </button>
          <output aria-label={`${seconds} seconds elapsed`}>
            {String(seconds).padStart(3, "0")}
          </output>
        </div>
        <div
          className="mine-grid"
          role="group"
          aria-label="Minesweeper board, 9 rows and 9 columns"
        >
          {game.cells.map((cell, index) => {
            const showMine =
              cell.mine && (cell.revealed || game.status === "lost");
            const wrongFlag =
              game.status === "lost" && cell.flagged && !cell.mine;
            const label = `Row ${Math.floor(index / 9) + 1}, column ${(index % 9) + 1}: ${showMine ? "mine" : wrongFlag ? "incorrect flag" : cell.flagged ? "flagged" : cell.revealed ? `${cell.adjacent} adjacent mines` : "covered"}`;
            return (
              <button
                ref={(element) => {
                  buttons.current[index] = element;
                }}
                key={index}
                tabIndex={focused === index ? 0 : -1}
                onFocus={() => setFocused(index)}
                aria-label={label}
                aria-disabled={game.status === "won" || game.status === "lost"}
                className={`mine-cell ${cell.revealed ? "revealed" : ""} ${showMine ? "is-mine" : ""} ${showMine && cell.revealed ? "exploded" : ""}`}
                data-number={cell.adjacent}
                onClick={() => activateCell(index)}
                onContextMenu={(event) => {
                  event.preventDefault();
                  setGame((current) => flagCell(current, index));
                }}
                onKeyDown={(event) => {
                  const row = Math.floor(index / 9),
                    col = index % 9;
                  const moves: Record<string, number> = {
                    ArrowLeft: row * 9 + Math.max(0, col - 1),
                    ArrowRight: row * 9 + Math.min(8, col + 1),
                    ArrowUp: Math.max(0, row - 1) * 9 + col,
                    ArrowDown: Math.min(8, row + 1) * 9 + col,
                  };
                  if (event.key in moves) {
                    event.preventDefault();
                    buttons.current[moves[event.key]]?.focus();
                  }
                  if (event.key.toLowerCase() === "f") {
                    event.preventDefault();
                    setGame((current) => flagCell(current, index));
                  }
                }}
              >
                {wrongFlag
                  ? "×"
                  : cell.flagged
                    ? "⚑"
                    : showMine
                      ? "✹"
                      : cell.revealed && cell.adjacent > 0
                        ? cell.adjacent
                        : ""}
              </button>
            );
          })}
        </div>
        <div className="mine-mode">
          <button aria-pressed={!flagMode} onClick={() => setFlagMode(false)}>
            Reveal
          </button>
          <button aria-pressed={flagMode} onClick={() => setFlagMode(true)}>
            ⚑ Flag
          </button>
          <button onClick={reset}>New game</button>
        </div>
      </div>
      <p className={`mine-message ${game.status}`} role="status">
        {status}
      </p>
      <div className="mines-notes">
        <p>
          <strong>Mouse:</strong> click to reveal; right-click to flag. Click a
          revealed number after flagging its nearby mines to open its remaining
          neighbors.
        </p>
        <p>
          <strong>Keyboard:</strong> arrow keys move; Enter uses the selected
          mode; F toggles a flag. On touchscreens, use the Reveal / Flag
          buttons.
        </p>
        <span>
          Best on this device: {best === null ? "No wins yet" : `${best}s`}
        </span>
      </div>
    </div>
  );
}
