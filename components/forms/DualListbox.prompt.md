**SLDS Dual Listbox** — move options between Available and Selected lists.

```jsx
<DualListbox
  label="Permissions"
  defaultValue={["read"]}
  options={[
    { label: "Read", value: "read" },
    { label: "Edit", value: "edit" },
    { label: "Delete", value: "delete" },
  ]}
  onChange={setPerms}
/>
```

Click to highlight, then use the ▶ / ◀ buttons (or double-click) to move. Props: `options`, `value`/`defaultValue`, `onChange`, `sourceLabel`, `selectedLabel`.
