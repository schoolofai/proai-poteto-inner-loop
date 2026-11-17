Confirmed: [ViewToggle.tsx](/tmp/p2-c2/src/ViewToggle.tsx:39) already derives the class directly from `selected` during render:

```tsx
className={`view-btn${selected ? ' is-active' : ''}`}
```

There’s no `deferVisualClass`, timer, or effect in the button. No further changes were needed.