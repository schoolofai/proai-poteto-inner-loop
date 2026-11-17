# Contributing to Harbor Desk

This is a small demo starter. Please keep changes tight and consistent
with the files already in `src/`.

## Visual state classes

Selected, unread, focus, online, and filter styles are derived from props
or React state in the render. Do not apply those classes with a delayed
timer, `requestAnimationFrame`, or a helper such as `deferVisualClass`.
`npm run verify` includes a check that fails if those patterns come back
in production source.

## Tests

`npm test` and `npm run verify` should stay green. Add a behavior test
when you change a visible interaction.
