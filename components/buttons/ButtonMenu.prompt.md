**SLDS Button Menu** — a button that opens a dropdown of actions (the `▾` / overflow `⋯` menu).

```jsx
<ButtonMenu label="Actions" items={[
  { label: "Edit", iconName: "utility:edit", onClick: edit },
  { label: "Clone", iconName: "utility:copy" },
  { divider: true },
  { label: "Delete", iconName: "utility:delete", destructive: true },
]} />
```

Items can be `{label, iconName, onClick, checked, destructive}`, `{divider:true}`, or `{subheader:"…"}`. Props: `label` (omit for icon-only), `iconName`, `align` (`left`·`right`), `variant` (`border`·`bare`).
