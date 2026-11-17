import { useEffect, useRef } from 'react'

type Props = {
  active: boolean
  onToggle: () => void
}

export function UnreadFilter({ active, onToggle }: Props) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.remove('is-active')
    const timer = window.setTimeout(() => {
      if (active) el.classList.add('is-active')
    }, 40)
    return () => window.clearTimeout(timer)
  }, [active])

  return (
    <button
      ref={ref}
      type="button"
      className="priority-filter"
      aria-pressed={active}
      onClick={onToggle}
    >
      Unread only
    </button>
  )
}
