import '@testing-library/jest-dom/vitest'
import { StrictMode } from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { App } from './App'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

it('keeps the selected view highlighted immediately and after pending work', () => {
  vi.useFakeTimers()
  render(<StrictMode><App /></StrictMode>)
  const list = screen.getByRole('button', { name: 'List' })
  const preview = screen.getByRole('button', { name: 'Preview' })

  function expectView(selected: HTMLElement, other: HTMLElement, copy: string) {
    expect(selected).toHaveClass('is-active')
    expect(selected).toHaveAttribute('aria-pressed', 'true')
    expect(other).not.toHaveClass('is-active')
    expect(other).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByTestId('view-copy')).toHaveTextContent(copy)
  }

  expectView(list, preview, 'Showing a list of messages.')
  for (const mode of ['preview', 'list', 'preview']) {
    fireEvent.click(mode === 'list' ? list : preview)
    const check = () => expectView(
      mode === 'list' ? list : preview,
      mode === 'list' ? preview : list,
      mode === 'list' ? 'Showing a list of messages.' : 'Showing the preview pane.',
    )
    check()
    act(() => vi.runAllTimers())
    check()
  }

  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'hello' } })
  expectView(preview, list, 'Showing the preview pane.')
})
