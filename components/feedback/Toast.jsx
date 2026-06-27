import React from "react";
import { Icon } from "../display/Icon.jsx";

const THEMES = {
  info: { bg: "var(--slds-g-color-palette-cloud-blue-50)", icon: "utility:info" },
  success: { bg: "var(--slds-g-color-success-1)", icon: "utility:success" },
  warning: { bg: "var(--slds-g-color-warning-1)", icon: "utility:warning" },
  error: { bg: "var(--slds-g-color-error-1)", icon: "utility:error" },
};

/** SLDS Toast — a transient confirmation/alert banner. */
export function Toast({ variant = "info", title, message, onClose, className = "", style = {} }) {
  const t = THEMES[variant] || THEMES.info;
  const onWarning = variant === "warning";
  const fg = onWarning ? "var(--slds-g-color-palette-neutral-10)" : "#fff";
  return (
    <div
      role="status"
      className={`slds2-toast ${className}`}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.625rem",
        minWidth: "20rem",
        maxWidth: "32rem",
        padding: "0.625rem 0.75rem",
        background: t.bg,
        color: fg,
        borderRadius: "var(--slds-g-radius-border-3)",
        boxShadow: "var(--slds-g-shadow-4)",
        ...style,
      }}
    >
      <Icon iconName={t.icon} size="small" filled style={{ color: fg, flex: "none", marginTop: 1 }} />
      <div style={{ flex: 1, fontSize: "var(--slds-g-text-body-regular)", lineHeight: 1.4 }}>
        {title && <strong style={{ fontWeight: "var(--slds-g-font-weight-bold)" }}>{title}</strong>}
        {title && message && " "}
        {message}
      </div>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Close" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: "1.25rem", height: "1.25rem", flex: "none",
          padding: 0, border: 0, background: "transparent", color: fg, cursor: "pointer", opacity: 0.85,
        }}>
          <Icon iconName="utility:close" size="xx-small" style={{ color: "inherit", fontSize: 14 }} />
        </button>
      )}
    </div>
  );
}
