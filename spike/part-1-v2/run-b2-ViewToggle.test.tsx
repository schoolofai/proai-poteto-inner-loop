import { StrictMode } from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, expect, it, vi } from 'vitest'
import { App } from './App'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

it('highlights List on the initial render', () => {
  render(<StrictMode><App /></StrictMode>)

  expect(screen.getByRole('button', { name: 'List' })).toHaveClass('is-active')
  expect(screen.getByRole('button', { name: 'Preview' })).not.toHaveClass('is-active')
})

it('keeps the highlight aligned with the selected view through repeated switches', () => {
  vi.useFakeTimers()
  render(<StrictMode><App /></StrictMode>)
  const list = screen.getByRole('button', { name: 'List' })
  const preview = screen.getByRole('button', { name: 'Preview' })

  for (const selected of [preview, list, preview, list]) {
    fireEvent.click(selected)
    const other = selected === list ? preview : list
    const assertSelection = () => {
      expect(selected).toHaveAttribute('aria-pressed', 'true')
      expect(selected).toHaveClass('is-active')
      expect(other).toHaveAttribute('aria-pressed', 'false')
      expect(other).not.toHaveClass('is-active')
      expect(screen.getByTestId('view-copy')).toHaveTextContent(
        selected === list ? 'Showing a list of messages.' : 'Showing the preview pane.',
      )
    }

    assertSelection()
    act(() => vi.runAllTimers())
    assertSelection()
  }
})
