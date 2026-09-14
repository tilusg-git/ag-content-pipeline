Click-triggered popover menu anchored under its trigger — ink border, hairline separators, destructive items in error red.

```jsx
<DropdownMenu trigger={<button className="dd-trigger-btn">&#8942;</button>} items={[
  { label: "Edit goal" },
  { label: "Duplicate" },
  { separator: true },
  { label: "Delete", destructive: true },
]} />
```
