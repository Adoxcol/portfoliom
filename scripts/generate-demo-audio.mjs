// Original procedural compositions for the portfolio. No samples or third-party audio.
import { mkdirSync, writeFileSync } from "node:fs";
const rate = 22050,
  duration = 32,
  length = rate * duration;
const tracks = [
  {
    name: "after-hours",
    root: 48,
    scale: [0, 4, 7, 11, 14, 7, 4, 2],
    beat: 0.5,
  },
  {
    name: "soft-circuits",
    root: 50,
    scale: [0, 3, 7, 10, 14, 10, 7, 5],
    beat: 0.4,
  },
  {
    name: "home-directory",
    root: 45,
    scale: [0, 5, 7, 12, 16, 12, 7, 5],
    beat: 0.625,
  },
];
mkdirSync(new URL("../public/audio/", import.meta.url), { recursive: true });
for (const track of tracks) {
  const samples = new Float32Array(length);
  const hz = (n) => 440 * 2 ** ((n - 69) / 12);
  for (let i = 0; i < length; i++) {
    const t = i / rate;
    const step = Math.floor(t / track.beat);
    const phase = t % track.beat;
    const note = hz(track.root + 12 + track.scale[step % track.scale.length]);
    const env = (1 - Math.exp(-phase * 65)) * Math.exp(-phase * 7);
    const melody =
      (Math.sin(2 * Math.PI * note * t) +
        0.18 * Math.sin(4 * Math.PI * note * t)) *
      0.13 *
      env;
    let pad = 0;
    for (const interval of [0, 7, track.scale[1] + 12]) {
      const f = hz(track.root + interval);
      pad += Math.sin(2 * Math.PI * f * t + Math.sin(t * 0.4) * 0.12) * 0.024;
    }
    const bass =
      Math.sin(2 * Math.PI * hz(track.root - 12) * t) *
      0.05 *
      (0.7 + 0.3 * Math.sin(t * 0.8));
    const fade = Math.min(1, t / 2, (duration - t) / 3);
    samples[i] = (melody + pad + bass) * fade;
  }
  // Gentle feedback-free echoes; normalize safely below full scale.
  const delay = Math.floor(rate * track.beat * 0.75);
  const mixed = new Float32Array(length);
  let peak = 0;
  for (let i = 0; i < length; i++) {
    mixed[i] =
      samples[i] +
      (i > delay ? samples[i - delay] * 0.28 : 0) +
      (i > delay * 2 ? samples[i - delay * 2] * 0.13 : 0);
    peak = Math.max(peak, Math.abs(mixed[i]));
  }
  const out = Buffer.alloc(44 + length * 2);
  out.write("RIFF");
  out.writeUInt32LE(36 + length * 2, 4);
  out.write("WAVE", 8);
  out.write("fmt ", 12);
  out.writeUInt32LE(16, 16);
  out.writeUInt16LE(1, 20);
  out.writeUInt16LE(1, 22);
  out.writeUInt32LE(rate, 24);
  out.writeUInt32LE(rate * 2, 28);
  out.writeUInt16LE(2, 32);
  out.writeUInt16LE(16, 34);
  out.write("data", 36);
  out.writeUInt32LE(length * 2, 40);
  for (let i = 0; i < length; i++)
    out.writeInt16LE(
      Math.round((mixed[i] / Math.max(peak, 1)) * 32767 * 0.8),
      44 + i * 2,
    );
  writeFileSync(
    new URL(`../public/audio/${track.name}.wav`, import.meta.url),
    out,
  );
}
console.log("Generated three original 32-second PCM compositions.");
