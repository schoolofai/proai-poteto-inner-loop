Fixed the highlight by deriving `is-active` directly from selection state and removing the effect that cleared it. Surrounding components are unchanged.

Added a regression test. All 3 tests, build, lint, and diff checks pass.

Report and before/after evidence: [SPIKE_REPORT.md](/tmp/poteto-v2-bq3/spike/SPIKE_REPORT.md).