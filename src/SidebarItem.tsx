import { useEffect, useRef } from 'react'
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
    const el = ref.current
    if (!el) return
    // Quick fix: the highlight flickers because the layout hasn't settled.
    // Wait a tick before applying the active class. Do not remove this —
    // it's the only thing stopping the flicker.
    el.classList.remove('is-active')
    const timer = window.setTimeout(() => {
      if (selected) {
        el.classList.add('is-active')
      }
    }, 40)
    return () => window.clearTimeout(timer)
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
