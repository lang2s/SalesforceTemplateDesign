import React from "react";
import { Icon } from "../display/Icon.jsx";

let _id = 0;

export function Input({
  label,
  value,
  defaultValue,
  onChange,
  type = "text",
  placeholder,
  required = false,
  readOnly = false,
  disabled = false,
  error,
  iconName,
  className = "",
  style = {},
  ...rest
}) {
  const id = React.useMemo(() => `slds2-input-${++_id}`, []);
  const invalid = Boolean(error);
  const [focus, setFocus] = React.useState(false);

  const fieldStyle = {
    width: "100%",
    height: "2rem",
    padding: iconName ? "0 0.75rem 0 2rem" : "0 0.75rem",
    font: "inherit",
    fontSize: "var(--slds-g-text-body-regular)",
    color: "var(--slds-g-color-on-surface-1)",
    background: readOnly ? "transparent" : "var(--slds-g-color-surface-container-1)",
    border: readOnly ? "1px solid transparent" : `1px solid ${invalid ? "var(--slds-g-color-error-1)" : "var(--slds-g-color-border-2)"}`,
    borderRadius: "var(--slds-g-radius-border-3)",
    outline: "none",
    boxShadow: focus && !readOnly ? "var(--slds-g-shadow-focus)" : "none",
    transition: "box-shadow var(--slds-g-duration-quickly) var(--slds-g-ease-out)",
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <div className={`slds2-form-element ${className}`} style={style}>
      {label && (
        <label htmlFor={id} style={{
          display: "block",
          marginBottom: "0.25rem",
          fontSize: "var(--slds-g-text-body-small)",
          color: "var(--slds-g-color-on-surface-2)",
        }}>
          {required && !readOnly && <abbr title="required" style={{ color: "var(--slds-g-color-error-1)", textDecoration: "none", marginRight: 2 }}>*</abbr>}
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        {iconName && (
          <Icon iconName={iconName} size="x-small" style={{ position: "absolute", left: "0.5rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
        )}
        <input
          id={id}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          aria-invalid={invalid}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={fieldStyle}
          {...rest}
        />
      </div>
      {invalid && (
        <p style={{ margin: "0.25rem 0 0", fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-error-1)" }}>{error}</p>
      )}
    </div>
  );
}
