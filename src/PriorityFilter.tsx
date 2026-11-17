type Props = {
  active: boolean
  onToggle: () => void
}

export function PriorityFilter({ active, onToggle }: Props) {
  return (
    <button
      type="button"
      className={active ? 'priority-filter is-active' : 'priority-filter'}
      data-testid="priority-filter"
      aria-pressed={active}
      onClick={onToggle}
    >
      Priority only
    </button>
  )
}
