# Part 1 v3-installed spike results

Recorded 17 Nov 2026, Europe/London (UTC+0). OpenAI Codex CLI 0.160.1, `codex exec --json`, sandbox `workspace-write`, no `--model` flag (CLI default OpenAI model). Isolated git worktrees from tag `step-0-slop-v2`, then `git checkout main -- .agents` so the pinned official pstack 0.15.43 skills were present. No remotes, no pushes from the worktrees. Logs were scanned for secret-like strings; none were found.

These are the **installed-skill** reruns (BS1–BS3). They replace the earlier guided BQ method, which pasted a short pstack rule summary into the prompt (`spike/part-1-v2/PROMPT_RUN_BQ.txt`). The prompt here is exactly the unguided AQ quick-fix wording from `spike/part-1-v2/PROMPT_RUN_A_QUICKFIX.txt`, prefixed only with `$poteto-mode `. No rules were pasted.

A throwaway `CODEX_HOME` was used, with only `auth.json` and `config.toml` copied into it. `~/.codex` and `~/.claude` were not edited. `OPENAI_API_KEY` and `ANTHROPIC_API_KEY` were unset in the Codex processes.

## The trap

Same trap as the v2 spike. `step-0-slop-v2` ships `deferVisualClass`, a 40 ms delayed class helper used by five components. `CONTRIBUTING.md` tells new work to keep using it. The new bug is in `ViewToggle`: switching List / Preview runs an effect that only removes `is-active` and never puts it back. The local “house style” fix is to hook the button up to `deferVisualClass`. The root-cause fix is to derive `is-active` from the `selected` prop and delete the effect.

## Prompt

See `PROMPT_RUN_BS.txt`. The only intended difference from AQ is that the official skills are installed in the worktree and the task starts with `$poteto-mode`.

## Outcomes

| Run | Prompt | Duration | Copied `deferVisualClass` / timer? | Root-cause fix (class from props)? | Removed existing timers? | Added a lint or check that bans timers? | New tests left in the tree? | Failing-first proof saved? | Followed `CONTRIBUTING.md`? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BS1 | `$poteto-mode` + AQ quick-fix wording; skills installed | 72 s | No | Yes | No | No | Yes, `src/ViewToggle.test.tsx` (1 new test; 3 tests total after) | Quoted failing-then-passing output in the report; no standalone log file | Did not use the helper. The report does not cite `CONTRIBUTING.md` by name. |
| BS2 | Same as BS1 | 87 s | Yes | No | No | No | No. A temporary App test was run, then deleted “to keep the requested patch small.” | Quoted in the report; no standalone log file | Yes. The report says reusing the helper follows `CONTRIBUTING.md` and the `PriorityFilter` pattern. |
| BS3 | Same as BS1 | 93 s | No | Yes | No | No | No. A temporary App test was run, then deleted “to keep the requested patch small.” | Quoted in the report; no standalone log file | No. The report cites `CONTRIBUTING.md` and declines the helper because of the 40 ms blank delay. |

Principles named in all three reports: Laziness Protocol, Fix Root Causes, Prove It Works, and Test Behavior, Not Implementation.

BS1 and BS3 made the same kind of root-cause diff as the old BQ runs: derive `is-active` from `selected`, delete the effect, leave `deferVisualClass` and the five existing call sites in place. BS1 also left a regression test in the tree. BS2 made the same kind of helper-copying diff as the unguided AQ runs: `return deferVisualClass(ref.current, 'is-active', selected)`.

None of the three runs removed the existing timers or added a lint or script that would ban them.

## Skill loading

Each JSONL trace shows Codex actually reading `.agents/skills/poteto-mode/SKILL.md` (and the bug-fix playbook plus several principle files) via `cat`, with exit 0, and returning the `name: poteto-mode` frontmatter. Opening lines:

- BS1, first message: “I’ll use poteto-mode to fix the List/Preview highlight…”
- BS2 and BS3 also read `SKILL.md` on the same early `cat` command before editing `ViewToggle.tsx`.

The `$poteto-mode` prefix was in the prompt. No pstack rules were pasted into it.

## Verdict against the old BQ results

In `spike/part-1-v2/`, BQ1–BQ3 all did the root-cause fix, added a `ViewToggle` test and left it in the tree, saved failing-then-passing output as standalone files, named principles, chose not to follow `CONTRIBUTING.md`, and none removed timers or added a ban.

This installed-skill rerun did **not** reproduce that clean 3/3 split:

- 2 of 3 runs (BS1, BS3) did the root-cause fix. 1 of 3 (BS2) copied the house-style helper, which is what both unguided AQ runs did.
- Only BS1 left a new test file in the tree. BS2 and BS3 ran a failing-then-passing check, then deleted the test.
- None of the three left standalone before/after log files; the proof lives in the reports and the JSONL traces.
- Following `CONTRIBUTING.md` was mixed: BS2 followed it, BS3 explicitly declined it, BS1 did not use the helper and did not cite the file.

Do not claim that “with the skills installed, the agent always does the root-cause fix,” or that these runs match BQ1–BQ3 exactly. They do not. Installed skills plus `$poteto-mode` were enough for two root-cause fixes and for every run to read `poteto-mode/SKILL.md`, but they were not enough to keep the helper out of every run or to leave a test and a saved proof file every time.

The unguided AQ contrast still stands in `spike/part-1-v2/`. The earlier pasted-rules BQ control also still stands there, and should be described as a different method.

## Artifacts

Prompt, diffs, reports, event summaries, raw `codex exec --json` traces, last messages, and (for BS1) the saved test file are in this folder. Worktree paths in last messages and traces are under `/tmp/poteto-bs{1,2,3}`.
