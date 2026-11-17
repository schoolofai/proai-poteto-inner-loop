Re-audited the repeated visual-state synchronization mistake.

- **Evidence:** starter controls and the original Compact implementation used effect-driven classes.
- **Enforcement:** direct JSX classes, deleted helper, lint restrictions, and immediate-render tests. Types alone cannot prevent DOM mutations.
- **Proof:** current checks reject the historical Compact, view-toggle, and helper implementations.

`npm run check` passes. No new mistake class found; no additional changes needed.