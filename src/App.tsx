import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { FOLDERS, folderLabel, type FolderId } from './folders'

export function App() {
  const [selected, setSelected] = useState<FolderId>('inbox')
  const current = FOLDERS.find((folder) => folder.id === selected)!

  return (
    <div className="app">
      <Sidebar selected={selected} onSelect={setSelected} />
      <main className="panel">
        <h1>{folderLabel(selected)}</h1>
        <p>
          {current.unread === 0
            ? 'No unread messages.'
            : `${current.unread} unread in this folder.`}
        </p>
      </main>
    </div>
  )
}
