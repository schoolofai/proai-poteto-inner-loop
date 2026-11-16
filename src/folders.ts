export type FolderId = 'inbox' | 'sent' | 'drafts'

export type Folder = {
  id: FolderId
  label: string
  unread: number
}

export const FOLDERS: Folder[] = [
  { id: 'inbox', label: 'Inbox', unread: 3 },
  { id: 'sent', label: 'Sent', unread: 0 },
  { id: 'drafts', label: 'Drafts', unread: 1 },
]

export function folderLabel(id: FolderId): string {
  const found = FOLDERS.find((folder) => folder.id === id)
  if (!found) {
    throw new Error(`Unknown folder: ${id}`)
  }
  return found.label
}
