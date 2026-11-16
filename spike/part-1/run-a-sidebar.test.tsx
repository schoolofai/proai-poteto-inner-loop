import { StrictMode } from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'
import { StatusBadge } from './StatusBadge'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('sidebar visual state', () => {
  it('highlights the selected folder immediately on mount and after rapid clicks', () => {
    vi.useFakeTimers()
    render(<StrictMode><App /></StrictMode>)

    const expectSelected = (id: string) => {
      for (const folder of ['inbox', 'sent', 'drafts']) {
        const button = screen.getByTestId(`folder-${folder}`)
        expect(button.classList.contains('is-active')).toBe(folder === id)
        expect(button.getAttribute('aria-current')).toBe(folder === id ? 'page' : null)
      }
    }

    expectSelected('inbox')
    for (const id of ['sent', 'drafts', 'inbox', 'drafts']) {
      fireEvent.click(screen.getByTestId(`folder-${id}`))
      expectSelected(id)
    }
    act(() => vi.runAllTimers())
    expectSelected('drafts')
  })

  it('renders unread styling together with the count on mount and updates', () => {
    vi.useFakeTimers()
    const { rerender } = render(<StrictMode><StatusBadge count={3} /></StrictMode>)
    const badge = screen.getByTestId('unread-badge')
    expect(badge.classList.contains('has-unread')).toBe(true)
    expect(badge.textContent).toBe('3')

    for (const count of [0, 1, 12, 0]) {
      rerender(<StrictMode><StatusBadge count={count} /></StrictMode>)
      expect(badge.classList.contains('has-unread')).toBe(count > 0)
      expect(badge.textContent).toBe(count === 0 ? '' : count > 9 ? '9+' : String(count))
    }
    act(() => vi.runAllTimers())
    expect(badge.classList.contains('has-unread')).toBe(false)
  })
})
