import React from "react";

let _tid = 0;

/** SLDS Textarea — a multi-line text input matching SLDS form styling. */
export function Textarea({ label, value, defaultValue, onChange, placeholder, rows = 3, required = false, disabled = false, error, className = "", style = {}, ...rest }) {
  const id = React.useMemo(() => `slds2-textarea-${++_tid}`, []);
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
      <textarea
        id={id}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          font: "inherit",
          fontSize: "var(--slds-g-text-body-regular)",
          lineHeight: "var(--slds-g-font-lineheight-body)",
          color: "var(--slds-g-color-on-surface-1)",
          background: "var(--slds-g-color-surface-container-1)",
          border: `1px solid ${invalid ? "var(--slds-g-color-error-1)" : "var(--slds-g-color-border-2)"}`,
          borderRadius: "var(--slds-g-radius-border-3)",
          outline: "none",
          resize: "vertical",
          boxShadow: focus ? "var(--slds-g-shadow-focus)" : "none",
          opacity: disabled ? 0.5 : 1,
        }}
        {...rest}
      />
      {invalid && <p style={{ margin: "0.25rem 0 0", fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-error-1)" }}>{error}</p>}
    </div>
  );
}
