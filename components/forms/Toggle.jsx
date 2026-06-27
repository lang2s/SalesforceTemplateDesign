import React from "react";

/** SLDS Toggle (switch) — an instant on/off control. */
export function Toggle({ label, checked, defaultChecked, onChange, disabled = false, className = "", style = {} }) {
  const [internal, setInternal] = React.useState(Boolean(defaultChecked));
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const toggle = (e) => {
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return (
    <label className={`slds2-toggle ${className}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }}>
      <input type="checkbox" checked={on} onChange={toggle} disabled={disabled} style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} />
      <span style={{
        position: "relative",
        width: "2.75rem", height: "1.5rem", flex: "none",
        background: on ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-3)",
        borderRadius: "var(--slds-g-radius-border-pill)",
        transition: "background var(--slds-g-duration-promptly) var(--slds-g-ease-out)",
      }}>
        <span style={{
          position: "absolute", top: 3, left: 3,
          width: "1.125rem", height: "1.125rem",
          background: "#fff", borderRadius: "50%",
          boxShadow: "var(--slds-g-shadow-2)",
          transform: on ? "translateX(1.25rem)" : "translateX(0)",
          transition: "transform var(--slds-g-duration-promptly) var(--slds-g-ease-out)",
        }} />
      </span>
      {label && <span style={{ fontSize: "var(--slds-g-text-body-regular)", color: "var(--slds-g-color-on-surface-1)" }}>{label}</span>}
    </label>
  );
}
