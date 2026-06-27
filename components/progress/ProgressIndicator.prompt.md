**SLDS Progress Indicator** — shows progress through ordered steps. The `path` variant is the signature Salesforce sales/case Path; `base` is the circular stepper for guided flows.

```jsx
// Sales Path
<ProgressIndicator variant="path" current={3}
  steps={["Qualification","Needs Analysis","Proposal","Negotiation","Closed Won"]} />

// Guided-flow stepper
<ProgressIndicator variant="base" current={1}
  steps={["Account","Details","Confirm"]} />
```

Props: `steps` (array), `current` (0-based active index — earlier steps render complete with a check), `variant` (`base` · `path`).
