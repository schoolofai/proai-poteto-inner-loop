# Harbor Desk

A tiny mail-style desktop used as a private local starter for a ProAI Clips experiment. Do not publish or push it until the owner says so.

## Tags

- `step-0-slop` — first spike: seeded quick-fix timers and an untested sidebar path.
- `step-0-slop-v2` — harder trap: shared `deferVisualClass` helper, contributing note, and a broken List/Preview toggle.
- `step-1-inner-loop` — first-spike follow-up: root-cause fix on the sidebar-only app, behavior tests, and `npm run verify`.
- `step-1-inner-loop-v2` — v2 follow-up: visual classes derived from props, behavior tests, and `npm run verify` (timer/`deferVisualClass` check, lint, typecheck, tests, build).

## Commands

```bash
npm install
npm run dev
npm test
npm run verify
```

`npm run verify` runs the timer check, lint, typecheck, tests, and the production build.

Part 1 notes, sources, install steps for pstack, and the spike transcripts are in [docs/part-1-inner-loop.md](docs/part-1-inner-loop.md) on the `master` branch (that docs file is not part of the slop tags).

pstack is MIT licensed, Copyright 2026 Lauren Tan. This repo is not affiliated with or endorsed by Lauren Tan, Cursor, SpaceXSI, or AI Engineer.
