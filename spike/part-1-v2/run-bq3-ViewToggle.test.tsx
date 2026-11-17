import { StrictMode } from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { App } from './App'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

it('keeps the highlight on the selected view through switches and later renders', () => {
  vi.useFakeTimers()
  render(<StrictMode><App /></StrictMode>)
  const list = screen.getByRole('button', { name: 'List' })
  const preview = screen.getByRole('button', { name: 'Preview' })

  function expectSelected(selected: HTMLElement, other: HTMLElement) {
    expect(selected.classList.contains('is-active')).toBe(true)
    expect(selected.getAttribute('aria-pressed')).toBe('true')
    expect(other.classList.contains('is-active')).toBe(false)
    expect(other.getAttribute('aria-pressed')).toBe('false')
  }

  expectSelected(list, preview)
  for (const selected of [preview, list, preview]) {
    const other = selected === list ? preview : list
    fireEvent.click(selected)
    expectSelected(selected, other)
    act(() => { vi.runAllTimers() })
    expectSelected(selected, other)
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: selected.textContent } })
    expectSelected(selected, other)
  }
})
