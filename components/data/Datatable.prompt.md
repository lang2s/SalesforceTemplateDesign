**SLDS Datatable** — a styled record grid with selection, sortable columns, and custom cells.

```jsx
<Datatable
  selectable
  sortBy="amount" sortDir="desc" onSort={setSort}
  columns={[
    { key: "name", label: "Opportunity", sortable: true },
    { key: "amount", label: "Amount", align: "right", sortable: true,
      render: (v) => "$" + v.toLocaleString() },
    { key: "stage", label: "Stage", render: (v) => <Badge variant="brand" label={v} /> },
  ]}
  rows={opps}
  rowActions={(r) => <ButtonMenu iconName="utility:down" items={[{label:"Edit"}]} />}
/>
```

Columns: `{key,label,width,align,sortable,render}`. Rows need a unique `id`. Sorting/paging logic stays in your app.
