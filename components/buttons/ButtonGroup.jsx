import React from "react";
import { Icon } from "../display/Icon.jsx";

/** SLDS Button Group — a set of related buttons joined into a single segmented control. */
export function ButtonGroup({ items = [], value, onChange, className = "", style = {} }) {
  return (
    <div role="group" className={`slds2-button-group ${className}`} style={{ display: "inline-flex", ...style }}>
      {items.map((item, i) => {
        const first = i === 0;
        const last = i === items.length - 1;
        const selected = value !== undefined && item.value === value;
        return (
          <button
            key={item.value ?? i}
            type="button"
            onClick={() => (onChange ? onChange(item.value) : item.onClick && item.onClick())}
            title={item.title || item.label}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              height: "2rem",
              padding: item.label ? "0 0.75rem" : "0 0.5rem",
              marginLeft: first ? 0 : "-1px",
              font: "inherit",
              fontSize: "var(--slds-g-text-body-regular)",
              fontWeight: "var(--slds-g-font-weight-semibold)",
              color: selected ? "var(--slds-g-color-on-accent-1)" : "var(--slds-g-color-accent-1)",
              background: selected ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-surface-container-1)",
              border: "1px solid var(--slds-g-color-border-2)",
              borderTopLeftRadius: first ? "var(--slds-g-radius-border-3)" : 0,
              borderBottomLeftRadius: first ? "var(--slds-g-radius-border-3)" : 0,
              borderTopRightRadius: last ? "var(--slds-g-radius-border-3)" : 0,
              borderBottomRightRadius: last ? "var(--slds-g-radius-border-3)" : 0,
              cursor: "pointer",
              position: "relative",
              zIndex: selected ? 1 : 0,
              whiteSpace: "nowrap",
            }}
          >
            {item.iconName && <Icon iconName={item.iconName} size="x-small" style={{ color: "inherit" }} />}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
