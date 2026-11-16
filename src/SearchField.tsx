import { useEffect, useRef, useState } from 'react'
import { deferVisualClass } from './deferVisualClass'

type Props = {
  value: string
  onChange: (value: string) => void
}

export function SearchField({ value, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    return deferVisualClass(ref.current, 'is-focused', focused)
  }, [focused])

  return (
    <input
      ref={ref}
      type="search"
      className="search-field"
      data-testid="search-field"
      placeholder="Search this folder"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-label="Search this folder"
    />
  )
}
