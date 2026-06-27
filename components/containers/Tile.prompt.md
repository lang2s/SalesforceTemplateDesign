**SLDS Tile** — a compact record summary for related lists and side panels.

```jsx
<Tile
  title="Global Media — Platform Renewal"
  href="#"
  iconName="standard:opportunity"
  meta={[
    { label: "Amount", value: "$240,000" },
    { label: "Stage", value: "Negotiation" },
  ]}
  actions={<ButtonMenu iconName="utility:down" items={[{label:"Edit"}]} />}
/>
```

Props: `title` (+`href`/`onTitleClick`), `iconName` or `avatar`, `meta` (`{label,value}`), `actions`.
