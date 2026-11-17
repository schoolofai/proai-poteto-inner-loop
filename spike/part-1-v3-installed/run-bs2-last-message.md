Fixed [ViewToggle.tsx](/tmp/poteto-bs2/src/ViewToggle.tsx) to restore the selected highlight using the existing helper. No surrounding refactor.

The interaction check failed before and passed after. Tests, typecheck, lint, and build passed. Browser flicker remains unverified; the helper retains its existing delay.

Laziness Protocol kept the diff small. Fix Root Causes targeted the remove-only effect. Prove It Works drove before/after checks.

Wrote [SPIKE_REPORT.md](/tmp/poteto-bs2/spike/SPIKE_REPORT.md). No commits or pushes.