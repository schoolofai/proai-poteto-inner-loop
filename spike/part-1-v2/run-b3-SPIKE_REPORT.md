# Toolbar selection fix

Changed `src/ViewToggle.tsx` so `is-active` derives from the same `selected` prop as `aria-pressed`. Removed the ref, effect, and workaround comment. The effect previously removed the highlight after rendering and never restored it. No CSS or other controls changed.

The root-cause rule shaped the fix: selection already worked in App state, so the correction belongs where ViewButton renders its class. Adding a delayed class mutation would introduce a gap between selection and highlighting. This intentionally departs from CONTRIBUTING.md's deferred-class guidance for this control to satisfy the requested immediate, persistent selection behavior.

The inner-loop and encode-lessons rules shaped verification: added `src/ViewToggle.test.tsx` using the existing Vitest and Testing Library setup. It renders the real App under StrictMode and checks initial selection, repeated List/Preview switches, consistency with aria-pressed and panel content, persistence after timers, and an unrelated search update. No new dependencies or justification comments were added.

Checks run:

- `npm test` before the fix: regression failed because the selected List button lacked `is-active`; existing tests passed. Saved output in `spike/before-test.txt`.
- `npm test` after the fix: all 3 tests passed. Saved output in `spike/after-test.txt`.
- `npm run build`: TypeScript and production Vite build passed.
- `npm run lint`: passed.
- `git diff --check`: passed.

Before: selected state and panel content could update without a selected highlight. After: the selected class is present in the same render as the selected state and remains through updates and pending timers. Verification exercised actual app components in jsdom and built the production artifact; no browser visual inspection was performed.
