# List / Preview highlight fix

## Change and cause

`ViewButton` removed `is-active` in an effect whenever selection changed and never restored it. Its `aria-pressed` state was correct, but its visual class did not reflect that state.

Removed the effect and ref, and derive `className` directly from the existing `selected` prop. No surrounding components, CSS, or shared helper were changed. No justification comments were added.

## Decisions shaped by the rules

- **poteto-mode / setup-pstack:** used the existing Vitest, TypeScript, lint, and build commands; added one focused regression check with the existing testing dependencies.
- **principle-fix-root-causes:** corrected where the button renders its selected state instead of adding a delayed repair. Although CONTRIBUTING.md recommends `deferVisualClass`, adding its deliberate delay would conflict with the requested persistent highlight and root-cause fix.
- **principle-encode-lessons-in-structure:** the rendered-app test requires exactly one selected highlight on initial render and through repeated List / Preview switches, immediately and after pending timers run.
- **principle-prove-it-works:** tested the real App and its rendered buttons in jsdom. Saved the failing run in `spike/before-tests.txt` and passing run in `spike/after-tests.txt`.
- **no-comments:** removed the obsolete effect comment along with the effect; added no workaround comments.

## Verification

- `npm test`: before, 1 failed / 2 passed; after, 3 passed.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- `git diff --check`: passed.

## Before / after

Before: the selected button's active class was absent even on initial render; the regression test failed on that assertion.

After: the class follows selection in the same React render, and remains correct after repeated switches and timer execution. Verification covers rendered DOM state; no interactive browser visual inspection was performed.
