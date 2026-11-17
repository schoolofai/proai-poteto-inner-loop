# List / Preview highlight fix

## What changed and why

`src/ViewToggle.tsx` now derives `is-active` from the same `selected` prop
used by `aria-pressed`. Removed the ref and effect that only removed the
highlight and never added it back. This keeps both states in one React
render, without a delayed paint or timer race.

The toolbar deliberately uses declarative styling instead of the delayed
helper recommended in CONTRIBUTING.md: delaying this selection would leave
a gap in the highlight when switching. Other controls and the shared helper
are unchanged.

Added one focused regression test covering the initial selection, repeated
switches in both directions, mutually exclusive highlights, matching pressed
states, and persistence after pending timers settle.

## Checks

- Before the fix, the regression test failed because List had no highlight.
- `npm test`: passed, 2 files / 3 tests.
- `npm run build`: passed (TypeScript check and Vite production build).
- `npm run lint`: passed.
- No interactive browser check was performed; the interaction check uses jsdom.

## Before / after

Before: the view and pressed state changed, but the selected visual class
was removed and never restored.

After: exactly the selected toolbar button has the highlight immediately,
including after repeated List / Preview switches and timer completion.
