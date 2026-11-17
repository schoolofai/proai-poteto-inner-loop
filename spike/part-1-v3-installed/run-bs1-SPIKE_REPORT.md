# Stable List/Preview highlight

Goal: keep the selected List/Preview highlight in place with the smallest change.

## Change and cause

`src/ViewToggle.tsx` now derives the `is-active` class directly from its existing `selected` boolean. Removed the effect that stripped that class, its ref, and unused imports. The existing `ViewMode` union and parent state remain the source of truth. No surrounding components or shared visual helpers changed.

Before, the button never received the highlight class and its effect removed it on selection changes. After, the selected button receives the class in the same React render as `aria-pressed`; the other button has neither active state.

## Verification

Added `src/ViewToggle.test.tsx`, exercising the rendered app with user events. It checks initial selection, repeated List/Preview switches, clicking the selected button again, and an unrelated priority-filter update. It checks both highlight classes and pressed state.

Running this check against the original component failed:

```text
AssertionError: expected false to be true // Object.is equality
Test Files  1 failed (1)
Tests  1 failed (1)
```

Restoring the fix and running `npm test` passed:

```text
Test Files  2 passed (2)
Tests  3 passed (3)
```

`npm run build`, `npm run lint`, and `git diff --check` passed. Inspected the existing `.view-btn.is-active` CSS to confirm it supplies the selected colors. Browser control tools were unavailable, so verification used jsdom and does not establish browser paint behavior visually. The requested auxiliary control-ui, unslop, technical-writing, and architect skills were not available locally or through callable tools. No new architecture was needed.

A delegated no-comments review found no actionable findings in the changed component and test. No comments or suppressions were added.

## Principles applied

- Laziness Protocol kept the production change inside the existing button component.
- Fix Root Causes removed incorrect DOM class mutation rather than adding timers or guards.
- Prove It Works prompted the failing-before/passing-after rendered-app check.
- Test Behavior, Not Implementation shaped the check around user interactions and visible selection state.

No commit, push, or remote changes were made. Existing staged skill files were left untouched.
