**SLDS Alert** — a full-width, persistent notification bar pinned in context (top of a page/region). Unlike Toast, it stays until dismissed.

```jsx
<Alert variant="warning" onClose={dismiss}>
  Your trial ends in 3 days. <a href="#">Add billing</a> to keep access.
</Alert>
<Alert variant="error">We couldn't reach the server. Retrying…</Alert>
```

Variants: `info` (cloud blue) · `success` · `warning` · `error`. Props: `iconName` (override leading icon), `onClose` (shows ×). Use for system state; use **Toast** for transient action confirmations.
