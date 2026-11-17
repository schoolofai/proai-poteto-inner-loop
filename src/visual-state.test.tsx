import { StrictMode } from 'react'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'
import { StatusBadge } from './StatusBadge'
import { SyncIndicator } from './SyncIndicator'

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

function folders() {
  return screen.getByRole('navigation', { name: 'Folders' })
}

describe('visible state without waiting for timers', () => {
  it('highlights the initial folder and its unread badge immediately', () => {
    render(
      <StrictMode>
        <App />
      </StrictMode>,
    )

    const inbox = within(folders()).getByRole('button', { name: /^Inbox/ })
    expect(inbox).toHaveClass('is-active')
    expect(inbox).toHaveAttribute('aria-current', 'page')
    expect(within(inbox).getByText('3')).toHaveClass('has-unread')
    expect(
      within(within(folders()).getByRole('button', { name: 'Sent' })).getByTestId(
        'unread-badge',
      ),
    ).not.toHaveClass('has-unread')
  })

  it('keeps the folder highlight, accessible selection, and panel in sync on every click', () => {
    render(
      <StrictMode>
        <App />
      </StrictMode>,
    )

    for (const label of ['Sent', 'Drafts', 'Inbox', 'Drafts', 'Sent', 'Sent']) {
      const button = within(folders()).getByRole('button', { name: new RegExp(`^${label}`) })
      fireEvent.click(button)

      expect(screen.getByRole('heading', { name: label })).toBeVisible()
      for (const folder of within(folders()).getAllByRole('button')) {
        if (folder === button) {
          expect(folder).toHaveClass('is-active')
          expect(folder).toHaveAttribute('aria-current', 'page')
        } else {
          expect(folder).not.toHaveClass('is-active')
          expect(folder).not.toHaveAttribute('aria-current')
        }
      }
    }
  })

  it('keeps exactly the selected view highlighted immediately and after timers settle', () => {
    render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    const list = screen.getByRole('button', { name: 'List' })
    const preview = screen.getByRole('button', { name: 'Preview' })

    const checkSelection = (selected: HTMLElement, other: HTMLElement) => {
      expect(selected).toHaveAttribute('aria-pressed', 'true')
      expect(selected).toHaveClass('is-active')
      expect(other).toHaveAttribute('aria-pressed', 'false')
      expect(other).not.toHaveClass('is-active')
    }

    checkSelection(list, preview)
    for (const selected of [preview, list, preview, list]) {
      fireEvent.click(selected)
      const other = selected === list ? preview : list
      checkSelection(selected, other)
      vi.runAllTimers()
      checkSelection(selected, other)
    }
  })

  it('toggles the priority chip highlight immediately', () => {
    render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    const chip = screen.getByRole('button', { name: 'Priority only' })
    expect(chip).toHaveAttribute('aria-pressed', 'false')
    expect(chip).not.toHaveClass('is-active')
    fireEvent.click(chip)
    expect(chip).toHaveAttribute('aria-pressed', 'true')
    expect(chip).toHaveClass('is-active')
    expect(screen.getByTestId('view-copy')).toHaveTextContent('Priority messages only')
  })

  it('applies the search focus class immediately', () => {
    render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    const field = screen.getByRole('searchbox', { name: 'Search this folder' })
    expect(field).not.toHaveClass('is-focused')
    fireEvent.focus(field)
    expect(field).toHaveClass('is-focused')
    fireEvent.blur(field)
    expect(field).not.toHaveClass('is-focused')
  })

  it('updates badge visibility and text immediately when counts change', () => {
    const { rerender } = render(
      <StrictMode>
        <StatusBadge count={0} />
      </StrictMode>,
    )
    for (const count of [3, 12, 0, 1, 0]) {
      rerender(
        <StrictMode>
          <StatusBadge count={count} />
        </StrictMode>,
      )
      const badge = screen.getByTestId('unread-badge')
      expect(badge.textContent).toBe(count === 0 ? '' : count > 9 ? '9+' : String(count))
      if (count > 0) expect(badge).toHaveClass('has-unread')
      else expect(badge).not.toHaveClass('has-unread')
    }
  })

  it('updates the sync indicator class immediately when online changes', () => {
    const { rerender } = render(
      <StrictMode>
        <SyncIndicator online={false} />
      </StrictMode>,
    )
    const indicator = screen.getByTestId('sync-indicator')
    expect(indicator).not.toHaveClass('is-online')
    expect(indicator).toHaveTextContent('Offline')
    rerender(
      <StrictMode>
        <SyncIndicator online />
      </StrictMode>,
    )
    expect(indicator).toHaveClass('is-online')
    expect(indicator).toHaveTextContent('Synced')
  })
})
