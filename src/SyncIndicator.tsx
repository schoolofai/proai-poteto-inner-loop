import { useEffect, useRef } from 'react'
import { deferVisualClass } from './deferVisualClass'

type Props = {
  online: boolean
}

export function SyncIndicator({ online }: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    return deferVisualClass(ref.current, 'is-online', online)
  }, [online])

  return (
    <span
      ref={ref}
      className="sync-indicator"
      data-testid="sync-indicator"
      role="status"
    >
      {online ? 'Synced' : 'Offline'}
    </span>
  )
}
