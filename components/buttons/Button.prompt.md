**SLDS Button** — the primary clickable action; use `brand` for the main action on a view, `neutral` for secondary, `destructive` for deletes.

```jsx
<Button variant="brand" label="New Contact" iconName="utility:add" />
<Button variant="neutral" label="Edit" />
<Button variant="destructive" label="Delete" />
```

Variants: `neutral` (default, white) · `brand` (Salesforce blue) · `outline-brand` · `destructive` · `success` · `text`. Sizes: `small`, `medium`. Props: `iconName` + `iconPosition`, `stretch` (full width), `disabled`. Pass `label` or `children`.
