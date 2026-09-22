import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runCommand, completeCommand } from "../src/lib/terminal.ts";
import {
  newGame,
  neighbors,
  revealCell,
  flagCell,
} from "../src/lib/minesweeper.ts";
const random = () => 0.41;
test("terminal opens registered apps and supports safe navigation aliases", () => {
  assert.equal(runCommand("open studio").open, "studio");
  assert.equal(runCommand("OPEN Listening Room").open, "listening");
  assert.equal(runCommand("open minesweeper").open, "minesweeper");
  assert.equal(runCommand("cat readme.txt").open, "readme");
  assert.equal(runCommand("projects").open, "work");
  assert.equal(runCommand("clear").clear, true);
  assert.match(runCommand("ls").text, /Command.com/);
  assert.equal(runCommand("rm -rf /").open, undefined);
  assert.match(runCommand("rm -rf /").text, /Command not found/);
  assert.equal(completeCommand("who"), "whoami");
  assert.equal(completeCommand("open min"), "open minesweeper");
});
test("first reveals are safe including neighbors and place exactly ten mines", () => {
  for (const first of [0, 8, 40, 72, 80]) {
    const game = revealCell(newGame(), first, random);
    assert.notEqual(game.status, "lost");
    assert.equal(game.cells.filter((cell) => cell.mine).length, 10);
    for (const index of [first, ...neighbors(first, 9)])
      assert.equal(game.cells[index].mine, false);
    game.cells.forEach((cell, index) =>
      assert.equal(
        cell.adjacent,
        neighbors(index, 9).filter((i) => game.cells[i].mine).length,
      ),
    );
  }
});
test("flags block reveals, are limited, and can be removed", () => {
  let game = flagCell(newGame(), 0);
  assert.equal(revealCell(game, 0), game);
  game = flagCell(game, 0);
  assert.equal(game.cells[0].flagged, false);
  for (let i = 0; i < 11; i++) game = flagCell(game, i);
  assert.equal(game.cells.filter((cell) => cell.flagged).length, 10);
  assert.equal(game.status, "ready");
});
test("mine reveal loses, safe completion wins, and finished boards cannot change", () => {
  let game = revealCell(newGame(), 40, random);
  const mine = game.cells.findIndex((cell) => cell.mine);
  const lost = revealCell(game, mine);
  assert.equal(lost.status, "lost");
  assert.equal(revealCell(lost, 0), lost);
  assert.equal(flagCell(lost, 0), lost);
  for (let i = 0; i < 81; i++)
    if (!game.cells[i].mine) game = revealCell(game, i);
  assert.equal(game.status, "won");
  assert.equal(game.cells.filter((cell) => cell.flagged).length, 10);
});
test("chording reveals neighbors only after the matching number of flags", () => {
  let game = revealCell(newGame(), 40, random);
  const index = game.cells.findIndex(
    (cell, i) =>
      cell.revealed &&
      cell.adjacent > 0 &&
      neighbors(i, 9).some(
        (n) => !game.cells[n].revealed && !game.cells[n].mine,
      ),
  );
  assert.ok(index >= 0);
  assert.equal(revealCell(game, index), game);
  for (const n of neighbors(index, 9))
    if (game.cells[n].mine) game = flagCell(game, n);
  game = revealCell(game, index);
  assert.notEqual(game.status, "lost");
  for (const n of neighbors(index, 9))
    if (!game.cells[n].mine) assert.equal(game.cells[n].revealed, true);
});
test("all original audio files are valid non-silent 32-second PCM without clipping", () => {
  for (const file of ["after-hours", "soft-circuits", "home-directory"]) {
    const buffer = readFileSync(
      new URL(`../public/audio/${file}.wav`, import.meta.url),
    );
    assert.equal(buffer.toString("ascii", 0, 4), "RIFF");
    assert.equal(buffer.toString("ascii", 8, 12), "WAVE");
    assert.equal(buffer.readUInt16LE(20), 1);
    assert.equal(buffer.readUInt32LE(24), 22050);
    assert.equal(buffer.readUInt32LE(40), 32 * 22050 * 2);
    let peak = 0;
    for (let i = 44; i < buffer.length; i += 2)
      peak = Math.max(peak, Math.abs(buffer.readInt16LE(i)));
    assert.ok(peak > 500 && peak < 32767);
  }
});
