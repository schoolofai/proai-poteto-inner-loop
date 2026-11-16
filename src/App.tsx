import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { SearchField } from './SearchField'
import { PriorityFilter } from './PriorityFilter'
import { SyncIndicator } from './SyncIndicator'
import { ViewToggle, type ViewMode } from './ViewToggle'
import { FOLDERS, folderLabel, type FolderId } from './folders'

export function App() {
  const [selected, setSelected] = useState<FolderId>('inbox')
  const [query, setQuery] = useState('')
  const [priorityOnly, setPriorityOnly] = useState(false)
  const [view, setView] = useState<ViewMode>('list')
  const current = FOLDERS.find((folder) => folder.id === selected)!

  return (
    <div className="app">
      <Sidebar selected={selected} onSelect={setSelected} />
      <main className="panel">
        <header className="toolbar">
          <SearchField value={query} onChange={setQuery} />
          <PriorityFilter
            active={priorityOnly}
            onToggle={() => setPriorityOnly((value) => !value)}
          />
          <ViewToggle view={view} onChange={setView} />
          <SyncIndicator online />
        </header>
        <h1>{folderLabel(selected)}</h1>
        <p>
          {current.unread === 0
            ? 'No unread messages.'
            : `${current.unread} unread in this folder.`}
        </p>
        <p className="view-copy" data-testid="view-copy">
          {view === 'list' ? 'Showing a list of messages.' : 'Showing the preview pane.'}
          {priorityOnly ? ' Priority messages only.' : ''}
          {query ? ` Filtered by “${query}”.` : ''}
        </p>
      </main>
    </div>
  )
}
