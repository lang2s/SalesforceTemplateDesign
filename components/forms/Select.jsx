import React from "react";
import { Icon } from "../display/Icon.jsx";

let _sid = 0;

/** SLDS Select — a native <select> styled to match SLDS form controls. */
export function Select({ label, options = [], value, defaultValue, onChange, required = false, disabled = false, error, className = "", style = {} }) {
  const id = React.useMemo(() => `slds2-select-${++_sid}`, []);
  const [focus, setFocus] = React.useState(false);
  const invalid = Boolean(error);

  return (
    <div className={`slds2-form-element ${className}`} style={style}>
      {label && (
        <label htmlFor={id} style={{ display: "block", marginBottom: "0.25rem", fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-2)" }}>
          {required && <abbr title="required" style={{ color: "var(--slds-g-color-error-1)", textDecoration: "none", marginRight: 2 }}>*</abbr>}
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <select
          id={id}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          required={required}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            width: "100%",
            height: "2rem",
            padding: "0 2rem 0 0.75rem",
            font: "inherit",
            fontSize: "var(--slds-g-text-body-regular)",
            color: "var(--slds-g-color-on-surface-1)",
            background: "var(--slds-g-color-surface-container-1)",
            border: `1px solid ${invalid ? "var(--slds-g-color-error-1)" : "var(--slds-g-color-border-2)"}`,
            borderRadius: "var(--slds-g-radius-border-3)",
            outline: "none",
            boxShadow: focus ? "var(--slds-g-shadow-focus)" : "none",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {options.map((o) => (
            <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
          ))}
        </select>
        <Icon iconName="utility:chevrondown" size="xx-small" style={{ position: "absolute", right: "0.5rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--slds-g-color-on-surface-3)" }} />
      </div>
      {invalid && <p style={{ margin: "0.25rem 0 0", fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-error-1)" }}>{error}</p>}
    </div>
  );
}
