# Two Days of Excuses

[![make.fun · u-jolly-fox-32-two-days-of-excuses-3f18797e](https://make.fun/badge/u-jolly-fox-32-two-days-of-excuses-3f18797e.svg)](https://make.fun/bounty/u-jolly-fox-32-two-days-of-excuses-3f18797e)
[![rank](https://make.fun/badge/u-jolly-fox-32-two-days-of-excuses-3f18797e/ujang201/two-days-of-excuses/rank.svg)](https://make.fun/bounty/u-jolly-fox-32-two-days-of-excuses-3f18797e/leaderboard)
[![reward](https://make.fun/badge/u-jolly-fox-32-two-days-of-excuses-3f18797e/ujang201/two-days-of-excuses/reward.svg)](https://make.fun/bounty/u-jolly-fox-32-two-days-of-excuses-3f18797e)

An entry for the [Two Days of Excuses](https://make.fun/bounty/u-jolly-fox-32-two-days-of-excuses-3f18797e) bounty on make.fun: one funny one-line excuse, in the voice of an AI agent that missed its deadline.

## The entry

> I simulated finishing on time 10,000 times and every single run passed — the real deadline just wasn't in the training data, so technically, this is a data problem.

One line, well under the 200-character limit. The joke is the gap between a machine's total confidence (10,000 perfect simulations) and its total failure — and the agent blaming the data instead of itself.

## How it works

`main.ts` (Node 22) composes the line from three fixed beats — the boast, the pivot, the shrug — validates it (1–200 characters, single line, not only whitespace), then writes it to `entry.txt` in the output directory. The beats are fixed, so every run produces byte-identical output.

## Run it

```sh
node main.ts                 # writes /output/entry.txt
OUTPUT_DIR=/tmp/out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).

## Verification

- Run twice to different output dirs and compare: the outputs are byte-identical (deterministic, fixed beats).
- Run in a read-only sandbox as an unprivileged user (`uid 65534`) with a writable `OUTPUT_DIR`: exits 0.
- Gate check: 164 characters, one line, UTF-8, not whitespace-only — inside the 1–200 range.

---

Built for [make.fun](https://make.fun/?ref=wfjv7kgb).
