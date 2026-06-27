import React from "react";
import { Icon } from "../display/Icon.jsx";

/** SLDS Checkbox — a single labeled boolean. */
export function Checkbox({ label, checked, defaultChecked, onChange, disabled = false, className = "", style = {} }) {
  const [internal, setInternal] = React.useState(Boolean(defaultChecked));
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const toggle = (e) => {
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return (
    <label className={`slds2-checkbox ${className}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }}>
      <input type="checkbox" checked={on} onChange={toggle} disabled={disabled} style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} />
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: "1rem", height: "1rem", flex: "none",
        background: on ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-surface-container-1)",
        border: `1px solid ${on ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-3)"}`,
        borderRadius: "var(--slds-g-radius-border-2)",
        transition: "background var(--slds-g-duration-quickly) var(--slds-g-ease-out)",
      }}>
        {on && <Icon iconName="utility:check" size="xx-small" style={{ color: "#fff", fontSize: 12 }} />}
      </span>
      {label && <span style={{ fontSize: "var(--slds-g-text-body-regular)", color: "var(--slds-g-color-on-surface-1)" }}>{label}</span>}
    </label>
  );
}
