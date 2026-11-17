# Sidebar flicker fix

## Cause

`SidebarItem` and `StatusBadge` used effects to remove their state classes and restore them after a 40 ms timeout. This allowed the browser to paint a selected folder without its highlight, or an unread count without its visible badge styling. The sidebar's `aria-current` updated immediately while the visual highlight lagged behind. No layout measurement was involved, so waiting for layout did not address the cause.

## Changes

- Derive `is-active` directly from the `selected` prop in `SidebarItem`.
- Derive `has-unread` directly from the count in `StatusBadge`.
- Remove the effects, refs, timers, and misleading workaround comments. React now commits the visual classes together with the associated content and accessibility state.
- Add regression tests for initial selection, rapid folder changes, initial unread styling, and transitions between zero and positive counts (including count capping). Tests run under Strict Mode and assert state before advancing timers, then verify it remains correct afterward.

## Validation

- `npm test`: passed, 4 tests across 2 files.
- `npm run build`: passed, including TypeScript checking and the Vite production build.
- `npm run lint`: passed.

No dependencies or CSS changes were needed. Browser paint behavior was not manually inspected; regression tests verify that the DOM classes are correct immediately without waiting for a timer.
