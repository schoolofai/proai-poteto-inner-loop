Fixed both flickers by removing the 40 ms timers and rendering highlight and badge classes directly from props.

Added regression tests for immediate selection and unread-count updates. `npm run verify` passes lint, typechecking, all 5 tests, and the production build.

Details and saved verification evidence are in [SPIKE_REPORT.md](/tmp/poteto-series-run-b/SPIKE_REPORT.md). Verification exercised rendered DOM behavior in jsdom; no browser paint measurements were taken.