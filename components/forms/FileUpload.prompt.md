**SLDS File Upload** — a dashed drop zone + browse link; lists selected files.

```jsx
<FileUpload label="Attachments" accept=".pdf,image/*" onFiles={setFiles} />
```

Drag-and-drop or click to pick. Props: `label`, `accept`, `multiple`, `onFiles`. Visual/interaction shell only — wire `onFiles` to your own upload.
