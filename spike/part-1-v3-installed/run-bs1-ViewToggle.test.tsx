import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it } from 'vitest'
import { App } from './App'

afterEach(cleanup)

it('keeps the highlight on the selected view through repeated switches and rerenders', async () => {
  const user = userEvent.setup()
  render(<App />)
  const list = screen.getByRole('button', { name: 'List' })
  const preview = screen.getByRole('button', { name: 'Preview' })

  const expectSelection = (selected: HTMLElement, other: HTMLElement) => {
    expect(selected.classList.contains('is-active')).toBe(true)
    expect(selected.getAttribute('aria-pressed')).toBe('true')
    expect(other.classList.contains('is-active')).toBe(false)
    expect(other.getAttribute('aria-pressed')).toBe('false')
  }

  expectSelection(list, preview)
  for (const next of [preview, list, preview, list]) {
    await user.click(next)
    expectSelection(next, next === list ? preview : list)
  }
  await user.click(list)
  expectSelection(list, preview)
  await user.click(screen.getByRole('button', { name: /priority/i }))
  expectSelection(list, preview)
})
