import { StrictMode } from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { App } from './App'

afterEach(cleanup)

it('keeps the highlight on the selected view when switching repeatedly', () => {
  render(<StrictMode><App /></StrictMode>)
  const list = screen.getByRole('button', { name: 'List' })
  const preview = screen.getByRole('button', { name: 'Preview' })

  expect(list.classList.contains('is-active')).toBe(true)
  expect(preview.classList.contains('is-active')).toBe(false)

  for (const button of [preview, list, preview, preview, list]) {
    fireEvent.click(button)
    const other = button === list ? preview : list
    expect(button.getAttribute('aria-pressed')).toBe('true')
    expect(button.classList.contains('is-active')).toBe(true)
    expect(other.getAttribute('aria-pressed')).toBe('false')
    expect(other.classList.contains('is-active')).toBe(false)
    expect(screen.getByTestId('view-copy').textContent).toBe(
      button === list ? 'Showing a list of messages.' : 'Showing the preview pane.',
    )
  }
})
