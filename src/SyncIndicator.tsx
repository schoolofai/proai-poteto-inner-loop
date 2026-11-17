type Props = {
  online: boolean
}

export function SyncIndicator({ online }: Props) {
  return (
    <span
      className={online ? 'sync-indicator is-online' : 'sync-indicator'}
      data-testid="sync-indicator"
      role="status"
    >
      {online ? 'Synced' : 'Offline'}
    </span>
  )
}
