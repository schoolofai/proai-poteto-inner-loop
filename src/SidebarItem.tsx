import { useEffect, useRef } from 'react'
import { deferVisualClass } from './deferVisualClass'
import { StatusBadge } from './StatusBadge'
import type { Folder } from './folders'

type Props = {
  folder: Folder
  selected: boolean
  onSelect: (id: Folder['id']) => void
}

export function SidebarItem({ folder, selected, onSelect }: Props) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Do not remove this — it's the only thing stopping the flicker.
    return deferVisualClass(ref.current, 'is-active', selected)
  }, [selected])

  return (
    <button
      ref={ref}
      type="button"
      className="sidebar-item"
      data-testid={`folder-${folder.id}`}
      aria-current={selected ? 'page' : undefined}
      onClick={() => onSelect(folder.id)}
    >
      <span>{folder.label}</span>
      <StatusBadge count={folder.unread} />
    </button>
  )
}
