export type GameStatus = "ready" | "playing" | "won" | "lost";
export interface Cell {
  mine: boolean;
  adjacent: number;
  revealed: boolean;
  flagged: boolean;
}
export interface Game {
  cells: Cell[];
  status: GameStatus;
  size: number;
  mines: number;
}
export function newGame(size = 9, mines = 10): Game {
  return {
    size,
    mines,
    status: "ready",
    cells: Array.from({ length: size * size }, () => ({
      mine: false,
      adjacent: 0,
      revealed: false,
      flagged: false,
    })),
  };
}
export function neighbors(index: number, size: number): number[] {
  const row = Math.floor(index / size),
    col = index % size;
  const result: number[] = [];
  for (let dy = -1; dy <= 1; dy++)
    for (let dx = -1; dx <= 1; dx++) {
      const r = row + dy,
        c = col + dx;
      if ((dx || dy) && r >= 0 && r < size && c >= 0 && c < size)
        result.push(r * size + c);
    }
  return result;
}
export function seedGame(
  game: Game,
  first: number,
  random = Math.random,
): Game {
  const safe = new Set([first, ...neighbors(first, game.size)]);
  const candidates = game.cells.map((_, i) => i).filter((i) => !safe.has(i));
  const cells = game.cells.map((cell) => ({ ...cell }));
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  for (const index of candidates.slice(0, game.mines)) cells[index].mine = true;
  cells.forEach((cell, index) => {
    cell.adjacent = neighbors(index, game.size).filter(
      (i) => cells[i].mine,
    ).length;
  });
  return { ...game, cells, status: "playing" };
}
export function flagCell(game: Game, index: number): Game {
  const cell = game.cells[index];
  if (!cell || cell.revealed || game.status === "won" || game.status === "lost")
    return game;
  if (
    !cell.flagged &&
    game.cells.filter((item) => item.flagged).length >= game.mines
  )
    return game;
  return {
    ...game,
    cells: game.cells.map((item, i) =>
      i === index ? { ...item, flagged: !item.flagged } : item,
    ),
  };
}
export function revealCell(
  game: Game,
  index: number,
  random = Math.random,
): Game {
  if (
    !game.cells[index] ||
    game.cells[index].flagged ||
    game.status === "won" ||
    game.status === "lost"
  )
    return game;
  const seeded = game.status === "ready" ? seedGame(game, index, random) : game;
  const cells = seeded.cells.map((cell) => ({ ...cell }));
  let pending = [index];
  if (cells[index].revealed) {
    const near = neighbors(index, game.size);
    if (
      cells[index].adjacent === 0 ||
      near.filter((i) => cells[i].flagged).length !== cells[index].adjacent
    )
      return game;
    pending = near.filter((i) => !cells[i].flagged && !cells[i].revealed);
  }
  let lost = false;
  while (pending.length) {
    const next = pending.pop()!;
    const cell = cells[next];
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    if (cell.mine) {
      lost = true;
      continue;
    }
    if (cell.adjacent === 0)
      pending.push(
        ...neighbors(next, game.size).filter(
          (i) => !cells[i].revealed && !cells[i].flagged,
        ),
      );
  }
  const won = !lost && cells.every((cell) => cell.mine || cell.revealed);
  if (won)
    cells.forEach((cell) => {
      if (cell.mine) cell.flagged = true;
    });
  return { ...seeded, cells, status: lost ? "lost" : won ? "won" : "playing" };
}
