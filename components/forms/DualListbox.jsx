import React from "react";
import { Icon } from "../display/Icon.jsx";

/**
 * SLDS Dual Listbox — move options between a Source list and a Selected list.
 * options: [{ label, value }]. Uncontrolled selection by default.
 */
export function DualListbox({ label, sourceLabel = "Available", selectedLabel = "Selected", options = [], value, defaultValue = [], onChange, className = "", style = {} }) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const selected = isControlled ? value : internal;
  const [highlight, setHighlight] = React.useState(null);

  const setSel = (next) => { if (!isControlled) setInternal(next); onChange && onChange(next); };
  const source = options.filter((o) => !selected.includes(o.value));
  const chosen = options.filter((o) => selected.includes(o.value));

  const move = (val, into) => {
    setSel(into ? [...selected, val] : selected.filter((v) => v !== val));
    setHighlight(null);
  };

  const list = (rows, into) => (
    <ul style={{ listStyle: "none", margin: 0, padding: "0.25rem", height: "11rem", overflowY: "auto", background: "var(--slds-g-color-surface-container-1)", border: "1px solid var(--slds-g-color-border-2)", borderRadius: "var(--slds-g-radius-border-3)" }}>
      {rows.map((o) => (
        <li
          key={o.value}
          onClick={() => setHighlight({ val: o.value, into })}
          onDoubleClick={() => move(o.value, into)}
          style={{
            padding: "0.4rem 0.5rem",
            borderRadius: "var(--slds-g-radius-border-2)",
            fontSize: "var(--slds-g-text-body-regular)",
            color: "var(--slds-g-color-on-surface-1)",
            background: highlight && highlight.val === o.value ? "var(--slds-g-color-accent-container-1)" : "transparent",
            cursor: "pointer",
          }}
        >
          {o.label}
        </li>
      ))}
    </ul>
  );

  const moveBtn = (icon, into) => (
    <button
      type="button"
      onClick={() => highlight && move(highlight.val, into)}
      aria-label={into ? "Add" : "Remove"}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "2rem", height: "2rem", borderRadius: "var(--slds-g-radius-border-2)", border: "1px solid var(--slds-g-color-border-2)", background: "var(--slds-g-color-surface-container-1)", cursor: "pointer" }}
    >
      <Icon iconName={icon} size="x-small" style={{ color: "var(--slds-g-color-accent-1)" }} />
    </button>
  );

  return (
    <div className={`slds2-dual-listbox ${className}`} style={style}>
      {label && <div style={{ marginBottom: "0.375rem", fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-2)" }}>{label}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0.625rem", alignItems: "center" }}>
        <div>
          <div style={{ marginBottom: "0.25rem", fontSize: "var(--slds-g-text-body-small)", fontWeight: "var(--slds-g-font-weight-semibold)", color: "var(--slds-g-color-on-surface-3)" }}>{sourceLabel}</div>
          {list(source, true)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
          {moveBtn("utility:right", true)}
          {moveBtn("utility:left", false)}
        </div>
        <div>
          <div style={{ marginBottom: "0.25rem", fontSize: "var(--slds-g-text-body-small)", fontWeight: "var(--slds-g-font-weight-semibold)", color: "var(--slds-g-color-on-surface-3)" }}>{selectedLabel}</div>
          {list(chosen, false)}
        </div>
      </div>
    </div>
  );
}
