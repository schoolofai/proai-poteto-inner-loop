import { useEffect, useRef } from 'react'
import { deferVisualClass } from './deferVisualClass'

type Props = {
  active: boolean
  onToggle: () => void
}

export function PriorityFilter({ active, onToggle }: Props) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    return deferVisualClass(ref.current, 'is-active', active)
  }, [active])

  return (
    <button
      ref={ref}
      type="button"
      className="priority-filter"
      data-testid="priority-filter"
      aria-pressed={active}
      onClick={onToggle}
    >
      Priority only
    </button>
  )
}
