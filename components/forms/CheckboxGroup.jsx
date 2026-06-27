import React from "react";

/**
 * SLDS Checkbox Group — a labeled set of related checkboxes (multi-select).
 * options: [{ label, value }]. Controlled via value (array) or uncontrolled.
 */
export function CheckboxGroup({ label, options = [], value, defaultValue = [], onChange, disabled = false, className = "", style = {} }) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const selected = isControlled ? value : internal;

  const toggle = (val) => {
    const next = selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val];
    if (!isControlled) setInternal(next);
    onChange && onChange(next);
  };

  return (
    <fieldset className={`slds2-checkbox-group ${className}`} style={{ border: 0, margin: 0, padding: 0, ...style }}>
      {label && <legend style={{ marginBottom: "0.375rem", padding: 0, fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-2)" }}>{label}</legend>}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {options.map((o) => {
          const checked = selected.includes(o.value);
          return (
            <label key={o.value} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}>
              <span
                onClick={() => !disabled && toggle(o.value)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "1rem",
                  height: "1rem",
                  flex: "none",
                  borderRadius: "var(--slds-g-radius-border-2)",
                  background: checked ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-surface-container-1)",
                  border: `1px solid ${checked ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-2)"}`,
                }}
              >
                {checked && (
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M13.5 4.5L6.5 11.5L3 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span style={{ fontSize: "var(--slds-g-text-body-regular)", color: "var(--slds-g-color-on-surface-1)" }}>{o.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
