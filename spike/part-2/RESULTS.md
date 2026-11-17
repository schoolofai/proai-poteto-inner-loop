# Part 2 spike results: every correction becomes a check (`$correct`)

OpenAI Codex CLI 0.160.1, `codex exec --json`, sandbox `workspace-write`, no `--model` flag (CLI default model). Every run starts from a fresh copy of the repo with its own one-commit git history, and every session uses a throwaway `CODEX_HOME` holding only copies of `auth.json` and `config.toml`. API keys were unset in the Codex processes. No remotes, no pushes. Harness scripts are in `harness/`, prompts in `prompts/`, and each run's prompt, diff, final message, event summary and raw `codex.jsonl` trace are in `runs/<id>/`.

The skills are the official pstack 0.15.43 files, vendored in `.agents/skills/` (now including `correct/SKILL.md`, byte-identical to `cursor/plugins` main on 17 Nov 2026). Codex discovers them there. `$correct` is typed as the whole message.

## The question

If you correct a coding agent once in chat, does the next agent repeat the mistake? And what changes after you run `$correct`?

## The mistake

Starting tree: `step-0-slop-v2` plus `.agents/skills`. Five components set visual classes through `deferVisualClass`, a helper that removes a class and puts it back after a 40 ms timer, and `CONTRIBUTING.md` tells new work to keep using it.

Session 1 prompt (`prompts/S1_task_compact.txt`): add a "Compact" button next to "Priority only"; highlight it with `is-active` and give the panel a `compact` class; keep the change small and run the checks.

## Why not start from `step-1-inner-loop-v2`

On the clean Part 1 tree, two pilot runs of a similar small task (`prompts/PILOT_clean_reset_on_folder.txt`, `runs/pilot-clean-reset1..2`) wrote clean, state-derived code. There was nothing to correct. The mistake only repeats where the repo still teaches it, so Part 2 goes back to the messy tag.

## Step 1: does the first agent make the mistake?

| Runs | Copied `deferVisualClass` into the new button |
| --- | --- |
| Pilots, skills installed (`pilot-compact-skills1..2`) | 2 of 2 |
| Pilots, no `.agents` folder (`pilot-compact-noskills1..2`) | 2 of 2 |
| Chains c1–c7, skills installed (`c*-1-task`) | 4 of 7 (c3, c5, c6, c7). c1, c2 and c4 rendered the class from state. |

With the skills installed, 6 of 9 first sessions copied the helper.

A chain only went on to the correction when session 1 actually made the mistake. c1 and c2 were started before that gate existed, so they were sent the correction anyway; they are kept in `runs/` but not used. c3 is discarded: an aborted first batch (`runs/_first-batch-aborted/`, different wording) left a harness process writing into the same folder, and its history shows two overlapping writers. **Valid chains: c5, c6, c7.**

## Step 2: one correction in chat

Same session, `prompts/S2_correction.txt`: "That works, but please don't use deferVisualClass or any timer for this. The highlight and the compact class should come straight from state when the component renders. Please redo it that way."

c5, c6 and c7 each fixed the Compact button in one turn (about 20 s each). Nothing else in the repo changed.

## Step 3: `$correct` in the same session

| Chain | Time | Class it named | Deleted the helper and migrated the old call sites | Behaviour tests that fail on the old code | Lint rule | `AGENTS.md` rule table | Rewrote `CONTRIBUTING.md` | CI runs the same command |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| c5 | 94 s | "imperative visual classes, present in six components and copied into Compact" | Yes, six controls | Yes ("seven regression tests") | No | Yes | Yes | Yes (`npm run check`) |
| c6 | 88 s | "visual classes drifting from React state" | Yes, six controls | Yes ("all three fail against the actual past implementation") | No | Yes | Yes | Yes |
| c7 | 112 s | "effect-driven visual classes, copied from existing controls into Compact" | Yes, six controls | Yes | **Yes**: oxlint `no-restricted-properties` on `classList`, message "Derive visual classes from React state in JSX className; do not mutate DOM classes." | Yes | Yes | Yes |

Every run opened with "I'm using the correct skill…". None could commit: Codex's `workspace-write` sandbox keeps `.git` read-only, and all three said so. The harness committed each step afterwards, so `$correct` could read the earlier steps in `git log` as well as the chat.

c7's own reasoning for the levels: "Types alone cannot prevent DOM mutation."

Checked independently on tag `step-2-correct` (c7's tree): `npm run check` passes. With the first-session Compact code and the helper restored, the test "toolbar classes follow each interaction immediately in both directions" fails and lint reports `classList` twice, with the help text above.

## Step 4: a fresh session, a similar task

Prompt `prompts/N_next_task_unread.txt`: add an "Unread only" button next to "Priority only", highlighted with `is-active`; keep it small; run the checks.

| Side | Repo state | Copied the helper (or another timer) |
| --- | --- | --- |
| A, chat only (`next-A5..7`) | after the chat correction | **3 of 3** (`import { deferVisualClass }` in a new `UnreadFilter.tsx`) |
| L, chat + one line in `AGENTS.md` (`next-L5..7`) | same, plus `prompts/AGENTS_line.md` | 0 of 3 |
| B, after `$correct` (`next-B5..7`) | after `$correct` | 0 of 3 |

The same three states with a prompt that points straight at the old code (`prompts/Q_copy_priority.txt`, "copy PriorityFilter and adapt it. Quick fix"): L 0 of 3, B 0 of 3 (`copy-L5..7`, `copy-B5..7`).

In this small repo, a single `AGENTS.md` line was enough to steer the next agent in all six runs. The L runs read `AGENTS.md`; the B runs did not open it in the `next-B` runs, because there was no helper left to copy.

## Step 5: replay the real past mistake against each repo

`harness/inject.sh` takes the exact change an A run made (`next-A5..7/step.diff`) and applies it to the L and B states, then runs every check script. A second variant writes the same delayed class by hand, without the helper (`replay/UnreadFilter.inline-timer.tsx`). Results are in `replay/`.

| Replay | L (chat + `AGENTS.md` line) | B (after `$correct`) |
| --- | --- | --- |
| Copied helper (A's real diff) | Passes test, typecheck, lint and build in 3 of 3 | Fails in 3 of 3: `Cannot find module './deferVisualClass'` in typecheck, build and tests |
| Same timer written by hand | Passes everything in 3 of 3 | c7: **lint fails**, naming the fix. c5: one test fails, but only because its selector now finds the new button by its copied class name. That's a selector collision, not a behaviour check. c6: passes everything. |

## Verdict

- A correction that lives only in chat was gone in the next session: 3 of 3 fresh agents copied the helper again.
- One `AGENTS.md` line steered all six next sessions here, but nothing fails when it's ignored. The real past mistake passes every check in that repo, the five old helper call sites are still there, and `CONTRIBUTING.md` still says to use the helper.
- `$correct` changed the repo in all three runs: helper deleted, six controls migrated, guidance rewritten, behaviour tests, rule table and CI. The copied-helper mistake now fails in 3 of 3.
- Only the run that added a lint rule (c7, 1 of 3) catches the same mistake written fresh without the helper. Behaviour tests on existing components don't cover a new component.

Don't claim the `AGENTS.md` line failed in these runs; it didn't. Don't claim every `$correct` run added a lint rule; one of three did. Don't claim the B agents hit the lint error; none did, because they wrote clean code first time.

## Tags

- `step-2-start`: `step-0-slop-v2` + `.agents/skills` (the run base for every chain).
- `step-2-chat-fix`: c7 after session 1 and the one chat correction.
- `step-2-correct`: c7's `$correct` result, unchanged.
