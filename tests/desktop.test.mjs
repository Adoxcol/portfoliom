import test from "node:test";
import assert from "node:assert/strict";
import {
  clampRect,
  defaultPreferences,
  initialRect,
  launchWindow,
  parsePreferences,
  taskbarWindow,
} from "../src/lib/desktop.ts";
const bounds = { width: 1200, height: 700 };
test("launching independent apps retains existing geometry and restores minimized apps", () => {
  let windows = launchWindow([], "work", bounds);
  windows[0].rect = { x: 120, y: 70, width: 620, height: 440 };
  windows = launchWindow(windows, "studio", bounds);
  assert.equal(windows.length, 2);
  assert.deepEqual(windows[0].rect, { x: 120, y: 70, width: 620, height: 440 });
  windows[0].minimized = true;
  windows = launchWindow(windows, "work", bounds);
  assert.equal(windows.length, 2);
  assert.equal(windows[1].id, "work");
  assert.equal(windows[1].minimized, false);
  assert.equal(windows[1].rect.x, 120);
});
test("taskbar toggles focused app and restores other apps without duplicates", () => {
  let windows = launchWindow(
    launchWindow([], "work", bounds),
    "studio",
    bounds,
  );
  windows = taskbarWindow(windows, "studio", bounds);
  assert.equal(windows.find((win) => win.id === "studio").minimized, true);
  windows = taskbarWindow(windows, "studio", bounds);
  assert.equal(windows[1].minimized, false);
  windows = taskbarWindow(windows, "work", bounds);
  assert.equal(windows[1].id, "work");
  assert.equal(windows.length, 2);
});
test("moving and resizing keep the whole window inside workspace", () => {
  for (const size of [
    { width: 1200, height: 700 },
    { width: 600, height: 350 },
    { width: 290, height: 230 },
  ]) {
    for (const rect of [
      { x: -100, y: -50, width: 800, height: 550 },
      { x: 990, y: 600, width: 1200, height: 900 },
      { x: 20, y: 10, width: 1, height: 1 },
      initialRect(size, 6),
    ]) {
      const result = clampRect(rect, size);
      assert.ok(result.x >= 0 && result.y >= 0);
      assert.ok(result.width > 0 && result.height > 0);
      assert.ok(result.x + result.width <= size.width);
      assert.ok(result.y + result.height <= size.height);
    }
  }
});
test("preferences recover from missing, corrupt, or invalid stored values", () => {
  for (const value of [null, "broken", "null", "false", "[]"])
    assert.deepEqual(parsePreferences(value), defaultPreferences);
  assert.deepEqual(
    parsePreferences(
      '{"wallpaper":"bad","accent":"red","crt":999,"dark":"true"}',
    ),
    { ...defaultPreferences, crt: 100 },
  );
  assert.equal(parsePreferences('{"crt":-12}').crt, 0);
  const preferences = {
    wallpaper: "midnight",
    accent: "plum",
    crt: 0,
    dark: true,
  };
  assert.deepEqual(parsePreferences(JSON.stringify(preferences)), preferences);
});

test("new windows use nearly all available reading space on large and compact desktops", () => {
  for (const size of [
    { width: 1400, height: 850 },
    { width: 1100, height: 520 },
    { width: 850, height: 480 },
  ]) {
    for (let index = 0; index < 7; index++) {
      const rect = initialRect(size, index);
      assert.ok(rect.width >= size.width * 0.85);
      assert.ok(rect.height >= size.height * 0.9);
      assert.ok(rect.x + rect.width <= size.width);
      assert.ok(rect.y + rect.height <= size.height);
    }
  }
});
