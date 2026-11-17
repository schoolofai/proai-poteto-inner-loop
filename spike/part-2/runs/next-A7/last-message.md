Added “Unread only” beside “Priority only.” It toggles independently, uses `is-active` when enabled, and exposes its state through `aria-pressed`.

Verified toggle behavior with a temporary interaction test. Tests, lint, typecheck, build, and diff checks all passed.