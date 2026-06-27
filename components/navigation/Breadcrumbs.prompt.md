**SLDS Breadcrumbs** — a hierarchy trail above a record or list view; the last crumb is the current page.

```jsx
<Breadcrumbs items={[
  { label: "Sales", onClick: goHome },
  { label: "Contacts", onClick: goList },
  { label: "Lando Voss" },
]} />
```

Each item: `label`, optional `href` / `onClick`. Separator is a `›` chevron. Links use brand blue; the current page is weak gray and non-interactive.
