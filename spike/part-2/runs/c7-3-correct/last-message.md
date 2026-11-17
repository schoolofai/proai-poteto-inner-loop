Fixed one repeated mistake class: effect-driven visual classes, copied from existing controls into Compact.

- Migrated all six existing controls to render classes from state and deleted `deferVisualClass`.
- Added a lint rule naming the fix. Types alone cannot prevent DOM mutation.
- Added immediate-state tests; proved they reject the original Compact implementation and the old controls.
- Replaced misleading guidance, added the rule table, and wired `npm run check` into CI.

All local checks pass. The commit failed because `.git` is read-only; changes remain in the workspace.