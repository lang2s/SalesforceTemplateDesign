**SLDS Button Group** — joins related buttons into a segmented control; can act as a single-select view switcher.

```jsx
<ButtonGroup value={view} onChange={setView} items={[
  { label: "List", value: "list", iconName: "utility:list" },
  { label: "Kanban", value: "kanban", iconName: "utility:kanban" },
]} />
```

Each item: `label`, `value`, optional `iconName`/`onClick`. Pass `value`+`onChange` for selection, or per-item `onClick` for plain toolbars.
