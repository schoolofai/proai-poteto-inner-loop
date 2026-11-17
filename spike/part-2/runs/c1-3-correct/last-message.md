Added lint enforcement for the repeated DOM-class mutation pattern. Its error directs contributors to derive `className` from props/state during render.

Proved it rejects both historical mistakes: `deferVisualClass` and `ViewToggle`. Removing the helper alone allowed reintroduction; types cannot enforce render timing.

Updated `AGENTS.md`. All project checks pass. Changes remain uncommitted because `.git` is read-only.