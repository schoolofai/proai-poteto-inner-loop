# Stable List/Preview highlight

Goal: keep the selected List/Preview toolbar highlight in place with the smallest change.

## Change and reason

In `src/ViewToggle.tsx`, derive `is-active` directly from the existing `selected` boolean, which also drives `aria-pressed`. Remove the ref, effect, and unused React import. The effect previously removed the highlight on every selection change and never added it. No surrounding components or shared helpers changed.

`CONTRIBUTING.md` recommends `deferVisualClass`, but that helper removes the class immediately and waits 40 ms before restoring it. This local exception meets the requested stable highlight without a delayed blank state or a wider helper change.

## Checks

- Temporary Testing Library/Vitest check rendered the real App in jsdom. It checked initial selection, Preview/List/Preview clicks, the selected and unselected classes and pressed states immediately and after an 80 ms wait, and persistence after a search update. It also checked the preview panel text.
- Original source failed the highlight assertion: `AssertionError: expected false to be true // Object.is equality`.
- Fixed source passed the same check: `Test Files  1 passed (1)` and `Tests  1 passed (1)`.
- The temporary check was removed to keep the requested patch small and preserve the existing test coverage scope.
- `npm test` passed the existing two tests.
- `npm run build` passed TypeScript checking and production bundling.
- `npm run lint` and `git diff --check` passed.
- No browser paint verification was performed. The requested control-ui skill was unavailable; verification used the rendered App DOM.

## Before and after

Before, a selected view could have `aria-pressed="true"` with no `is-active` class. After, the highlight class and pressed state derive from the same selection in the same render and persist across switches and unrelated rerenders.

## Principles used

- Fix Root Causes removed the effect that erased selection styling.
- Laziness Protocol kept the application change within one component and removed unused machinery.
- Prove It Works prompted a failing-before/passing-after check of the rendered App.
- Test Behavior, Not Implementation focused that check on visible selection state and panel text.

No commits, pushes, remotes, secrets, or dependency changes were made. Pre-existing staged `.agents` files were left untouched.
