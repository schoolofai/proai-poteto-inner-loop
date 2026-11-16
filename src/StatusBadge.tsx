import { useEffect, useRef } from 'react'
import { formatCount } from './formatCount'

type Props = {
  count: number
}

export function StatusBadge({ count }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasUnread = count > 0

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Copied from SidebarItem. Same flicker showed up on the badge,
    // so reuse the delayed class toggle until we have time for a proper fix.
    el.classList.remove('has-unread')
    const timer = window.setTimeout(() => {
      if (hasUnread) {
        el.classList.add('has-unread')
      }
    }, 40)
    return () => window.clearTimeout(timer)
  }, [hasUnread])

  return (
    <span ref={ref} className="badge" data-testid="unread-badge">
      {formatCount(count)}
    </span>
  )
}
