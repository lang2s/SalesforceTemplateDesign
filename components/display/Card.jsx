import React from "react";
import { Icon } from "./Icon.jsx";

export function Card({
  title,
  iconName,
  actions,
  footer,
  children,
  className = "",
  style = {},
}) {
  return (
    <article
      className={`slds2-card ${className}`}
      style={{
        background: "var(--slds-g-color-surface-container-1)",
        border: "1px solid var(--slds-g-color-border-1)",
        borderRadius: "var(--slds-g-radius-border-4)",
        boxShadow: "var(--slds-g-shadow-2)",
        overflow: "hidden",
        ...style,
      }}
    >
      {(title || actions) && (
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1rem",
          }}
        >
          {iconName && <Icon iconName={iconName} size="small" />}
          <h2
            style={{
              flex: 1,
              margin: 0,
              fontSize: "var(--slds-g-text-heading-small)",
              fontWeight: "var(--slds-g-font-weight-bold)",
              color: "var(--slds-g-color-on-surface-1)",
            }}
          >
            {title}
          </h2>
          {actions && <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>{actions}</div>}
        </header>
      )}
      <div style={{ padding: "0 1rem 1rem" }}>{children}</div>
      {footer && (
        <footer
          style={{
            padding: "0.75rem 1rem",
            borderTop: "1px solid var(--slds-g-color-border-1)",
            fontSize: "var(--slds-g-text-body-small)",
            color: "var(--slds-g-color-on-surface-3)",
            textAlign: "center",
          }}
        >
          {footer}
        </footer>
      )}
    </article>
  );
}
