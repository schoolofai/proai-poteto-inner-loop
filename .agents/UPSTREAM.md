# Upstream pin for the vendored pstack skills

The skill folders in `.agents/skills/` are an **unmodified copy** of selected
skills from official pstack. They were not rewritten for Codex. No
`agents/openai.yaml` files were added.

| Field | Value |
| --- | --- |
| Source | https://github.com/cursor/plugins/tree/main/pstack |
| Licence | MIT, Copyright 2026 Lauren Tan (see `.agents/LICENSE`) |
| Version | 0.15.43 (`pstack/plugin.json`) |
| Snapshot commit | `e1cc03121a0e71129a4fb730d7c5528a0a3e43c8` |
| Version bump commit | `2f87c854fe3e2fcda44ca86b46ede35aad3c46b7` (`feat(pstack): shorter skill texts, worker.md, and Opus-first routing capped at xhigh`, #1249) |

The snapshot commit is a later merge on the same repository (`Merge pull request #1258 from cursor/add-redo-plugin`). The pstack tree is unchanged between the 0.15.43 version bump and that snapshot.

## What was copied

Whole official skill folders, including playbooks and other files that ship inside them:

- `poteto-mode`
- `poteto-help`
- `setup-pstack` (official Cursor / Claude Code setup; not required to start Codex in this repo)
- `no-comments` (used in the Part 1 experiment prompt)
- `correct` (used in the Part 2 experiment)
- every official `principle-*` skill, because `poteto-mode` tells the agent to read each principle leaf it applies

This is not the full pstack plugin. Skills such as `arena`, `swarm`, and `interrogate` are not vendored here.

## Codex note

Official pstack documents Cursor and Claude Code only. There is no official
documentation for running these skills in OpenAI's Codex CLI. The copy in
`.agents/skills/` is how this repo makes `codex` pick them up at the repo
root (Codex scans `.agents/skills`). Invocation is `$poteto-mode` or the
`/skills` picker. See the README for the start-from-scratch steps we tested
on Codex CLI 0.160.1.
