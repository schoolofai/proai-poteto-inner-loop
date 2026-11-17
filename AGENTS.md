# Repository rules

| Rule | Enforcement |
| --- | --- |
| Derive visual classes from React props/state in JSX `className`; do not mutate DOM classes. | Oxlint `no-restricted-properties` rejects `classList` access with the required fix; `src/visualState.test.tsx` checks immediate initial and updated styling. |

Run `npm run check` before finishing; CI runs the same command.
