import { useState } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
}

export function SearchField({ value, onChange }: Props) {
  const [focused, setFocused] = useState(false)

  return (
    <input
      type="search"
      className={focused ? 'search-field is-focused' : 'search-field'}
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
