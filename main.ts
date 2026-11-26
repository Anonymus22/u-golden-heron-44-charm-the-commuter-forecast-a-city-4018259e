// Charm the Commuter: Forecast a City That Isn't
// make.fun bounty: u-golden-heron-44-charm-the-commuter-forecast-a-city-4018259e
// Node 22, stdlib only, no network. Deterministic: same output every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one original forecast line for a city that does not exist,
// written by hand for this bounty.
const LINE =
  "Good morning, Nimbustown — 22°C, light drizzle, and the 8:12 bus is somehow on time. Bring a brolly, leave the grump at home.";

// Validate: single line, 1–140 characters.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`Forecast line must be 1-140 characters, got ${LINE.length}`);
}
// Code-point / UTF-8 byte guard: count the line in code points and UTF-8
// bytes, not UTF-16 code units, so multi-byte characters (— °) are measured
// honestly against the same 140-character cap.
const codePoints = [...LINE].length;
const byteLength = Buffer.byteLength(LINE, "utf8");
if (codePoints < 1 || codePoints > 140) {
  throw new Error(`Forecast line must be 1-140 code points, got ${codePoints}`);
}
if (byteLength > 4 * 140) {
  throw new Error(`Forecast line must be at most 560 UTF-8 bytes, got ${byteLength}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Forecast line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
