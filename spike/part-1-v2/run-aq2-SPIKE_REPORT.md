# List / Preview highlight fix

Changed `src/ViewToggle.tsx` so the button effect calls
`deferVisualClass(ref.current, 'is-active', selected)` and returns its cleanup.
The previous effect only removed the highlight, even for the selected button.
The shared helper applies the selected state and cancels pending timers when
selection changes or the button unmounts. This follows `CONTRIBUTING.md` and
leaves surrounding components and the shared helper unchanged.

Before: switching views removed the active highlight without restoring it.
After: the selected button receives the highlight after the existing shared
40 ms delay; pending updates are cancelled during rapid switching.

Checks run:
- `npm test` — passed (2 existing tests).
- `npm run typecheck` — passed.
- `npm run lint` — passed.

The existing tests cover count formatting, not toolbar behavior. No browser
visual check was run.
