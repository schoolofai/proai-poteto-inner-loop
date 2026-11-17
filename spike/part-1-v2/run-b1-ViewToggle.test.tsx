import { StrictMode } from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { App } from './App'
import styles from './styles.css?inline'

beforeEach(() => {
  vi.useFakeTimers()
  const style = document.createElement('style')
  style.textContent = styles
  document.head.append(style)
})

afterEach(() => {
  cleanup()
  document.head.querySelector('style')?.remove()
  vi.useRealTimers()
})

function expectSelection(selected: string, other: string) {
  const active = screen.getByRole('button', { name: selected })
  const inactive = screen.getByRole('button', { name: other })
  expect(active.getAttribute('aria-pressed')).toBe('true')
  expect(inactive.getAttribute('aria-pressed')).toBe('false')
  expect(getComputedStyle(active).backgroundColor).toBe('rgb(47, 111, 173)')
  expect(getComputedStyle(inactive).backgroundColor).toBe('rgb(255, 255, 255)')
}

it('highlights the initial List selection', () => {
  render(<StrictMode><App /></StrictMode>)
  expectSelection('List', 'Preview')
})

it('keeps the highlight in sync with repeated view changes and later renders', () => {
  render(<StrictMode><App /></StrictMode>)
  for (const view of ['Preview', 'List', 'Preview']) {
    fireEvent.click(screen.getByRole('button', { name: view }))
    expectSelection(view, view === 'List' ? 'Preview' : 'List')
    expect(screen.getByTestId('view-copy').textContent).toBe(
      view === 'List' ? 'Showing a list of messages.' : 'Showing the preview pane.',
    )
  }
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'harbor' } })
  expectSelection('Preview', 'List')
  act(() => vi.runAllTimers())
  expectSelection('Preview', 'List')
})
