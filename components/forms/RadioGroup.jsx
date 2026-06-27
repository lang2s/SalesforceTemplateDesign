import React from "react";

let _gid = 0;

/** SLDS Radio Group — pick one of a small set of options. */
export function RadioGroup({ label, options = [], value, defaultValue, onChange, name, disabled = false, className = "", style = {} }) {
  const groupName = React.useMemo(() => name || `slds2-radio-${++_gid}`, [name]);
  const [internal, setInternal] = React.useState(defaultValue ?? (options[0] && options[0].value));
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const pick = (val) => {
    if (!isControlled) setInternal(val);
    onChange && onChange(val);
  };
  return (
    <fieldset className={`slds2-radio-group ${className}`} style={{ border: 0, margin: 0, padding: 0, ...style }}>
      {label && <legend style={{ padding: 0, marginBottom: "0.375rem", fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-2)" }}>{label}</legend>}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {options.map((opt) => {
          const on = current === opt.value;
          return (
            <label key={opt.value} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}>
              <input type="radio" name={groupName} checked={on} onChange={() => pick(opt.value)} disabled={disabled} style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} />
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "1rem", height: "1rem", flex: "none",
                background: "var(--slds-g-color-surface-container-1)",
                border: `1px solid ${on ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-3)"}`,
                borderRadius: "50%",
              }}>
                {on && <span style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "var(--slds-g-color-accent-1)" }} />}
              </span>
              <span style={{ fontSize: "var(--slds-g-text-body-regular)", color: "var(--slds-g-color-on-surface-1)" }}>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
