import { useEffect, useRef } from 'react'
import { deferVisualClass } from './deferVisualClass'
import { formatCount } from './formatCount'

type Props = {
  count: number
}

export function StatusBadge({ count }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasUnread = count > 0

  useEffect(() => {
    return deferVisualClass(ref.current, 'has-unread', hasUnread)
  }, [hasUnread])

  return (
    <span ref={ref} className="badge" data-testid="unread-badge">
      {formatCount(count)}
    </span>
  )
}
