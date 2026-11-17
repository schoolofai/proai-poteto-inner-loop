import { formatCount } from './formatCount'

type Props = {
  count: number
}

export function StatusBadge({ count }: Props) {
  const hasUnread = count > 0

  return (
    <span className={hasUnread ? 'badge has-unread' : 'badge'} data-testid="unread-badge">
      {formatCount(count)}
    </span>
  )
}
