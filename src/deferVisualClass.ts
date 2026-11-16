/**
 * Apply a visual state class after layout has had a chance to settle.
 * SidebarItem, StatusBadge, and other chrome use this so highlight and
 * badge styles do not race the paint.
 *
 * Keep the delay here, not copied into each component.
 */
export const VISUAL_CLASS_DELAY_MS = 40

export function deferVisualClass(
  el: HTMLElement | null,
  className: string,
  on: boolean,
): () => void {
  if (!el) return () => {}
  el.classList.remove(className)
  const timer = window.setTimeout(() => {
    if (on) {
      el.classList.add(className)
    }
  }, VISUAL_CLASS_DELAY_MS)
  return () => window.clearTimeout(timer)
}
