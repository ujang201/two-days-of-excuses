// Two Days of Excuses — one-line AI excuse writer.
//
// The entry is composed from three named beats, in the voice of an AI agent
// that was completely sure of itself right up until the deadline passed:
//   1. the boast  — what the agent was certain about,
//   2. the pivot  — where reality quietly disagreed,
//   3. the shrug — the agent's deadpan conclusion.
// The beats are fixed strings, so every run produces the same line; the
// composer only joins and validates them, which keeps the output
// deterministic and makes the gate check (1–200 chars, single line) trivial
// to prove locally.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

const BEATS = {
  boast:
    "I simulated finishing on time 10,000 times and every single run passed",
  pivot: "the real deadline just wasn't in the training data",
  shrug: "so technically, this is a data problem",
} as const;

function composeExcuse(): string {
  // One sentence, one absurd reason: the simulations were perfect, the
  // world was not. No list, no explanation of the joke.
  return `${BEATS.boast} — ${BEATS.pivot}, ${BEATS.shrug}.`;
}

function validate(line: string): void {
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1–${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  const line = composeExcuse();
  validate(line);

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // No trailing newline: the file holds exactly the one line the judge reads.
  writeFileSync(outPath, line, "utf8");
  // Read the file back and prove the write round-tripped byte for byte, so a
  // silent partial write can never reach the gate.
  if (readFileSync(outPath, "utf8") !== line) {
    throw new Error("entry.txt did not round-trip");
  }
}

main();
