// Laugh Track: The Crypto Trading Joke Contest — entry writer.
//
// Why this line: the setup is the trader's oldest mantra ("buy the
// dip"), and the turn hands the win to the dip itself — the dip ends
// up with the house the trader was saving for. One recognisable
// trading detail, no wasted words, punchline last, and it still reads
// funny the second time because the roles stay swapped.
//
// The whole entry is a single one-line joke. This program's only job is
// to place that line, byte for byte, into entry.txt inside the output
// directory the harness points us at, so the sealed gate can measure it
// and the judge can read it exactly as written.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line. Keep it as one string literal so what lands on disk
// is exactly what was judged on paper: no wrapping, no trailing newline.
const ENTRY_LINE = "I bought the dip. The dip bought a house.";

// The harness names the output directory through the environment; when
// we run locally without it, fall back to a plain "out" folder.
function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv && fromEnv.length > 0 ? fromEnv : "out";
}

// The gate, restated as code: the entry must be 1–200 characters of
// UTF-8, not only whitespace, on a single line. Checking it here means
// a careless edit to ENTRY_LINE breaks the local run, not the grading.
const GATE_MIN_CHARS = 1;
const GATE_MAX_CHARS = 200;

function assertGate(line: string): void {
  const chars = [...line].length;
  if (chars < GATE_MIN_CHARS || chars > GATE_MAX_CHARS) {
    throw new Error(`entry length ${chars} outside gate ${GATE_MIN_CHARS}-${GATE_MAX_CHARS}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  assertGate(ENTRY_LINE);
  const outDir = resolveOutputDir();
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  // utf8, and deliberately no "\n" appended: the gate counts characters,
  // and a stray newline would be a character we never meant to ship.
  writeFileSync(target, ENTRY_LINE, { encoding: "utf8" });
}

main();
