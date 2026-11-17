# List / Preview highlight fix

## Change and reason

`src/ViewToggle.tsx` now derives `is-active` directly from the `selected` prop, alongside `aria-pressed`. Removed the ref and effect that unconditionally removed the highlight whenever selection changed. React now updates visual and accessible selection together in the same render.

The change is limited to the view toggle. Although CONTRIBUTING.md recommends the shared delayed visual-class helper, delaying this selection would leave a gap in the highlight. Rendering the class from state avoids that gap without changing the shared helper or other controls.

## Checks

- Added `src/ViewToggle.test.tsx`, exercising the real app under StrictMode: initial selection, repeated switches, clicking the already selected button, exclusive highlighting, pressed state, and matching panel text.
- Before the fix, the regression test failed because the initial List button lacked `is-active`; the two existing tests passed.
- After the fix, `npm test`: 2 files, 3 tests passed.
- `npm run build`: passed, including TypeScript compilation.
- `npm run lint`: passed.
- No browser visual inspection was performed; selection behavior was checked in jsdom.

## Before / after

Before: selection state and panel text updated, but the effect removed the highlight and never restored it.

After: exactly the selected view has the highlight immediately, including across repeated switches.

No commits, pushes, remote changes, or credentials were needed.
