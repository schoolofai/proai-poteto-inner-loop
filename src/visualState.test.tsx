import '@testing-library/jest-dom/vitest'
import { afterEach, expect, test } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { App } from './App'
import { SyncIndicator } from './SyncIndicator'

afterEach(cleanup)

function hasClass(element: Element, name: string, expected = true) {
  if (expected) expect(element).toHaveClass(name)
  else expect(element).not.toHaveClass(name)
}

test('initial selection, unread badges, sync and view are styled immediately', () => {
  const { getByRole, getAllByTestId } = render(<App />)
  hasClass(getByRole('button', { current: 'page' }), 'is-active')
  for (const badge of getAllByTestId('unread-badge')) {
    hasClass(badge, 'has-unread', badge.textContent !== '')
  }
  hasClass(getByRole('status'), 'is-online')
  hasClass(getByRole('button', { name: 'List' }), 'is-active')
})

test('toolbar classes follow each interaction immediately in both directions', () => {
  const { getByRole } = render(<App />)
  const panel = getByRole('main')
  for (const [label, panelClass] of [['Compact', 'compact'], ['Priority only', null]] as const) {
    const button = getByRole('button', { name: label })
    for (const active of [true, false]) {
      fireEvent.click(button)
      expect(button.getAttribute('aria-pressed')).toBe(String(active))
      hasClass(button, 'is-active', active)
      if (panelClass) hasClass(panel, panelClass, active)
    }
  }
  const search = getByRole('searchbox')
  fireEvent.focus(search)
  hasClass(search, 'is-focused')
  fireEvent.blur(search)
  hasClass(search, 'is-focused', false)
  for (const label of ['Preview', 'List']) {
    fireEvent.click(getByRole('button', { name: label }))
    for (const option of ['Preview', 'List']) {
      hasClass(getByRole('button', { name: option }), 'is-active', option === label)
    }
  }
})

test('folder selection follows changed state immediately', () => {
  const { getByTestId } = render(<App />)
  const inbox = getByTestId('folder-inbox')
  const next = getByTestId('folder-sent')
  fireEvent.click(next)
  hasClass(inbox, 'is-active', false)
  hasClass(next, 'is-active')
  fireEvent.click(inbox)
  hasClass(inbox, 'is-active')
  hasClass(next, 'is-active', false)
})

test('sync styling follows online prop changes immediately', () => {
  const { getByRole, rerender } = render(<SyncIndicator online />)
  for (const online of [false, true]) {
    rerender(<SyncIndicator online={online} />)
    hasClass(getByRole('status'), 'is-online', online)
  }
})
