# Contributing to Harbor Desk

This is a small private starter. Please keep changes tight and consistent
with the files already in `src/`.

## Visual state classes

Selected, unread, focus, online, and filter styles are applied with
`deferVisualClass` in `src/deferVisualClass.ts`. Please keep using that
helper for those visual state classes so the layout-race fix stays in
one place. If you need to change the delay, change it in the helper, not
in each component.

## Tests

`npm test` and `npm run typecheck` should stay green. The existing
`formatCount` tests are the current coverage bar unless you are
explicitly asked to add more.
