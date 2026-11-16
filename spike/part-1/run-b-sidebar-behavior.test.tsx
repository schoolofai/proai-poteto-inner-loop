import { StrictMode } from 'react'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'
import { StatusBadge } from './StatusBadge'

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('sidebar visible state without waiting for timers', () => {
  it('highlights the initial folder and its unread badge immediately', () => {
    render(<StrictMode><App /></StrictMode>)

    const inbox = screen.getByRole('button', { name: /^Inbox/ })
    expect(inbox).toHaveClass('is-active')
    expect(inbox).toHaveAttribute('aria-current', 'page')
    expect(within(inbox).getByText('3')).toHaveClass('has-unread')
    expect(within(screen.getByRole('button', { name: 'Sent' }))
      .getByTestId('unread-badge')).not.toHaveClass('has-unread')
  })

  it('keeps the highlight, accessible selection, and panel in sync on every click', () => {
    render(<StrictMode><App /></StrictMode>)

    for (const label of ['Sent', 'Drafts', 'Inbox', 'Drafts', 'Sent', 'Sent']) {
      const button = screen.getByRole('button', { name: new RegExp(`^${label}`) })
      fireEvent.click(button)

      expect(screen.getByRole('heading', { name: label })).toBeVisible()
      for (const folder of screen.getAllByRole('button')) {
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

  it('updates badge visibility and text immediately when counts change', () => {
    const { rerender } = render(<StrictMode><StatusBadge count={0} /></StrictMode>)
    for (const count of [3, 12, 0, 1, 0]) {
      rerender(<StrictMode><StatusBadge count={count} /></StrictMode>)
      const badge = screen.getByTestId('unread-badge')
      expect(badge.textContent).toBe(count === 0 ? '' : count > 9 ? '9+' : String(count))
      if (count > 0) expect(badge).toHaveClass('has-unread')
      else expect(badge).not.toHaveClass('has-unread')
    }
  })
})
