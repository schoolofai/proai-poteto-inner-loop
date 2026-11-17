Confirmed: [ViewToggle.tsx](/tmp/p2-c3/src/ViewToggle.tsx:39) already renders the class directly from `selected`:

```tsx
className={selected ? 'view-btn is-active' : 'view-btn'}
```

It uses no `deferVisualClass`, timer, ref, or effect. No further edit was needed.