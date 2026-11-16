import { useEffect, useRef } from 'react'

export type ViewMode = 'list' | 'preview'

type Props = {
  view: ViewMode
  onChange: (view: ViewMode) => void
}

const OPTIONS: { id: ViewMode; label: string }[] = [
  { id: 'list', label: 'List' },
  { id: 'preview', label: 'Preview' },
]

export function ViewToggle({ view, onChange }: Props) {
  return (
    <div className="view-toggle" role="group" aria-label="View">
      {OPTIONS.map((option) => (
        <ViewButton
          key={option.id}
          option={option}
          selected={view === option.id}
          onSelect={onChange}
        />
      ))}
    </div>
  )
}

type ButtonProps = {
  option: (typeof OPTIONS)[number]
  selected: boolean
  onSelect: (view: ViewMode) => void
}

function ViewButton({ option, selected, onSelect }: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Clear the previous highlight when the view changes so the next
    // paint is clean.
    el.classList.remove('is-active')
  }, [selected])

  return (
    <button
      ref={ref}
      type="button"
      className="view-btn"
      data-testid={`view-${option.id}`}
      aria-pressed={selected}
      onClick={() => onSelect(option.id)}
    >
      {option.label}
    </button>
  )
}
