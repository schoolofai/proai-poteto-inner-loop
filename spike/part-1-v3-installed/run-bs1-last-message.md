Fixed the highlight by deriving its CSS class directly from the selected state and removing the effect that cleared it. No surrounding refactor.

The regression check fails before the fix and passes after. Tests, build, and lint pass. Browser paint wasn’t visually verified.

Laziness Protocol kept the change local; Fix Root Causes removed the faulty effect.

Report written to [spike/SPIKE_REPORT.md](/tmp/poteto-bs1/spike/SPIKE_REPORT.md). No commit or push.