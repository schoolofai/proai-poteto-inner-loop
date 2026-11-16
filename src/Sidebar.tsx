import { SidebarItem } from './SidebarItem'
import { FOLDERS, type FolderId } from './folders'

type Props = {
  selected: FolderId
  onSelect: (id: FolderId) => void
}

export function Sidebar({ selected, onSelect }: Props) {
  return (
    <nav className="sidebar" aria-label="Folders">
      {FOLDERS.map((folder) => (
        <SidebarItem
          key={folder.id}
          folder={folder}
          selected={folder.id === selected}
          onSelect={onSelect}
        />
      ))}
    </nav>
  )
}
