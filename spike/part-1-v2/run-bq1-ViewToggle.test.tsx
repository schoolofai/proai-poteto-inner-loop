import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { App } from './App'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

it('keeps exactly the selected view highlighted immediately and after timers settle', () => {
  vi.useFakeTimers()
  render(<App />)
  const list = screen.getByRole('button', { name: 'List' })
  const preview = screen.getByRole('button', { name: 'Preview' })

  const checkSelection = (selected: HTMLElement, other: HTMLElement) => {
    expect(selected.getAttribute('aria-pressed')).toBe('true')
    expect(selected.classList.contains('is-active')).toBe(true)
    expect(other.getAttribute('aria-pressed')).toBe('false')
    expect(other.classList.contains('is-active')).toBe(false)
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
