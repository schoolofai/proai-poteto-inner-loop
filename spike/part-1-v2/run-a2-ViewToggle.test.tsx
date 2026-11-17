import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { App } from './App'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

it('keeps exactly the current view highlighted immediately and after timers settle', () => {
  vi.useFakeTimers()
  render(<App />)
  const list = screen.getByRole('button', { name: 'List' })
  const preview = screen.getByRole('button', { name: 'Preview' })

  const check = (selected: HTMLElement, other: HTMLElement) => {
    expect(selected.classList.contains('is-active')).toBe(true)
    expect(other.classList.contains('is-active')).toBe(false)
    expect(selected.getAttribute('aria-pressed')).toBe('true')
    expect(other.getAttribute('aria-pressed')).toBe('false')
  }

  check(list, preview)
  for (const button of [preview, list, preview, list]) {
    fireEvent.click(button)
    check(button, button === list ? preview : list)
  }
  act(() => vi.runAllTimers())
  check(list, preview)
})
