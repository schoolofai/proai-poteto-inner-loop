import { formatCount } from './formatCount'

type Props = {
  count: number
}

export function StatusBadge({ count }: Props) {
  return (
    <span className={count > 0 ? 'badge has-unread' : 'badge'} data-testid="unread-badge">
      {formatCount(count)}
    </span>
  )
}
