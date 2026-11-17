# View selection highlight fix

Changed `src/ViewToggle.tsx` to derive `is-active` directly from the existing
`selected` prop. Removed the ref, effect, and justification comment that cleared
the class on every selection change. No surrounding components changed.

The first failure was in rendering visual state: `aria-pressed` tracked selection,
but the class was never rendered and the effect only removed it. React now owns
both attributes in the same render, with no delayed highlight update.

Rules that shaped the change:

- **poteto-mode / setup-pstack:** used the existing Vitest, build, and lint checks.
- **principle-fix-root-causes:** fixed the class at its source rather than adding
  a timer or copying the deferred visual helper recommended in CONTRIBUTING.md.
  Deferring selection would introduce an unnecessary gap in the highlight.
- **principle-encode-lessons-in-structure:** added `src/ViewToggle.test.tsx`,
  exercising the real App under Strict Mode. It verifies initial selection,
  repeated switches, timer completion, and unrelated search renders, including
  agreement between the class and `aria-pressed`.
- **principle-prove-it-works:** saved the failing pre-fix test output in
  `spike/before.txt` and passing output in `spike/after.txt`.
- **no-comments:** removed the obsolete justification comment; added no code comments.

Checks:

- `npm test`: 3 tests passed across 2 files (before: new regression test failed).
- `npm run build`: TypeScript and production Vite build passed; `spike/build.txt`.
- `npm run lint`: passed; `spike/lint.txt`.
- `git diff --check`: passed.

Before: the selected button lacked `is-active`, including on initial render.
After: exactly the selected button has the highlight immediately and retains it
through switches and later renders. Verification uses rendered DOM in jsdom;
no browser screenshot or manual paint inspection was performed.
