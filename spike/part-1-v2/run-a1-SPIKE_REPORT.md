# View toggle highlight fix

## What changed and why

In `src/ViewToggle.tsx`, derive `is-active` directly from the existing
`selected` prop. Remove the ref and effect that unconditionally removed
that class whenever selection changed. The visual highlight now updates
in the same React render as `aria-pressed`, with no delayed highlight gap.

This is a local exception to CONTRIBUTING.md's deferred visual-class
convention: deferring selection would introduce a period with no highlight,
contrary to the requested stable selection. The shared helper and other
controls are unchanged.

Add one regression test covering initial selection, repeated switches in
both directions, matching panel content and pressed states, and selection
persistence after a search update.

## Checks

- Confirmed the regression test failed before the fix because the initially
  selected List button lacked `is-active`.
- During test development, corrected an invalid `exact` role-query option
  and used the search input's actual `searchbox` role.
- Final `npm test`: 2 files, 3 tests passed.
- Final `npm run build`: TypeScript checks and Vite production build passed.
- Final `npm run lint`: passed.
- `git diff --check`: passed.
- No manual browser visual check was performed; interaction coverage uses jsdom.

## Before / after

Before: the selected state and panel content changed, but the effect removed
the selected highlight and never restored it.

After: exactly the selected view has the highlight immediately on initial
render and after each switch, and it stays selected across other app updates.

No commit, push, remote changes, credentials, or new dependencies.
