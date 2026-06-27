import React from "react";

const VARIANTS = {
  default: { bg: "var(--slds-g-color-surface-3)", fg: "var(--slds-g-color-on-surface-2)" },
  inverse: { bg: "var(--slds-g-color-surface-inverse-1)", fg: "var(--slds-g-color-on-surface-inverse-1)" },
  brand: { bg: "var(--slds-g-color-accent-container-1)", fg: "var(--slds-g-color-accent-foreground-1)" },
  success: { bg: "var(--slds-g-color-success-container-1)", fg: "var(--slds-g-color-palette-green-60)" },
  warning: { bg: "var(--slds-g-color-warning-container-1)", fg: "var(--slds-g-color-palette-orange-60)" },
  error: { bg: "var(--slds-g-color-error-container-1)", fg: "var(--slds-g-color-palette-red-60)" },
};

export function Badge({ label, children, variant = "default", className = "", style = {} }) {
  const v = VARIANTS[variant] || VARIANTS.default;
  return (
    <span
      className={`slds2-badge ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: "1.25rem",
        padding: "0 0.5rem",
        fontSize: "var(--slds-g-font-scale-neg-1)",
        fontWeight: "var(--slds-g-font-weight-semibold)",
        lineHeight: 1,
        color: v.fg,
        background: v.bg,
        borderRadius: "var(--slds-g-radius-border-pill)",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {label ?? children}
    </span>
  );
}
