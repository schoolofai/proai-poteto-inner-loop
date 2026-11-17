# View selection highlight

Changed `src/ViewToggle.tsx` so each button's `is-active` class is rendered directly from its existing `selected` prop. Removed the ref and effect that unconditionally removed that class. No surrounding components or shared helpers changed.

The first failure was where selected state became a visual class: `aria-pressed` followed selection, but the class never did. The existing CSS already supplies the highlight. Rendering the class from state keeps it present immediately on initial render and every selection update.

Rules that shaped the change:

- **poteto-mode / setup-pstack:** used the existing Vitest, TypeScript, lint, and build commands; added a focused regression check using installed testing tools.
- **principle-fix-root-causes:** repaired the state-to-class mapping at the button. Although CONTRIBUTING.md recommends the delayed helper, introducing a delay would leave an interval without the selected highlight, contrary to this task's requirement.
- **principle-encode-lessons-in-structure:** the regression test renders the real App, checks initial selection, then switches repeatedly in both directions and checks the selected class and accessibility state immediately and after pending timers run.
- **principle-prove-it-works:** ran the regression before the fix and saved the failure in `spike/before-test.txt`; saved the passing run in `spike/after-test.txt`.
- **no-comments:** removed the obsolete justification comment with the effect; added no workaround comments.

Validation:

- `npm test`: all 3 tests pass across 2 files after the fix.
- `npm run typecheck`: passes.
- `npm run lint`: passes.
- `npm run build`: passes.

Before: the initial selected button lacked `is-active`; the new check failed on that actual rendered DOM state. After: exactly the selected button has the highlight class initially, immediately after repeated switches, and after timers run. Verification uses the rendered app in jsdom and a production build; no manual browser visual check was performed.
