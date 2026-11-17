# List / Preview selection fix

## Change and cause

`src/ViewToggle.tsx` now derives `is-active` directly from the existing
`selected` prop. Removed the ref and effect that only removed that class.
Selection state and `aria-pressed` were already correct, but the rendered
button never received the CSS class responsible for its highlight.
The class now updates in the same React render as the selection.

The production change is limited to ViewToggle. No dependencies were added.

## Rules that shaped the change

- **poteto-mode / setup-pstack:** ran the existing test suite and lint first;
  both passed but did not cover the toolbar bug. Used the existing Vitest,
  jsdom, and Testing Library setup for durable regression coverage.
- **principle-fix-root-causes:** fixed class ownership at the component that
  renders it, rather than adding a delayed DOM mutation via
  `deferVisualClass`. CONTRIBUTING.md recommends that helper, but its delayed
  styling would conflict with the requested immediate, stable selection.
- **principle-encode-lessons-in-structure:** added tests against the real App
  in StrictMode covering initial selection and repeated List/Preview clicks,
  including highlight, pressed state, panel content, and persistence after
  pending timers run.
- **principle-prove-it-works:** ran those tests before the fix and saved the
  failures in `spike/before.txt`; saved the passing full suite in
  `spike/after.txt`. Tests mount the actual React app in jsdom; no components
  are mocked. No visual browser inspection was performed.
- **no-comments:** removed the obsolete effect and its justification comment;
  added no production comments.

## Checks

- Baseline `npm test`: 2 tests passed.
- Baseline `npm run lint`: passed.
- Before fix `npm test`: 2 regression tests failed because `is-active` was
  absent; 2 existing tests passed.
- After fix `npm test`: all 4 tests passed.
- After fix `npm run lint`: passed.
- After fix `npm run build`: TypeScript checking and Vite production build
  passed.

## Before / after

Before: the selected view changed and the panel content updated, but the
selected button had no highlight class.

After: List is highlighted on first render; switching in either direction
immediately moves the highlight to the selected button and keeps it there.
