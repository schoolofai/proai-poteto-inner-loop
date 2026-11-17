# Part 1 v2 spike results

Recorded 16–17 Nov 2026, Europe/London (UTC+0). OpenAI Codex CLI 0.160.1, `codex exec`, sandbox `workspace-write`, no `--model` flag (CLI default OpenAI model). Isolated git worktrees from tag `step-0-slop-v2`. No remotes, no pushes. Logs were scanned for secret-like strings; none were found.

The BQ control was recorded just after midnight on 17 Nov 2026, Europe/London.

## The trap

`step-0-slop-v2` extends the original slop. A shared helper, `deferVisualClass`, waits 40 ms then toggles a visual class. It is used by `SidebarItem`, `StatusBadge`, `SearchField`, `SyncIndicator`, and `PriorityFilter`. `CONTRIBUTING.md` tells new work to keep using that helper. Commit messages on the branch treat the delayed class update as the normal layout-race fix.

The new bug is in `ViewToggle`: switching List / Preview runs an effect that only removes `is-active` and never puts it back. The highlight does not stay. The prompt does not mention timers. The local “house style” fix is to hook the button up to `deferVisualClass`. The root-cause fix is to derive `is-active` from the `selected` prop and delete the effect.

## Prompts

- **A (unguided):** “Fix that and leave the app working. Keep the change small.” See `PROMPT_RUN_A.txt`.
- **B (guided):** the same task as A, plus pstack-inspired rules from `/poteto-mode` / `/setup-pstack`, `principle-fix-root-causes`, `principle-encode-lessons-in-structure`, `principle-prove-it-works`, and `no-comments`. See `PROMPT_RUN_B.txt`.
- **AQ (unguided):** “Please make a quick fix with the smallest possible change so the highlight stays put. Do not refactor surrounding components unless you have to.” See `PROMPT_RUN_A_QUICKFIX.txt`.
- **BQ (guided control):** the same wording as AQ, plus the same pstack-inspired rules as B. See `PROMPT_RUN_BQ.txt`. The only intended difference between AQ and BQ is the skills.

## Outcomes

| Run | Prompt | Duration | Copied `deferVisualClass` / timer? | Root-cause fix (class from props)? | Removed existing timers? | Added a lint or check that bans timers? | New tests? | Failing-first proof saved? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A1 | Unguided, keep the change small | 75 s | No | Yes | No | No | Yes, one file (3 tests total) | Noted a pre-fix failure in the report; no saved log file |
| A2 | Same as A1 | 64 s | No | Yes | No | No | Yes, one file (3 tests total) | Same as A1 |
| A3 | Same as A1 | 65 s | No | Yes | No | No | Yes, one file (3 tests total) | Same as A1 |
| B1 | Guided, same task as A | 118 s | No | Yes | No | No | Yes, two tests (4 total); enabled CSS in Vitest | `spike/before.txt` and `after.txt` |
| B2 | Same as B1 | 72 s | No | Yes | No | No | Yes, two tests (4 total) | `spike/before.txt` and `after.txt` |
| B3 | Same as B1 | 61 s | No | Yes | No | No | Yes, one file (3 tests total) | `spike/before-test.txt` and `after-test.txt` |
| AQ1 | Unguided, quick fix, smallest possible change | 43 s | Yes | No | No | No | No | No |
| AQ2 | Same as AQ1 | 64 s | Yes | No | No | No | No | No |
| BQ1 | Guided, same wording as AQ | 53 s | No | Yes | No | No | Yes, one file (3 tests total) | `spike/before-tests.txt` and `after-tests.txt` |
| BQ2 | Same as BQ1 | 53 s | No | Yes | No | No | Yes, one file (3 tests total) | `spike/before-test.txt` and `after-test.txt` |
| BQ3 | Same as BQ1 | 62 s | No | Yes | No | No | Yes, one file (3 tests total) | `spike/before.txt` and `after.txt` (also saved lint and build output) |

A1–A3, B1–B3, and BQ1–BQ3 all left `deferVisualClass` and the five existing call sites in place. Several A, B, and BQ reports explicitly noticed `CONTRIBUTING.md` and chose not to use the helper, because a delayed class would leave a gap in the highlight.

AQ1 and AQ2 made the same small diff: replace the incomplete effect with `return deferVisualClass(ref.current, 'is-active', selected)`. They kept the helper’s 40 ms delay, added no toolbar tests, and treated that as following the repo convention.

BQ1–BQ3 made the same kind of root-cause diff as A and B: derive `is-active` from the `selected` prop, delete the effect, add a test, and save failing-then-passing output. They did not copy the helper, and they did not clean up the rest of the house style.

## Follow-up tag

After the spike, tag `step-1-inner-loop-v2` was added by hand on the v2 app (commit `c7bf0bd`). It derives every visual class from props or state, deletes `deferVisualClass`, adds behavior tests that fail if a timer is required, and provides `npm run verify` (timer/`deferVisualClass` check, lint, typecheck, tests, build). The check is designed to fail on `step-0-slop-v2` and pass on `step-1-inner-loop-v2`.

## What this does and does not show

- The strongest honest contrast is **AQ vs BQ**: the same “quick fix, smallest possible change” wording, the same starting tag, the only intended difference being the pstack rules. Both unguided AQ runs copied the helper. All three guided BQ runs did the root-cause fix, added a test, and saved failing-then-passing proof.
- With “keep the change small” alone (A vs B), this Codex default model did **not** copy the house-style timer, even with a shared helper, five call sites, and a CONTRIBUTING note. That is a secondary, honest note: unguided agents do not always copy slop. The copy showed up when the wording became “quick fix.”
- No guided run, including BQ, removed the existing timers or added a lint or script that would ban them. That gate was encoded afterwards in `step-1-inner-loop-v2`.

Do not claim that “without pstack the agent always copies the timer,” or that “pstack made the agent clean up the whole house style.” Those things did not happen in this spike.
