import React from "react";
import { Icon } from "./Icon.jsx";

/**
 * SLDS Empty State / Illustration — a centered message shown when there's no
 * data, no results, or an error, with an icon and optional action.
 */
export function EmptyState({ iconName = "standard:empty", title, message, action, size = "medium", className = "", style = {} }) {
  const pad = size === "small" ? "1.5rem 1rem" : "3rem 1.5rem";
  return (
    <div
      className={`slds2-empty-state ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: pad,
        ...style,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size === "small" ? "3rem" : "4rem",
          height: size === "small" ? "3rem" : "4rem",
          borderRadius: "var(--slds-g-radius-border-circle)",
          background: "var(--slds-g-color-surface-3)",
          marginBottom: "1rem",
        }}
      >
        <Icon iconName={iconName} size="large" style={{ color: "var(--slds-g-color-on-surface-3)" }} />
      </div>
      {title && (
        <h3 style={{ fontSize: "var(--slds-g-text-heading-medium)", fontWeight: "var(--slds-g-font-weight-bold)", color: "var(--slds-g-color-on-surface-1)", margin: 0 }}>{title}</h3>
      )}
      {message && (
        <p style={{ marginTop: "0.375rem", maxWidth: "26rem", fontSize: "var(--slds-g-text-body-regular)", color: "var(--slds-g-color-on-surface-3)" }}>{message}</p>
      )}
      {action && <div style={{ marginTop: "1.25rem" }}>{action}</div>}
    </div>
  );
}
