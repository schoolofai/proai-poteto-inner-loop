Fixed one repeated mistake class: imperative visual classes, present in six components and copied into Compact in `0f73d8c`.

- Classes now derive from state during render; deleted the helper and misleading guidance.
- Added seven regression tests, each proven to fail on the old code.
- Added the enforcement table and shared local/CI check command.

Architecture removes the bad API; behavior tests guard against reintroducing equivalent code. `npm run check` passes all nine tests, typecheck, lint, and build.

Commit blocked: `.git` is read-only. Changes remain in the workspace.