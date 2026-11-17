# Part 2: Every correction becomes a check

Companion notes for Part 2 of the ProAI Clips series *Apply Viral Poteto AIE Talk Patterns One Skill at a Time*: install steps, full quotes, source links, every prompt, and the experiment transcripts. Video link coming soon.

**pstack version used in the video:** 0.15.43, as published on [cursor/plugins](https://github.com/cursor/plugins/tree/main/pstack). The vendored `.agents/skills/correct/SKILL.md` is byte-identical to upstream `main` at the time of recording.

Not affiliated with or endorsed by Lauren Tan, Cursor, SpaceXSI, or AI Engineer. pstack is MIT-licensed (Copyright 2026 Lauren Tan).

## What this part is about

When you correct a coding agent in chat, the next session doesn't know. Lauren Tan (@poteto) says to turn each correction into a deterministic check instead of another line of prose. pstack's `correct` skill does that: it finds the class of mistake, fixes it at the highest level that works (architecture, then types or lint, then tests, then docs), proves each new check fails on a real past mistake, and keeps a rule table that pairs each rule with what enforces it.

## Install and run `correct`

- **Cursor:** install pstack (`/add-plugin pstack`, then `/setup-pstack`; see [Part 1](part-1-inner-loop.md)), then type `/correct`.
- **Claude Code:** `/plugin marketplace add cursor/plugins`, `/plugin install pstack@cursor-plugins`, then `/pstack:correct`.
- **Codex CLI:** there is no official pstack documentation for Codex. This repo vendors the official skill folders at `.agents/skills/`, which Codex reads when you start it in the repo root. Type `$correct` as your message, or pick it from `/skills`.

Run it **in the same chat where you corrected the agent**, so it can see the correction. It also reads recent commits, so committing the bad change and the fix helps it find the evidence.

## Follow along

```bash
git clone https://github.com/schoolofai/proai-poteto-inner-loop.git
cd proai-poteto-inner-loop
git checkout step-2-start      # step-0-slop-v2 + the pstack skills, including correct
npm install
codex
```

1. Paste [`spike/part-2/prompts/S1_task_compact.txt`](../spike/part-2/prompts/S1_task_compact.txt) (add a Compact button).
2. If it copies `deferVisualClass`, correct it with [`S2_correction.txt`](../spike/part-2/prompts/S2_correction.txt).
3. In the same chat, type `$correct`.
4. Run `npm run check`. Compare with tag `step-2-correct`.

Tags:

| Tag | What it is |
| --- | --- |
| `step-2-start` | `step-0-slop-v2` plus `.agents/skills` (pstack 0.15.43, with `correct`) |
| `step-2-chat-fix` | The Compact button after one correction in chat. The rest of the repo is unchanged: five components still use the 40 ms helper and `CONTRIBUTING.md` still says to use it. |
| `step-2-correct` | The unchanged result of `$correct` from the run shown in the video (chain c7) |

## What `$correct` changed (tag `step-2-correct`)

- Deleted `src/deferVisualClass.ts` and moved all six visual-state components to set their class in `className` from props or state.
- Added an oxlint rule in `.oxlintrc.json`:
  ```json
  "no-restricted-properties": ["error", { "property": "classList",
    "message": "Derive visual classes from React state in JSX className; do not mutate DOM classes." }]
  ```
- Added `src/visualState.test.tsx`, behaviour tests that fail on the old components and on the first-session Compact button.
- Rewrote the visual-state section of `CONTRIBUTING.md`.
- Added `AGENTS.md` with a rule table (rule → what enforces it), `npm run check` (lint, tests, build) and a CI workflow that runs the same command.

Its own summary: “Fixed one repeated mistake class: effect-driven visual classes, copied from existing controls into Compact … Added a lint rule naming the fix. Types alone cannot prevent DOM mutation.” Full transcript: [`spike/part-2/runs/c7-3-correct/`](../spike/part-2/runs/c7-3-correct/).

## The experiment

Full results: [`spike/part-2/RESULTS.md`](../spike/part-2/RESULTS.md). In short, using OpenAI's Codex CLI 0.160.1, each run in a fresh copy:

- **Correction in chat only:** 3 of 3 fresh sessions copied the timer helper again for a similar button.
- **Chat plus one line in `AGENTS.md`** ([`prompts/AGENTS_line.md`](../spike/part-2/prompts/AGENTS_line.md)): 0 of 6 copied it, even when told to copy the old Priority only button. But the real mistaken change passes every check in that repo (3 of 3).
- **After `$correct`** (3 separate runs): 0 of 6 fresh sessions copied it. The real mistaken change now fails (3 of 3). The same timer written by hand without the helper is caught only by the run that added a lint rule (1 of 3).

Every prompt, diff, final message and raw `codex exec --json` trace is under `spike/part-2/runs/`. The harness scripts are in `spike/part-2/harness/`.

## Reading `correct/SKILL.md`

The file is [`.agents/skills/correct/SKILL.md`](../.agents/skills/correct/SKILL.md). The parts the video highlights:

- “Assume every contributor is an agent that sees only the files it opened, copies the nearest example, and takes the shortest path that compiles.”
- “Group the mistakes into classes. A class counts once it has happened twice.”
- The four levels: eliminate with architecture; enforce with types, or “a lint or CI check whose error names the file, type, or function to use instead”; test the behaviour; docs or agent rules last, because “Nothing fails when an agent skips them.”
- “Prove each new check fails on a real past mistake.”
- “Keep a table in the agent instruction file that pairs each rule with what enforces it.”

If `$correct` doesn't add a lint rule, ask for one. In the experiment, deleting the helper stopped copies, but only the lint rule stopped the same mistake written fresh.

## Talk quotes

Source: [All Code Is Slop (Except Mine) — Lauren Tan, SpaceXSI](https://youtu.be/O_zcc6Xl12g), AI Engineer. Times are from the video's English captions. Fillers are removed and “agents.md” is written AGENTS.md.

1. **3:12.** “Whenever you're correcting your agent, think about how you can make that a deterministic check instead of adding another line to your rules or your AGENTS.md, because it's far more reproducible when it's in code and it lets you trust it more.”
2. **4:24.** “Because code is the biggest input for agents, it means that any workarounds, anti-patterns, deprecated code, tech debt, it's now likely to be just copied by the next agent since it looks like the established pattern in your codebase.”
3. **8:41.** “The worst part about comments though is that they're not enforceable. So what seems well intentioned, like I'm going to tell the next agent not to do something, never ends up actually being anything that you can trust.”
4. **8:55.** “We now have lint rules that give good and very helpful error messages telling the agent to fix the root cause, the real problem, rather than just patch around it.”
5. **9:10.** “Our general principle is that every time we correct our agents, it turns into one of these deterministic checks or we think about how to categorically eliminate that problem in the code through better API design, through better architecture.”
6. **15:17.** “Whenever you correct your agent, try and do it by improving your codebase first. Start with a lint rule to prevent new occurrences of anti-patterns and then clean up those old patterns as well.”

## Further reading

- Shigeo Shingo, *Zero Quality Control: Source Inspection and the Poka-yoke System* (Productivity Press, 1986). Foreword, p. x: “It occurred to me that we were giving feedback and taking action only after defects had been detected, and I wondered whether there were not some inspection system that would prevent defects from occurring in the first place.” The spring-insertion example is in chapter 4 (Figure 4-1). [Publisher page](https://www.taylorfrancis.com/books/mono/10.4324/9780203733639/zero-quality-control-shigeo-shingo).
- Yaron Minsky, [“Effective ML Revisited”](https://blog.janestreet.com/effective-ml-revisited/), Jane Street blog, 9 March 2011: “Make illegal states unrepresentable.”
- Kent Beck, [post on X](https://x.com/KentBeck/status/250733358307500032), 25 September 2012: “for each desired change, make the change easy (warning: this may be hard), then make the easy change”.
