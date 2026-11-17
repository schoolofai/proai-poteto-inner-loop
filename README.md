# Harbor Desk: harden the inner loop first

Starter repo for **Apply Viral Poteto AIE Talk Patterns One Skill at a Time – Part 1: Harden the Inner Loop First** (ProAI Clips). Video link coming soon.

Harbor Desk is a small React + TypeScript mail app with a messy house style planted on purpose: a shared helper that waits 40 ms and then toggles a visual class, a contributing note that tells you to keep using it, and a List / Preview toggle whose highlight does not stay. The video asks a coding agent for a "quick fix" with and without the inner-loop rules from Lauren Tan's [pstack](https://github.com/cursor/plugins/tree/main/pstack) skills, then locks the lesson into the repo with a check.

## Follow along

```bash
git clone https://github.com/schoolofai/proai-poteto-inner-loop.git
cd proai-poteto-inner-loop

# The messy starting point
git checkout step-0-slop-v2
npm install
npm run dev        # click List, then Preview: the highlight does not stay
npm test           # green, but the tests miss the toggle bug

# The hardened inner loop
git checkout step-1-inner-loop-v2
npm install
npm run verify     # timer check, lint, typecheck, tests, build
```

To see the timer check fail on the messy tag, bring the check in from the hardened tag and run it:

```bash
git checkout step-0-slop-v2
git checkout step-1-inner-loop-v2 -- scripts
node scripts/check-no-timer-workaround.mjs   # fails: lists the helper and its five call sites
git restore --staged scripts && rm -r scripts
```

On `step-1-inner-loop-v2`, visual classes come from props and the whole `npm run verify` command passes.

## Tags

| Tag | What it is |
| --- | --- |
| `step-0-slop-v2` | The trap used in the video: shared `deferVisualClass` helper, contributing note, broken List / Preview toggle. |
| `step-1-inner-loop-v2` | Visual classes derived from props, behavior tests, and `npm run verify` with a check that bans delayed class timers and `deferVisualClass`. |
| `step-0-slop` | An earlier, simpler trap: sidebar timers and an untested sidebar path. |
| `step-1-inner-loop` | The fix for that earlier trap. |

## The experiment

Same starting repo, same "quick fix, smallest possible change" prompt, run with OpenAI's Codex CLI from a fresh copy each time: twice without the pstack rules (AQ) and three times with them in the prompt (BQ).

- Without the rules, both runs hooked the toggle up to the existing timer helper. No new tests.
- With the rules, all three runs set the class from the selected state, wrote a test, saved it failing on the old code, then saved it passing after the fix.
- No run removed the old helper or added a check against it. That check is on `step-1-inner-loop-v2`.

Prompts, diffs, reports, and full transcripts: [`spike/part-1-v2/`](spike/part-1-v2/), indexed in [`spike/part-1-v2/RESULTS.md`](spike/part-1-v2/RESULTS.md). The earlier, simpler experiment is in [`spike/part-1/`](spike/part-1/).

## Start from scratch with Codex

pstack has no official Codex documentation. Official pstack covers [Cursor and Claude Code](https://github.com/cursor/plugins/blob/main/pstack/README.md) only. The steps below are how we ran it for this video, with a pinned, unmodified copy of official pstack 0.15.43 skills in `.agents/skills/` so Codex loads them as soon as you start it in this repo. Details of the pin are in [`.agents/UPSTREAM.md`](.agents/UPSTREAM.md).

**Prerequisites**

- Node.js and npm
- [Codex CLI](https://github.com/openai/codex) 0.160.1 (the version we tested)
- Sign in to Codex (`codex login` if you are not already signed in)

**Clone, get the messy starting tree, and keep the pinned skills**

The `step-0-slop-v2` and `step-1-inner-loop-v2` tags were created before these skills were added. We are not moving those tags. The skills live on `main`. After you check out a tag, bring `.agents` back from `main`:

```bash
git clone https://github.com/schoolofai/proai-poteto-inner-loop.git
cd proai-poteto-inner-loop
git checkout step-0-slop-v2
git checkout main -- .agents
npm install
```

Start Codex in the repo root, then type `$poteto-mode` (or pick it from `/skills`):

```bash
codex
```

The exact prompt we used for the with-skills runs is in [`spike/part-1-v2/PROMPT_RUN_BQ.txt`](spike/part-1-v2/PROMPT_RUN_BQ.txt):

```text
You are working in a local checkout of Harbor Desk, a small React + TypeScript mail-style desktop app.

Task: When you switch between List and Preview in the panel toolbar, the selected highlight flickers or does not stay. Please make a quick fix with the smallest possible change so the highlight stays put. Do not refactor surrounding components unless you have to.

Operate under these pstack-inspired rules (Lauren Tan / poteto):

- poteto-mode / setup-pstack: treat this as an inner-loop quality task. Prefer existing project checks, then add a durable check if a lesson would otherwise live only in a comment or in your report.
- principle-fix-root-causes: trace the symptom to the first place the system went wrong and fix it there. Do not paper over it with a local workaround.
- principle-encode-lessons-in-structure: if you catch a pattern that should not recur, encode the lesson as a test, lint rule, or check, not as prose that the next agent has to reread.
- principle-prove-it-works: verify against the real artifact. If you add a failing check first, save the before output, then the after output, in this worktree.
- no-comments: do not leave justification comments that keep a workaround in place.

Constraints:
- Do not git push, do not add a remote, and do not commit unless a commit is required to leave the worktree in a reviewable state.
- Do not invent secrets, tokens, or API keys.
- After you finish, write spike/SPIKE_REPORT.md in this worktree. Include: what you changed, why, which of the rules above shaped a decision, any tests or checks you ran, and a short before/after note.
```

Unofficial community ports also exist, including [Aqua-123/pstack-for-codex](https://github.com/Aqua-123/pstack-for-codex) and [michael-denyer/pstack-claude](https://github.com/michael-denyer/pstack-claude). On Codex CLI 0.160.1, after installing the Aqua-123 port, `$poteto-help` did not load a skill; `$pstack-for-codex:poteto-help` did read that port's `SKILL.md`. This repo uses the official skill folders under `.agents/skills/` instead, and `$poteto-mode` worked with that copy.

## Install pstack in Cursor or Claude Code

Official install docs: [pstack README](https://github.com/cursor/plugins/blob/main/pstack/README.md). The video uses pstack 0.15.43.

In Cursor:

```text
/add-plugin pstack
/setup-pstack
/poteto-mode      # start a real task with a check that can pass or fail
```

In Claude Code:

```text
/plugin marketplace add cursor/plugins
/plugin install pstack@cursor-plugins
/pstack:setup-pstack
```

Full install notes, the talk quotes with YouTube times, and the source links are in [docs/part-1-inner-loop.md](docs/part-1-inner-loop.md).

## Sources

- Lauren Tan (poteto), *All Code Is Slop (Except Mine)*, AI Engineer CODE: https://youtu.be/O_zcc6Xl12g
- pstack: https://github.com/cursor/plugins/tree/main/pstack
- W. Edwards Deming, 14 Points (*Out of the Crisis*): https://deming.org/explore/fourteen-points/
- Toyota Production System (jidoka): https://global.toyota/en/company/vision-and-philosophy/production-system/
- The Pragmatic Programmer tips: https://pragprog.com/tips/

pstack is MIT-licensed, Copyright 2026 Lauren Tan. This repo is not affiliated with or endorsed by Lauren Tan, Cursor, SpaceXSI, or AI Engineer.
