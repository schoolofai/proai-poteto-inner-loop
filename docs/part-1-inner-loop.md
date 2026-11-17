# Part 1: Harden the inner loop first

Companion notes for Part 1 of the ProAI Clips series *Apply Viral Poteto AIE Talk Patterns One Skill at a Time*: install steps, full quotes, source links, and the experiment transcripts. Video link coming soon.

**pstack version used in the video:** 0.15.43, as published on [cursor/plugins](https://github.com/cursor/plugins/tree/main/pstack) (`plugin.json`). Pin it if you want the same results.

Not affiliated with or endorsed by Lauren Tan, Cursor, SpaceXSI, or AI Engineer. pstack is MIT-licensed (Copyright 2026 Lauren Tan).

## What this part is about

Lauren Tan (who posts as @poteto) argues that before you build a “software factory,” you should harden the *inner* coding loop: the codebase, deterministic checks (lint, types, tests), then verification, and only then a little prose. This part teaches two pstack skills that set that environment up: `/setup-pstack` and `/poteto-mode`, plus two principles those skills call on, `principle-prove-it-works` and `principle-encode-lessons-in-structure`.

## How to install pstack

Official docs: [pstack README](https://github.com/cursor/plugins/blob/main/pstack/README.md) and [setup guide](https://github.com/cursor/plugins/blob/main/pstack/docs/guide/01-setup.md). Licence: [MIT, Copyright 2026 Lauren Tan](https://raw.githubusercontent.com/cursor/plugins/main/pstack/LICENSE).

**In Cursor**

1. In chat, run `/add-plugin pstack` (or install from Customize in the sidebar).
2. Run `/setup-pstack`. Pick a reasoning budget and models. It writes `~/.cursor/rules/pstack-models.mdc` and applies to new sessions.
3. For work that needs rigor, start the task with `/poteto-mode`. Pick it from the `/` menu before you type, so Cursor attaches the skill. Option+Enter (Mac) or Alt+Enter (Windows) can pin it as a Custom Mode for the whole chat.
4. If you are unsure which skill to use, ask `/poteto-help`.

At the end of setup, `/setup-pstack` offers once to generate a project-local verification skill (`/create-verification-skill`) and once to generate a formal verification skill. Those skills are later parts of this series. The official setup guide says that if you are new, saying yes to verification pays off the most.

**In Claude Code**

```text
/plugin marketplace add cursor/plugins
/plugin install pstack@cursor-plugins
```

Commands are prefixed: `/poteto-mode` becomes `/pstack:poteto-mode`, `/setup-pstack` becomes `/pstack:setup-pstack`. Setup writes `~/.claude/rules/pstack-models.md`. Auto-update for third-party marketplaces is off by default; see the README for enabling it or running `claude plugin update pstack@cursor-plugins`. Some Cursor-only steps are skipped with a one-line note. See the [Claude Code adapter](https://github.com/cursor/plugins/blob/main/pstack/docs/harness/claude-code.md).

The official docs cover Cursor and Claude Code.

## Talk quotes (YouTube times on the published cut)

Source: [All Code Is Slop (Except Mine) — Lauren Tan, SpaceXSI](https://youtu.be/O_zcc6Xl12g), AI Engineer, premiered 14 Nov 2026. Times are clip-relative on that video. The official machine transcript uses a livestream clock that starts at 1:01:02 (YouTube 0:00). A few auto-caption errors are corrected in brackets.

1. **1:33.** “The job of a software engineer, the meta of being a software engineer, is figuring out how to maintain or even improve the quality of your code while massively increasing your productivity.”
2. **1:52.** “Some people like to call this a software factory, but I like to keep it simple and I think of it as all about trust. Not blind trust, but investing in your agent’s environment so you can trust that your agents are going to do the right thing.”
3. **2:25–3:10.** She calls the diagram an “inverse pyramid” of where to spend time. “The first two layers are deterministic”: the code itself (API design, architecture, refactoring) and lint rules, type systems, compilers, and tests, used together “to constrain what agents can do and force them to do the right thing by default.” Then verification. “And then finally, you want to layer with a little bit of prose. So things like rules, skills, [AGENTS.md], things that require judgment.”
4. **3:35.** “Whenever you’re correcting your agent, think about how you can make that a deterministic check instead of adding another line to your rules or your [AGENTS.md], because it’s far more reproducible when it’s in code and it lets you trust it more.”
5. **15:33.** “So before you jump into building out a software factory and automating everything that you can, whenever you correct your agent, try and do it by improving your codebase first. Start with a lint rule to prevent new occurrences of anti-patterns, and then clean up those old patterns as well, and then make sure that your verification story is really strong.”
6. **15:59.** “If your inner coding loop produces slop, then automating that loop just produces more slop, and you need to throw more and more and more tokens at the problem, which we all know is very expensive.”

## Software-engineering sources behind the idea

### W. Edwards Deming, *Out of the Crisis*, point 3

**Quote:** “Cease dependence on inspection to achieve quality. Eliminate the need for inspection on a mass basis by building quality into the product in the first place.”

**Source:** The W. Edwards Deming Institute’s page for the 14 Points, citing *Out of the Crisis* (MIT Press), pp. 23–24: https://deming.org/explore/fourteen-points/

**Photo used in the video:** [W. Edwards Deming.jpg](https://commons.wikimedia.org/wiki/File:W._Edwards_Deming.jpg) on Wikimedia Commons, U.S. Food and Drug Administration, public domain in the United States.

### Toyota Production System, jidoka, and Taiichi Ohno

**From Toyota’s official page:** jidoka “can be loosely translated as ‘automation with a human touch,’” and is “based on the concepts of stopping immediately when abnormalities are detected to prevent defective products from being produced.” When something is wrong, “the machine or equipment can detect the abnormality and stop automatically, or the operator can stop the line by pulling the stop cord themselves.” That “makes it possible to build quality into processes.”

**Source:** Toyota Motor Corporation, “Toyota Production System,” official global site: https://global.toyota/en/company/vision-and-philosophy/production-system/

The same page names Taiichi Ohno (1912–1990) as the engineer who, with Eiji Toyoda’s backing, helped establish TPS and the Just-in-Time framework. Sakichi Toyoda’s automatic loom is given as the root of the jidoka idea (the machine stops when a thread breaks).

### Andrew Hunt and David Thomas, *The Pragmatic Programmer*

**Official tip text (20th Anniversary Edition), reproduced by the publisher:** Tip #5, p. 7, “Don’t Live with Broken Windows”: “Fix bad designs, wrong decisions, and poor code when you see them.”

**Source:** The Pragmatic Bookshelf tips page, which states the tips are excerpted from the 20th Anniversary Edition and reproduced with permission of the publisher: https://pragprog.com/tips/

## Skill walkthrough (from the SKILL.md bodies)

### `/setup-pstack`

**What it is.** A setup skill. It does not fix your app. It writes an always-applied rule that tells pstack which model to use for each role, then offers to give the repo a way to prove behavior.

**What it makes the agent do.** Detect models you actually have. Ask for a reasoning budget (`large`, `medium`, or `small`). Write `~/.cursor/rules/pstack-models.mdc` (or `~/.claude/rules/pstack-models.md` in Claude Code) with `alwaysApply: true`. Confirm it applies to new sessions.

**Then it offers two optional project skills**, in this wording from the skill:

- “want a project-local verification skill, so agents can drive the app the way a user does and prove changes work? I can generate one with /create-verification-skill.”
- “want a formal verification skill, so agents can prove a key property of your code holds in every case in scope, not only the cases tests reach?”

The official setup guide adds: if you are new, say yes to verification. “An agent that can check its own work keeps going until the check passes. An agent that can’t hands every result back to you to check by hand.”

**Artifact.** The model rule file, and, if you accept, a project-local `verify-*` skill later in the series.

### `/poteto-mode`

**What it is.** The router. You start a real task with `/poteto-mode` and a check that can pass or fail. It matches the task to a playbook (for example Bug fix or Feature) and pulls in other skills as the work needs them.

**Key lines from the skill:**

- “The Principles section below grounds every trigger.”
- Under **Prove It Works:** “After a task, before declaring done. Verify against the real artifact, not a proxy or ‘it compiles’.”
- Under **Encode Lessons in Structure:** “You catch yourself writing the same instruction a second time. Encode it as a lint, metadata flag, runtime check, or script instead of more text.”
- Under **Foundational Thinking:** before writing logic, get “core types and data structures, scaffold-vs-feature sequencing” in place.
- It also requires the agent to name, in the reply, each principle that shaped a decision and the specific choice it changed.

The public README says to use `/poteto-mode` “whenever you’re doing anything that requires rigor,” and “if you want to go fast, go deep first.”

**Artifact.** A todo list of playbook steps, then the change, plus a report that names the principles used.

### `principle-prove-it-works`

**Exact lines:** “Verify every output by checking the real thing directly: run the feature, read the actual value, inspect the diff. Proxies (file mtimes, self-reports, cached output, ‘it compiles’) do not count.” And: “Script the check when you can. A deterministic script that reruns the comparison beats a one-time look.”

**Artifact.** A command a reviewer can rerun, and its output.

### `principle-encode-lessons-in-structure`

**Exact lines:** “If the lesson needs judgment and cannot be encoded, make the instruction more prominent and add an example of the failure mode.” Corollary: “If the fix is structural, only use the structural fix. The instruction is the symptom.”

**Artifact.** A lint rule, metadata flag, runtime check, or script — not another paragraph of advice.

## The sample app and the bug

Harbor Desk is a tiny Vite + React + TypeScript mail-style desktop (Inbox, Sent, Drafts on the left). There are two starting tags.

**Tag `step-0-slop` (first spike).** A folder sidebar only.

- `SidebarItem` removes the `is-active` class, then uses `setTimeout` (40 ms) to put it back, with a comment that calls this a “quick fix” and says “Do not remove this — it’s the only thing stopping the flicker.”
- `StatusBadge` copy-pastes the same delayed class toggle for `has-unread`.
- The only tests at that tag cover `formatCount`, not the click path, so `npm test` is green while the highlight lags.

**Tag `step-0-slop-v2` (the harder trap used in the revised script).** The same delayed toggle is extracted into a shared helper, `deferVisualClass`, and used in five controls: `SidebarItem`, `StatusBadge`, `SearchField`, `SyncIndicator`, and `PriorityFilter`. `CONTRIBUTING.md` tells new work to keep using that helper so the “layout-race fix” stays in one place. Commit messages on the branch treat the delay as normal. The new bug is `ViewToggle`: switching List / Preview runs an effect that only removes `is-active` and never puts it back. The highlight does not stay. The prompts never mention timers. The local house-style fix is to hook the button up to `deferVisualClass`. The root-cause fix is to derive `is-active` from the `selected` prop and delete the effect.

The delay, where it exists, *is* the flicker. In the first starting tree the timers are already in the broken controls. In the second tree the broken control is missing the helper, and the rest of the chrome makes that helper look like established style.

**Tag `step-1-inner-loop`** is the follow-up to the first spike only: root-cause fix on the sidebar and badge, behavior tests, `npm run verify`, and `scripts/check-no-timer-workaround.mjs`, which fails if `setTimeout`, `setInterval`, `requestAnimationFrame`, or `requestIdleCallback` reappear in production `src`. It does not include the v2 toolbar.

**Tag `step-1-inner-loop-v2`** is the follow-up to the harder-trap tree. Visual classes in the toolbar and sidebar are derived from props or state, `deferVisualClass` is deleted, behavior tests fail if a timer is required, and `npm run verify` runs the timer/`deferVisualClass` check, lint, typecheck, tests, and the production build. The check is designed to fail on `step-0-slop-v2` and pass on `step-1-inner-loop-v2`. This tag was added by hand after the v2 spike; no agent run created it.

## Spike v2: harder trap, same tool, honestly reported

This is the spike the revised Part 1 script follows. Recorded 16–17 Nov 2026, Europe/London (UTC+0). The BQ control was recorded just after midnight on 17 Nov. The outcome table, prompts, diffs, reports, event logs, and raw `codex exec --json` traces are in `spike/part-1-v2/`, with a short index in `spike/part-1-v2/RESULTS.md`.

**Tooling.** Same constraints as the first spike. The spike ran on **OpenAI Codex CLI 0.160.1**, using its default OpenAI provider. Every run used `codex exec` in a fresh isolated git worktree starting from `step-0-slop-v2`. No `--model` flag was passed, so the CLI’s default OpenAI model was used. No remotes, no pushes. Logs were scanned for secret-like strings; none were found.

**Tasks.** The first pair used: “When you switch between List and Preview in the panel toolbar, the selected highlight flickers or does not stay. Fix that and leave the app working. Keep the change small.” The unguided A runs got only that task. The guided B runs got the same task plus operating rules taken from `/setup-pstack`, `/poteto-mode`, `principle-prove-it-works`, `principle-encode-lessons-in-structure`, `principle-fix-root-causes`, and `no-comments`. After all three A runs declined to copy the helper, a further unguided variant (AQ) used: “Please make a quick fix with the smallest possible change so the highlight stays put. Do not refactor surrounding components unless you have to.” The missing control, BQ, used that same AQ wording plus the same pstack rules as B. The only intended difference between AQ and BQ is the skills.

**Outcomes, in brief.**

- **A1, A2, A3** (unguided, “keep the change small”; about 75 s, 64 s, and 65 s). None copied `deferVisualClass`. All three derived `is-active` from the selected prop, deleted the incomplete effect, added a `ViewToggle` test, and left the helper and the other five call sites alone. Several reports noticed `CONTRIBUTING.md` and chose not to follow it, because a delayed class would leave a gap in the highlight. They noted a pre-fix test failure in the report but did not save a before/after log file.
- **B1, B2, B3** (guided, same task as A; about 118 s, 72 s, and 61 s). The same root-cause fix as A. None copied the helper, none removed the existing timers, and none added a lint or script that would ban them. All three saved failing-then-passing test output (`before.txt` / `after.txt`, or `before-test.txt` / `after-test.txt` in B3). The reports named the principles that changed a decision, including the choice not to use the delayed helper. B1 also enabled CSS processing in Vitest and asserted the computed background color against the real stylesheet. B1 and B2 added two new tests (4 total); B3 added one file (3 total).
- **AQ1, AQ2** (unguided, “quick fix, smallest possible change”; about 43 s and 64 s). Both copied the house style. The diffs are the same: import `deferVisualClass` and `return deferVisualClass(ref.current, 'is-active', selected)`. The helper’s 40 ms delay remains. No new tests, no saved proof, no changes to surrounding components.
- **BQ1, BQ2, BQ3** (guided, same wording as AQ; about 53 s, 53 s, and 62 s). None copied the helper. All three made the root-cause fix, added a `ViewToggle` test (3 tests total), and saved failing-then-passing output (`before-tests.txt` / `after-tests.txt` in BQ1, `before-test.txt` / `after-test.txt` in BQ2, `before.txt` / `after.txt` in BQ3). The reports named the principles, including the choice not to follow `CONTRIBUTING.md`. None removed the existing timers or added a ban.

**What this shows, and what it does not.** The main contrast is AQ versus BQ: the same “quick fix, smallest possible change” wording, with the pstack rules as the only intended difference. Both unguided AQ runs copied the helper. All three guided BQ runs did the root-cause fix and proved it. With the “keep the change small” wording (A versus B), all three unguided runs also did the root-cause fix. No guided run removed the existing timers or added a ban; that gate is on tag `step-1-inner-loop-v2`, added by hand after the spike.

## Spike v1: first attempt, kept for the record

The first spike, earlier on the evening of 16 Nov 2026, used tag `step-0-slop` and the task “fix the sidebar flicker.” Prompts, diffs, reports, event logs, and raw traces are in `spike/part-1/`.

**Run A, no pstack guidance** (about 58 seconds). The agent did **not** copy the `setTimeout` pattern. It identified the delayed class toggle as the cause, derived `is-active` and `has-unread` from props, deleted the effects, timers, and workaround comments, and added regression tests (4 tests total after the existing format tests). `npm test`, `npm run build`, and `npm run lint` passed. It did **not** add a repo-level gate that would fail if a later agent put a timer back, and it did not save a failing-before log.

**Run B, with the skill rules in the prompt** (about 93 seconds). The same root-cause fix. Additional inner-loop work the unguided run did not do:

- Wrote the behavior tests first and kept fake timers frozen, so a delayed class update would fail.
- Saved `verification-before.txt` showing those tests failing on the original code, then `verification-after.txt` after the fix.
- Added `npm run verify` to run lint, typecheck, tests, and the production build as one command.
- Named, in `SPIKE_REPORT.md`, each principle that changed a decision.

Run B also did not add a lint or script that bans timers in production source. That last gate was added after the first spike, by hand, as the inner-loop hardening for tag `step-1-inner-loop`.

## Exact prompts

First spike: `spike/part-1/PROMPT_RUN_A.txt` and `spike/part-1/PROMPT_RUN_B.txt`.

Harder-trap spike: `spike/part-1-v2/PROMPT_RUN_A.txt`, `spike/part-1-v2/PROMPT_RUN_B.txt`, `spike/part-1-v2/PROMPT_RUN_A_QUICKFIX.txt`, and `spike/part-1-v2/PROMPT_RUN_BQ.txt`.

## How to reproduce locally

```bash
# Harder-trap starting tree used in the revised script:
git checkout step-0-slop-v2
npm install
npm test          # 2 passing tests that miss the view-toggle bug

# V2 follow-up:
git checkout step-1-inner-loop-v2
npm install
npm run verify    # timer/deferVisualClass check, lint, typecheck, 9 tests, production build

# First-spike starting tree:
git checkout step-0-slop
npm install
npm test          # 2 passing tests that miss the sidebar flicker

# First-spike follow-up:
git checkout step-1-inner-loop
npm install
npm run verify    # timer check, lint, typecheck, 5 tests, production build
```

The v1 timer check is designed to fail on the `step-0-slop` tree and pass on `step-1-inner-loop`. The v2 check, which also bans `deferVisualClass`, is designed to fail on `step-0-slop-v2` and pass on `step-1-inner-loop-v2`.

## Secrets

No API keys, `.env` files, or credentials belong in this repository. Logs were scanned for secret-like strings; none were found.
