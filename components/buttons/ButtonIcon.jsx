import React from "react";
import { Icon } from "../display/Icon.jsx";

const VARIANTS = {
  border: { bg: "var(--slds-g-color-surface-container-1)", bgHover: "var(--slds-g-color-surface-3)", fg: "var(--slds-g-color-accent-1)", bd: "var(--slds-g-color-border-2)" },
  "border-filled": { bg: "var(--slds-g-color-surface-container-1)", bgHover: "var(--slds-g-color-surface-3)", fg: "var(--slds-g-color-on-surface-2)", bd: "var(--slds-g-color-border-2)" },
  bare: { bg: "transparent", bgHover: "var(--slds-g-color-surface-3)", fg: "var(--slds-g-color-on-surface-3)", bd: "transparent" },
  brand: { bg: "var(--slds-g-color-accent-1)", bgHover: "var(--slds-g-color-accent-2)", fg: "var(--slds-g-color-on-accent-1)", bd: "var(--slds-g-color-accent-1)" },
  container: { bg: "var(--slds-g-color-surface-container-1)", bgHover: "var(--slds-g-color-surface-3)", fg: "var(--slds-g-color-on-surface-3)", bd: "transparent" },
};

const SIZES = { "x-small": "1.5rem", small: "1.75rem", medium: "2rem", large: "2.5rem" };

export function ButtonIcon({
  iconName = "utility:settings",
  variant = "border",
  size = "medium",
  disabled = false,
  title,
  onClick,
  className = "",
  style = {},
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.border;
  const dim = SIZES[size] || SIZES.medium;
  const bare = variant === "bare";
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`slds2-button-icon ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dim,
        height: dim,
        padding: 0,
        color: v.fg,
        background: v.bg,
        border: `1px solid ${v.bd}`,
        borderRadius: bare ? "var(--slds-g-radius-border-2)" : "var(--slds-g-radius-border-3)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background var(--slds-g-duration-quickly) var(--slds-g-ease-out)",
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = v.bgHover; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = v.bg; }}
      onFocus={(e) => { e.currentTarget.style.boxShadow = "var(--slds-g-shadow-focus)"; }}
      onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
      {...rest}
    >
      <Icon iconName={iconName} size={size === "large" ? "small" : "x-small"} style={{ color: "inherit" }} />
    </button>
  );
}
