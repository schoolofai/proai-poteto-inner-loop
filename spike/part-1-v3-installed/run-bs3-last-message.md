Fixed the highlight in [ViewToggle.tsx](/tmp/poteto-bs3/src/ViewToggle.tsx). It now follows selection directly. No surrounding refactor.

Laziness Protocol kept the fix local; Fix Root Causes removed the effect that erased highlighting. Prove It Works and Test Behavior, Not Implementation guided the failing-before/passing-after DOM check.

Tests, build, lint, and diff checks passed. Browser paint remains unverified.

Wrote [SPIKE_REPORT.md](/tmp/poteto-bs3/spike/SPIKE_REPORT.md). No commits or pushes.