// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { App } from './App'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

it('keeps the highlight on the selected view when switching repeatedly', () => {
  vi.useFakeTimers()
  render(<App />)
  const list = screen.getByRole('button', { name: 'List' })
  const preview = screen.getByRole('button', { name: 'Preview' })
  const expectSelected = (selected: HTMLElement, other: HTMLElement) => {
    expect(selected.classList.contains('is-active')).toBe(true)
    expect(selected.getAttribute('aria-pressed')).toBe('true')
    expect(other.classList.contains('is-active')).toBe(false)
    expect(other.getAttribute('aria-pressed')).toBe('false')
  }

  expectSelected(list, preview)
  for (const selected of [preview, list, preview, list]) {
    fireEvent.click(selected)
    const other = selected === list ? preview : list
    expectSelected(selected, other)
    act(() => vi.runAllTimers())
    expectSelected(selected, other)
  }
})
