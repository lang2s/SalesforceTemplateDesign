**SLDS Modal** — a focused dialog over a dimmed backdrop; use for create/edit forms, confirmations, and detail views that shouldn't navigate away.

```jsx
<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="New Contact"
  tagline="Add a contact to Global Media"
  footer={<>
    <Button variant="neutral" label="Cancel" onClick={() => setOpen(false)} />
    <Button variant="brand" label="Save" />
  </>}
>
  <p>Form fields go here…</p>
</Modal>
```

Props: `isOpen`, `onClose`, `title`, `tagline`, `footer`, `size` (`small` 30rem · `medium` 40rem · `large` 52rem). Body scrolls when tall; backdrop click closes.
