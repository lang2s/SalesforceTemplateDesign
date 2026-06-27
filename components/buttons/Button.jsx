import React from "react";
import { Icon } from "../display/Icon.jsx";

/* SLDS button variants → token-driven styles. */
const VARIANTS = {
  neutral: {
    "--_bg": "var(--slds-g-color-surface-container-1)",
    "--_bg-hover": "var(--slds-g-color-surface-3)",
    "--_fg": "var(--slds-g-color-accent-1)",
    "--_bd": "var(--slds-g-color-border-2)",
  },
  brand: {
    "--_bg": "var(--slds-g-color-accent-1)",
    "--_bg-hover": "var(--slds-g-color-accent-2)",
    "--_fg": "var(--slds-g-color-on-accent-1)",
    "--_bd": "var(--slds-g-color-accent-1)",
  },
  "outline-brand": {
    "--_bg": "var(--slds-g-color-surface-container-1)",
    "--_bg-hover": "var(--slds-g-color-accent-container-1)",
    "--_fg": "var(--slds-g-color-accent-1)",
    "--_bd": "var(--slds-g-color-accent-1)",
  },
  destructive: {
    "--_bg": "var(--slds-g-color-error-1)",
    "--_bg-hover": "var(--slds-g-color-error-2)",
    "--_fg": "var(--slds-g-color-on-error-1)",
    "--_bd": "var(--slds-g-color-error-1)",
  },
  success: {
    "--_bg": "var(--slds-g-color-success-1)",
    "--_bg-hover": "var(--slds-g-color-palette-green-60)",
    "--_fg": "var(--slds-g-color-on-success-1)",
    "--_bd": "var(--slds-g-color-success-1)",
  },
  text: {
    "--_bg": "transparent",
    "--_bg-hover": "var(--slds-g-color-surface-3)",
    "--_fg": "var(--slds-g-color-accent-1)",
    "--_bd": "transparent",
  },
};

export function Button({
  label,
  children,
  variant = "neutral",
  size = "medium",
  iconName,
  iconPosition = "left",
  disabled = false,
  stretch = false,
  type = "button",
  onClick,
  className = "",
  style = {},
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.neutral;
  const pad = size === "small" ? "0 0.75rem" : "0 1rem";
  const height = size === "small" ? "1.75rem" : "2rem";
  const content = label ?? children;
  const icon = iconName ? (
    <Icon iconName={iconName} size="x-small" variant="inverse" style={{ color: "inherit" }} />
  ) : null;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`slds2-button ${className}`}
      style={{
        ...v,
        display: stretch ? "flex" : "inline-flex",
        width: stretch ? "100%" : "auto",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.375rem",
        height,
        padding: pad,
        font: "inherit",
        fontSize: "var(--slds-g-text-body-regular)",
        fontWeight: "var(--slds-g-font-weight-semibold)",
        lineHeight: 1,
        color: "var(--_fg)",
        background: "var(--_bg)",
        border: "1px solid var(--_bd)",
        borderRadius: "var(--slds-g-radius-border-3)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background var(--slds-g-duration-quickly) var(--slds-g-ease-out), box-shadow var(--slds-g-duration-quickly) var(--slds-g-ease-out)",
        whiteSpace: "nowrap",
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = "var(--_bg-hover)"; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = "var(--_bg)"; }}
      onFocus={(e) => { e.currentTarget.style.boxShadow = "var(--slds-g-shadow-focus)"; }}
      onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
      {...rest}
    >
      {iconName && iconPosition === "left" && icon}
      {content}
      {iconName && iconPosition === "right" && icon}
    </button>
  );
}
