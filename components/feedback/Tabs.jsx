import React from "react";

/** SLDS Tabs — underlined tab bar for switching views. */
export function Tabs({ tabs = [], value, defaultValue, onChange, className = "", style = {} }) {
  const [internal, setInternal] = React.useState(defaultValue ?? (tabs[0] && tabs[0].value));
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const pick = (val) => {
    if (!isControlled) setInternal(val);
    onChange && onChange(val);
  };
  return (
    <div role="tablist" className={`slds2-tabs ${className}`} style={{
      display: "flex",
      gap: "1.25rem",
      borderBottom: "1px solid var(--slds-g-color-border-1)",
      ...style,
    }}>
      {tabs.map((t) => {
        const on = current === t.value;
        return (
          <button
            key={t.value}
            role="tab"
            aria-selected={on}
            onClick={() => pick(t.value)}
            style={{
              position: "relative",
              padding: "0.625rem 0.125rem",
              font: "inherit",
              fontSize: "var(--slds-g-text-body-regular)",
              fontWeight: on ? "var(--slds-g-font-weight-bold)" : "var(--slds-g-font-weight-regular)",
              color: on ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-on-surface-2)",
              background: "transparent",
              border: 0,
              borderBottom: `2px solid ${on ? "var(--slds-g-color-accent-1)" : "transparent"}`,
              marginBottom: "-1px",
              cursor: "pointer",
              transition: "color var(--slds-g-duration-quickly) var(--slds-g-ease-out)",
            }}
            onMouseEnter={(e) => { if (!on) e.currentTarget.style.color = "var(--slds-g-color-on-surface-1)"; }}
            onMouseLeave={(e) => { if (!on) e.currentTarget.style.color = "var(--slds-g-color-on-surface-2)"; }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
