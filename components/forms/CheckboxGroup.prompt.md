**SLDS Checkbox Group** — a labeled set of related checkboxes (multi-select).

```jsx
<CheckboxGroup label="Industries" defaultValue={["tech"]} options={[
  { label: "Technology", value: "tech" },
  { label: "Finance", value: "fin" },
]} onChange={setIndustries} />
```

Props: `label`, `options` (`{label,value}`), `value`/`defaultValue` (arrays), `onChange`, `disabled`.
