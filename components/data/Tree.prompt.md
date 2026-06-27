**SLDS Tree** — a nested, expand/collapse hierarchy.

```jsx
<Tree onSelect={setNode} nodes={[
  { id: "1", label: "West", iconName: "utility:open_folder", children: [
    { id: "1a", label: "California" },
    { id: "1b", label: "Oregon" },
  ]},
]} />
```

Nodes: `{id,label,iconName,children}`. Props: `defaultExpanded`, `value`, `onSelect`. For **Tree Grid**, compose Tree with Datatable columns.
