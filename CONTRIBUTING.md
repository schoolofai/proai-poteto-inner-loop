# Contributing to Harbor Desk

This is a small private starter. Please keep changes tight and consistent
with the files already in `src/`.

## Visual state classes

Derive visual state classes from props or state in JSX `className` so
styling and accessibility attributes agree on every render.

## Checks

Run `npm run check` locally; CI runs the same command. It runs lint,
tests, and the production build (including TypeScript checking).
