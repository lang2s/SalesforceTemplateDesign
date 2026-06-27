import React from "react";
import { Icon } from "../display/Icon.jsx";

const THEMES = {
  info:    { bg: "var(--slds-g-color-palette-cloud-blue-50)", icon: "utility:info",    fg: "#fff" },
  success: { bg: "var(--slds-g-color-success-1)",             icon: "utility:success", fg: "#fff" },
  warning: { bg: "var(--slds-g-color-warning-1)",             icon: "utility:warning", fg: "var(--slds-g-color-palette-neutral-10)" },
  error:   { bg: "var(--slds-g-color-error-1)",               icon: "utility:error",   fg: "#fff" },
};

/** SLDS Alert — a full-width, persistent notification bar pinned in context. */
export function Alert({
  variant = "info",
  children,
  iconName,
  onClose,
  className = "",
  style = {},
}) {
  const t = THEMES[variant] || THEMES.info;
  return (
    <div
      role="alert"
      className={`slds2-alert ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.625rem",
        width: "100%",
        padding: "0.5rem 0.875rem",
        background: t.bg,
        color: t.fg,
        fontSize: "var(--slds-g-text-body-regular)",
        ...style,
      }}
    >
      <Icon iconName={iconName || t.icon} size="x-small" filled style={{ color: t.fg, flex: "none" }} />
      <div style={{ flex: 1, lineHeight: 1.4 }}>{children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "1.25rem",
            height: "1.25rem",
            flex: "none",
            padding: 0,
            border: 0,
            background: "transparent",
            color: t.fg,
            cursor: "pointer",
            opacity: 0.85,
          }}
        >
          <Icon iconName="utility:close" size="xx-small" style={{ color: "inherit", fontSize: 14 }} />
        </button>
      )}
    </div>
  );
}
