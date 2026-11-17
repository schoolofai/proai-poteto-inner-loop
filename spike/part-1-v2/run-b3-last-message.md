Fixed the highlight by deriving its class directly from selection state and removing the effect that cleared it.

Regression test failed before and passes after. All 3 tests, production build, lint, and diff checks pass.

Report and before/after evidence: [spike/SPIKE_REPORT.md](/tmp/poteto-v2-b3/spike/SPIKE_REPORT.md).