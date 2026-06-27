**SLDS Empty State / Illustration** — centered icon + message + action for no-data / no-results / error states.

```jsx
<EmptyState
  iconName="standard:opportunity"
  title="No open opportunities"
  message="Create an opportunity to start tracking your pipeline."
  action={<Button variant="brand" label="New Opportunity" />}
/>
```

Props: `iconName`, `title`, `message`, `action`, `size` (`small`·`medium`).
