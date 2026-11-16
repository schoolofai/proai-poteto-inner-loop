# Part 1: Harden the inner loop first

Private local notes for the ProAI Clips series *Apply Viral Poteto AIE Talk Patterns One Skill at a Time*. This folder is not for publishing until the owner approves. Do not push a public remote from this machine.

**Recorded:** 16 Nov 2026, evening, Europe/London (UTC+0).  
**pstack version to pin:** 0.15.43, as published on [cursor/plugins](https://github.com/cursor/plugins/tree/main/pstack) when checked that evening (`plugin.json`).

This video is not endorsed by Lauren Tan, Cursor, SpaceXSI, or AI Engineer. pstack is MIT-licensed (Copyright 2026 Lauren Tan). Credit the plugin and the talk; do not imply official sign-off.

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

Official docs checked on 16 Nov 2026 document Cursor and Claude Code only.

## Talk quotes (YouTube times on the published cut)

Source: [All Code Is Slop (Except Mine) — Lauren Tan, SpaceXSI](https://youtu.be/O_zcc6Xl12g), AI Engineer, premiered 14 Nov 2026. Times are clip-relative on that video. The official machine transcript uses a livestream clock that starts at 1:01:02 (YouTube 0:00). A few auto-caption errors are corrected in brackets. Do not play talk footage in the video; use a quote card with this credit: Lauren Tan (@poteto), AI Engineer CODE 2026, plus the timestamp and link.

1. **1:33.** “The job of a software engineer, the meta of being a software engineer, is figuring out how to maintain or even improve the quality of your code while massively increasing your productivity.”
2. **1:52.** “Some people like to call this a software factory, but I like to keep it simple and I think of it as all about trust. Not blind trust, but investing in your agent’s environment so you can trust that your agents are going to do the right thing.”
3. **2:25–3:10.** She calls the diagram an “inverse pyramid” of where to spend time. “The first two layers are deterministic”: the code itself (API design, architecture, refactoring) and lint rules, type systems, compilers, and tests, used together “to constrain what agents can do and force them to do the right thing by default.” Then verification. “And then finally, you want to layer with a little bit of prose. So things like rules, skills, [AGENTS.md], things that require judgment.”
4. **3:35.** “Whenever you’re correcting your agent, think about how you can make that a deterministic check instead of adding another line to your rules or your [AGENTS.md], because it’s far more reproducible when it’s in code and it lets you trust it more.”
5. **15:33.** “So before you jump into building out a software factory and automating everything that you can, whenever you correct your agent, try and do it by improving your codebase first. Start with a lint rule to prevent new occurrences of anti-patterns, and then clean up those old patterns as well, and then make sure that your verification story is really strong.”
6. **15:59.** “If your inner coding loop produces slop, then automating that loop just produces more slop, and you need to throw more and more and more tokens at the problem, which we all know is very expensive.”

## Software-engineering sources behind the idea

Verified against the linked sources on 16 Nov 2026. Use these on screen as credited stills. Do not invent quotes.

### W. Edwards Deming, *Out of the Crisis*, point 3

**Verified quote:** “Cease dependence on inspection to achieve quality. Eliminate the need for inspection on a mass basis by building quality into the product in the first place.”

**Source:** The W. Edwards Deming Institute’s page for the 14 Points, citing *Out of the Crisis* (MIT Press), pp. 23–24: https://deming.org/explore/fourteen-points/

**On screen:** Deming’s name, the book title, and the quote. Photograph: [W. Edwards Deming.jpg](https://commons.wikimedia.org/wiki/File:W._Edwards_Deming.jpg) on Wikimedia Commons, public domain in the United States (U.S. Food and Drug Administration). Credit: “W. Edwards Deming, U.S. FDA, public domain, via Wikimedia Commons.” Optional typographic *Out of the Crisis* title card rather than a book-cover scan.

### Toyota Production System, jidoka, and Taiichi Ohno

**Verified wording, from Toyota’s official page, not a personal Ohno aphorism we could not pin to a primary book page:** jidoka “can be loosely translated as ‘automation with a human touch,’” and is “based on the concepts of stopping immediately when abnormalities are detected to prevent defective products from being produced.” When something is wrong, “the machine or equipment can detect the abnormality and stop automatically, or the operator can stop the line by pulling the stop cord themselves.” That “makes it possible to build quality into processes.”

**Source:** Toyota Motor Corporation, “Toyota Production System,” official global site: https://global.toyota/en/company/vision-and-philosophy/production-system/

The same page names Taiichi Ohno (1912–1990) as the engineer who, with Eiji Toyoda’s backing, helped establish TPS and the Just-in-Time framework. Sakichi Toyoda’s automatic loom is given as the root of the jidoka idea (the machine stops when a thread breaks).

**On screen:** A typographic card: “jidoka — automation with a human touch,” plus “build quality into processes,” credited to Toyota’s official TPS page. **Do not use** the Wikimedia file `Ohno-Taiichi-1.jpg` unless legal has cleared it for a U.S. YouTube upload; the Commons page treats it as public domain in Japan but not clearly public domain in the United States. Prefer no portrait, or a clearly licensed still if one is obtained later.

### Andrew Hunt and David Thomas, *The Pragmatic Programmer*

**Verified official tip text (20th Anniversary Edition), reproduced by the publisher:** Tip #5, p. 7, “Don’t Live with Broken Windows”: “Fix bad designs, wrong decisions, and poor code when you see them.”

**Source:** The Pragmatic Bookshelf tips page, which states the tips are excerpted from the 20th Anniversary Edition and reproduced with permission of the publisher: https://pragprog.com/tips/

The first edition’s longer wording is widely quoted (“Don’t leave ‘broken windows’ (bad designs, wrong decisions, or poor code) unrepaired…”). We did not rely on unofficial book-scan sites as a canonical source. On screen, use the publisher’s official tip text above, and say it is Tip 5 from *The Pragmatic Programmer*, 20th Anniversary Edition.

**On screen:** Typographic book-title and tip card, plus a link card to pragprog.com/tips/. Do not use a scanned book cover unless we have a licence; the cover is copyrighted.

### Kent Beck (not used as an exact slogan)

The phrase “make it work, make it right, make it fast” is often attributed to Kent Beck, but a 1983 *Byte* article by Stephen C. Johnson and Brian W. Kernighan already has “first make it work, then make it right, and, finally, make it fast.” We are **not** putting that line in the script as a Beck quote. If a later part needs Beck, use a line we can cite from his own writing, such as his description of test-driven development in [A Career Accounting](https://newsletter.kentbeck.com/p/ideas-ive-contributed-to-in-software).

## Skill walkthrough (from the SKILL.md bodies)

Loaded and read on 16 Nov 2026.

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

**Key lines from the skill, to show on screen:**

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

Harbor Desk is a tiny Vite + React + TypeScript folder sidebar (Inbox, Sent, Drafts). At tag `step-0-slop` it contains seeded slop:

- `SidebarItem` removes the `is-active` class, then uses `setTimeout` (40 ms) to put it back, with a comment that calls this a “quick fix” and says “Do not remove this — it’s the only thing stopping the flicker.”
- `StatusBadge` copy-pastes the same delayed class toggle for `has-unread`.
- The only tests at that tag cover `formatCount`, not the click path, so `npm test` is green while the highlight lags.

The delay is the flicker. The root-cause fix is to set the class from props in the render, and delete the timer, the effect, and the justifying comment.

Tags:

- `step-0-slop` — the broken tree.
- `step-1-inner-loop` — root-cause fix, behavior tests, `npm run verify`, and `scripts/check-no-timer-workaround.mjs`, which fails if `setTimeout`, `setInterval`, `requestAnimationFrame`, or `requestIdleCallback` reappear in production `src`.

## Spike: same task, twice

**Tooling, honestly.** The spike ran on **OpenAI Codex CLI 0.160.1**, using its default OpenAI provider. Both runs used `codex exec` in isolated git worktrees starting from `step-0-slop`. No `--model` flag was passed, so the CLI’s default OpenAI model was used. Prompts, diffs, reports, event logs, and raw `codex exec --json` traces are in `spike/part-1/`.

**Shared task.** “Fix the sidebar flicker bug… the selected highlight flickers or shows up late… similar flash on the unread badge.” The unguided run got only that task. The guided run got the same task plus operating rules taken from `/setup-pstack`, `/poteto-mode`, `principle-prove-it-works`, `principle-encode-lessons-in-structure`, and `principle-fix-root-causes`.

**Run A, no pstack guidance** (about 58 seconds). The agent did **not** copy the `setTimeout` pattern. It identified the delayed class toggle as the cause, derived `is-active` and `has-unread` from props, deleted the effects, timers, and workaround comments, and added regression tests (4 tests total after the existing format tests). `npm test`, `npm run build`, and `npm run lint` passed. It did **not** add a repo-level gate that would fail if a later agent put a timer back, and it did not save a failing-before log.

**Run B, with the skill rules in the prompt** (about 93 seconds). The same root-cause fix. Additional inner-loop work the unguided run did not do:

- Wrote the behavior tests first and kept fake timers frozen, so a delayed class update would fail.
- Saved `verification-before.txt` showing those tests failing on the original code, then `verification-after.txt` after the fix.
- Added `npm run verify` to run lint, typecheck, tests, and the production build as one command.
- Named, in `SPIKE_REPORT.md`, each principle that changed a decision.

Run B also did not add a lint or script that bans timers in production source. That last gate was added after the spike, by hand, as the inner-loop hardening for tag `step-1-inner-loop`.

**What we will and will not claim on screen.** Do not say “without pstack the agent copied the quick fix.” In this spike, both runs removed the timers. The measured difference is the *loop*: the guided run proved the bug with a failing test, scripted a `verify` command, and wrote down the principles. The tag then encodes the lesson so the next agent cannot quietly bring the timer back.

## Exact prompts

See `spike/part-1/PROMPT_RUN_A.txt` and `spike/part-1/PROMPT_RUN_B.txt`.

## How to reproduce locally

```bash
git checkout step-0-slop
npm install
npm test          # 2 passing tests that miss the flicker

# After checkout of step-1-inner-loop:
npm install
npm run verify    # timer check, lint, typecheck, 5 tests, production build
```

The timer check is designed to fail on the `step-0-slop` tree and pass on `step-1-inner-loop`.

## Secrets

No API keys, `.env` files, or credentials belong in this repository. Logs were scanned for secret-like strings before they were added.
