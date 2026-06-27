import React from "react";
import { Icon } from "./Icon.jsx";

/** SLDS Pill — a removable token for filters, selections, or lookups. */
export function Pill({ label, children, iconName, onRemove, className = "", style = {} }) {
  return (
    <span
      className={`slds2-pill ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        height: "1.5rem",
        padding: iconName ? "0 0.25rem 0 0.375rem" : "0 0.5rem",
        paddingRight: onRemove ? "0.125rem" : undefined,
        background: "var(--slds-g-color-surface-container-1)",
        border: "1px solid var(--slds-g-color-border-2)",
        borderRadius: "var(--slds-g-radius-border-2)",
        fontSize: "var(--slds-g-font-scale-neg-1)",
        color: "var(--slds-g-color-on-surface-1)",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {iconName && <Icon iconName={iconName} size="xx-small" />}
      <span>{label ?? children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "1.125rem",
            height: "1.125rem",
            padding: 0,
            border: 0,
            background: "transparent",
            borderRadius: "var(--slds-g-radius-border-circle)",
            color: "var(--slds-g-color-on-surface-3)",
            cursor: "pointer",
          }}
        >
          <Icon iconName="utility:close" size="xx-small" style={{ color: "inherit", fontSize: 13 }} />
        </button>
      )}
    </span>
  );
}
