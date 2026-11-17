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
  return (
    <button
      type="button"
      className={selected ? 'view-btn is-active' : 'view-btn'}
      data-testid={`view-${option.id}`}
      aria-pressed={selected}
      onClick={() => onSelect(option.id)}
    >
      {option.label}
    </button>
  )
}
