import React from "react";
import { Icon } from "../display/Icon.jsx";

/** SLDS Combobox — a styled single-select dropdown. */
export function Combobox({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  style = {},
}) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const ref = React.useRef(null);
  const selected = options.find((o) => o.value === current);

  React.useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const pick = (val) => {
    if (!isControlled) setInternal(val);
    onChange && onChange(val);
    setOpen(false);
  };

  return (
    <div className={`slds2-combobox ${className}`} style={{ ...style }} ref={ref}>
      {label && <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-2)" }}>{label}</label>}
      <div style={{ position: "relative" }}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          style={{
            display: "flex", alignItems: "center", width: "100%",
            height: "2rem", padding: "0 0.5rem 0 0.75rem",
            font: "inherit", fontSize: "var(--slds-g-text-body-regular)",
            textAlign: "left",
            color: selected ? "var(--slds-g-color-on-surface-1)" : "var(--slds-g-color-on-surface-3)",
            background: "var(--slds-g-color-surface-container-1)",
            border: `1px solid ${open ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-2)"}`,
            borderRadius: "var(--slds-g-radius-border-3)",
            boxShadow: open ? "var(--slds-g-shadow-focus)" : "none",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selected ? selected.label : placeholder}</span>
          <Icon iconName="utility:chevrondown" size="xx-small" style={{ color: "var(--slds-g-color-on-surface-3)" }} />
        </button>
        {open && (
          <ul role="listbox" style={{
            position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 20,
            margin: 0, padding: "0.25rem", listStyle: "none",
            background: "var(--slds-g-color-surface-container-1)",
            border: "1px solid var(--slds-g-color-border-1)",
            borderRadius: "var(--slds-g-radius-border-3)",
            boxShadow: "var(--slds-g-shadow-4)",
            maxHeight: "12rem", overflowY: "auto",
          }}>
            {options.map((opt) => {
              const on = opt.value === current;
              return (
                <li key={opt.value} role="option" aria-selected={on} onClick={() => pick(opt.value)} style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.5rem 0.625rem", borderRadius: "var(--slds-g-radius-border-2)",
                  fontSize: "var(--slds-g-text-body-regular)",
                  color: "var(--slds-g-color-on-surface-1)",
                  background: on ? "var(--slds-g-color-surface-3)" : "transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "var(--slds-g-color-surface-3)"; }}
                onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ width: 16, flex: "none" }}>{on && <Icon iconName="utility:check" size="xx-small" variant="brand" />}</span>
                  {opt.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
