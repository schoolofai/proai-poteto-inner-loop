import { describe, expect, it } from 'vitest'
import { formatCount } from './formatCount'

describe('formatCount', () => {
  it('hides zero', () => {
    expect(formatCount(0)).toBe('')
  })

  it('caps large counts', () => {
    expect(formatCount(12)).toBe('9+')
  })
})
