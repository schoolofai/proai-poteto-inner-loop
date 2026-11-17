# List / Preview highlight fix

The toolbar's React view state and aria-pressed values were correct, but ViewButton never rendered an active class. Its effect unconditionally removed is-active on every selection change. ViewButton now derives its className directly from selected, updating the visual and accessible state in the same render. Removed the effect, ref, and workaround comment. No other controls were changed.

The root-cause rule shaped the decision to remove imperative visual-state mutation rather than add a delayed class update. CONTRIBUTING.md recommends deferVisualClass, but that delay would create an interval where selection and appearance disagree; the user's root-cause and small-change requirements take precedence here.

The inner-loop and encode-lessons rules shaped the regression coverage: two tests mount the real App in StrictMode with its real stylesheet. They check initial selection, repeated List/Preview switches, matching panel content, an unrelated search render, and stability after pending timers. Vitest CSS processing is enabled so computed-background assertions exercise the shipped styles. No dependencies or justification comments were added.

Verification:

- Baseline npm test: 2 existing tests passed; npm run lint passed.
- Before fix: both new tests failed because the selected button remained white instead of blue; the 2 existing tests passed. Output: [before.txt](before.txt).
- After fix: npm test passed all 4 tests; npm run lint, npm run typecheck, npm run build, and git diff --check passed. Output: [after.txt](after.txt).
- Test setup initially needed correction for Vitest's disabled CSS processing, the searchbox role, and application TypeScript types; final saved evidence uses the final test setup against both original and fixed ViewButton.

Before: List and Preview had correct logical selection but no persistent highlight. After: exactly the selected view is blue immediately and remains selected through rerenders and timer completion. Verification uses jsdom DOM/computed styles and a production build; no interactive browser paint inspection was performed.

No commits, pushes, remotes, or credentials were created.
