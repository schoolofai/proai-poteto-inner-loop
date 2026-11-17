import { fireEvent, render, cleanup } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { App } from './App'

afterEach(cleanup)

it('keeps the highlight and panel content in sync when switching views', () => {
  const { getByRole, getByTestId } = render(<App />)
  const list = getByRole('button', { name: 'List' })
  const preview = getByRole('button', { name: 'Preview' })

  const expectView = (selected: HTMLElement, other: HTMLElement, copy: string) => {
    expect(selected.classList.contains('is-active')).toBe(true)
    expect(selected.getAttribute('aria-pressed')).toBe('true')
    expect(other.classList.contains('is-active')).toBe(false)
    expect(other.getAttribute('aria-pressed')).toBe('false')
    expect(getByTestId('view-copy').textContent).toBe(copy)
  }

  expectView(list, preview, 'Showing a list of messages.')
  for (let i = 0; i < 3; i++) {
    fireEvent.click(preview)
    expectView(preview, list, 'Showing the preview pane.')
    fireEvent.click(list)
    expectView(list, preview, 'Showing a list of messages.')
  }
  fireEvent.change(getByRole('searchbox'), { target: { value: 'hello' } })
  expectView(list, preview, 'Showing a list of messages. Filtered by “hello”.')
})
