# Sidebar flicker fix

`SidebarItem` and `StatusBadge` rendered without their state classes, then
imperatively removed those classes in an effect and restored them after 40 ms.
The selected folder, panel, and `aria-current` updated before the highlight.
Unread text similarly rendered before its badge styling. The delay caused the
visible gap; there was no layout measurement that required waiting.

Both components now derive their classes directly from their existing props.
React commits the highlight together with selection and the badge styling
together with its count. Removed the effects, refs, timers, and workaround
comments. Existing CSS, count formatting, and selection state remain intact.

## Rules that changed decisions

- **Fix the root cause (principle-fix-root-causes):** removed the delayed DOM
  mutations at their source in both components, instead of adjusting timer
  duration or adding layout effects.
- **Encode lessons in structure (principle-encode-lessons-in-structure):** added
  `src/sidebar-behavior.test.tsx`. Fake timers stay frozen, so delayed visual
  updates fail. Tests cover initial selection and badges, repeated and rapid
  folder clicks, exactly one active folder, panel/accessible selection agreement,
  and zero/positive/capped unread-count transitions under Strict Mode.
- **Invest in the inner loop first (setup-pstack):** used the existing dependency
  and test setup, corrected the components, and passed lint, types, and tests
  before production build verification. Added `npm run verify` to run those
  existing checks in order; no new dependencies or external tooling were needed.
- **Prove it works (principle-prove-it-works):** ran the rendered application in
  jsdom, clicked its actual folder buttons, and checked the resulting DOM
  immediately. All three new tests failed against the original implementation
  with missing state classes (`verification-before.txt`) and pass after the fix.
  `verification-after.txt` records all five tests passing, lint and typecheck
  passing, and a successful production build. This is DOM behavior verification,
  not a claim of browser screenshots or frame-by-frame paint measurement.
- **Record decision effects (rule 5 / this local poteto-mode experiment):** this
  report names the rules and connects each to a concrete implementation or
  verification choice, rather than leaving the lesson only as advice.

## Reproduce

Run `npm run verify` from the repository root. To refresh the saved output, run
`npm run verify > verification-after.txt 2>&1`.

For a manual browser check, run `npm run dev`, open its local URL, and click
Sent, Drafts, and Inbox repeatedly. The selected background should move with
the panel heading immediately. Inbox and Drafts badges should be styled on
initial display; Sent has no unread badge text. Badge count transitions are
exercised by the component regression test because this app exposes no count
editing control.
