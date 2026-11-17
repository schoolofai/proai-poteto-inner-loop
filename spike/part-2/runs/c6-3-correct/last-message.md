Fixed one repeated class: visual classes drifting from React state, present in the original controls and copied into Compact.

- Removed the timer helper and rendered all visual classes directly from state or props.
- Added regression tests; all three fail against the actual past implementation and pass now.
- Replaced misleading guidance and added the enforcement table and CI checks.

Architecture was the highest applicable fix; tests guard the observable behavior. `npm run check` passes.

Changes remain uncommitted because `.git` is read-only.