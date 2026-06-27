**SLDS Vertical Navigation** — a sidebar nav with sections, icons, and count badges.

```jsx
<VerticalNavigation defaultValue="recent" onSelect={go} sections={[
  { label: "Reporting", items: [
    { id: "recent", label: "Recent", iconName: "utility:clock", badge: 12 },
    { id: "created", label: "Created by Me", iconName: "utility:user" },
  ]},
]} />
```

`sections`: `{label?, items:[{id,label,iconName,badge,href,onClick}]}`. Props: `value`/`defaultValue`, `onSelect`.
