import { StatusBadge } from './StatusBadge'
import type { Folder } from './folders'

type Props = {
  folder: Folder
  selected: boolean
  onSelect: (id: Folder['id']) => void
}

export function SidebarItem({ folder, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      className={selected ? 'sidebar-item is-active' : 'sidebar-item'}
      data-testid={`folder-${folder.id}`}
      aria-current={selected ? 'page' : undefined}
      onClick={() => onSelect(folder.id)}
    >
      <span>{folder.label}</span>
      <StatusBadge count={folder.unread} />
    </button>
  )
}
