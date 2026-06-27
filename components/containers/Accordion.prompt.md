**SLDS Accordion** — stacked expand/collapse sections; single-open by default.

```jsx
<Accordion allowMultiple sections={[
  { id: "a", label: "Contact Information", content: <p>…</p> },
  { id: "b", label: "Address", content: <p>…</p> },
]} />
```

Props: `sections` (`{id,label,content}`), `defaultActive`, `allowMultiple`.
