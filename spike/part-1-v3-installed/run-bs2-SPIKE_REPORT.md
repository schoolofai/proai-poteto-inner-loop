# List/Preview highlight fix

Keep the selected List/Preview toolbar highlight in place with the smallest change.

## Change and reason

Changed only `src/ViewToggle.tsx` in application code. Replaced the effect that only removed `is-active` with `deferVisualClass(ref.current, 'is-active', selected)`, including its cleanup. Added the helper import and removed the obsolete comment.

The existing `ViewMode` union and `selected` boolean already represent selection correctly. The effect never restored the selected visual class. Reusing the existing helper follows `CONTRIBUTING.md` and the neighboring `PriorityFilter` pattern. No surrounding components or helper behavior changed.

## Checks

- A temporary Vitest/Testing Library check rendered the real `App` under React Strict Mode. It checked initial List selection, repeated List/Preview clicks, rapid switches, exclusive highlight, `aria-pressed`, and preview content after timers settled.
- Original code failed that check with `AssertionError: expected false to be true` on the initial List highlight.
- Fixed code passed the same check with `Test Files  1 passed (1)` and `Tests  1 passed (1)`.
- Removed the temporary test to keep the requested patch small and preserve the repository's existing coverage scope.
- `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`, and `git diff --check` passed.
- Browser paint timing was not verified. No browser control tool was available. The existing helper still applies the highlight after its shared 40 ms delay.

## Before and after

Before, the view and pressed state changed, but the effect removed the selected highlight and never restored it. After, the selected button receives the highlight through the shared helper and retains it after settling, including after rapid switches.

## Principles applied

- Fix Root Causes located the remove-only effect rather than changing correct selection state.
- Laziness Protocol kept the application change to one import and one effect body.
- Prove It Works required running the real component interaction before and after the fix.
- Test Behavior, Not Implementation shaped checks around visible selection, pressed state, and panel content.

No commits, pushes, remotes, secrets, or credentials were created. Pre-existing staged `.agents` files were left untouched.
