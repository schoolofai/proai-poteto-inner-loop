# View toggle highlight fix

## What changed and why

Updated only the selection effect in `src/ViewToggle.tsx` to call the existing
`deferVisualClass` helper and return its cleanup function. The old effect removed
`is-active` on each selection change without ever restoring it. The helper applies
the class to the selected button and cancels pending updates when selection changes
or the button unmounts, following the repository's visual-state convention.
No surrounding components or shared helper behavior changed.

## Checks

- `npm test`: passed (2 existing tests).
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `git diff --check`: passed.
- Reviewed the selection effect against the existing PriorityFilter implementation.

The existing tests cover count formatting, not toolbar interactions. No browser
visual check was run. The helper's existing 40 ms highlight delay remains.

## Before / after

Before: switching List/Preview removed the highlight with no code to restore it.
After: the selected button receives the highlight after the shared helper's delay;
the previous selection is cleared and stale scheduled updates are cancelled.
