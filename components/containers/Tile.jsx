import React from "react";
import { Icon } from "../display/Icon.jsx";

/**
 * SLDS Tile — a compact summary block for a record in a list/related panel.
 * Title (optional link), optional leading avatar/icon, meta lines, actions.
 */
export function Tile({ title, href, onTitleClick, iconName, avatar, meta = [], actions, children, className = "", style = {} }) {
  return (
    <article
      className={`slds2-tile ${className}`}
      style={{
        display: "flex",
        gap: "0.625rem",
        padding: "0.75rem",
        background: "var(--slds-g-color-surface-container-1)",
        border: "1px solid var(--slds-g-color-border-1)",
        borderRadius: "var(--slds-g-radius-border-3)",
        ...style,
      }}
    >
      {(iconName || avatar) && (
        <div style={{ flex: "none", paddingTop: 1 }}>
          {avatar || <Icon iconName={iconName} size="small" />}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {href || onTitleClick ? (
              <a href={href || "#"} onClick={onTitleClick} style={{ fontSize: "var(--slds-g-text-body-regular)", fontWeight: "var(--slds-g-font-weight-semibold)", color: "var(--slds-g-color-accent-1)", textDecoration: "none" }}>{title}</a>
            ) : (
              <span style={{ fontSize: "var(--slds-g-text-body-regular)", fontWeight: "var(--slds-g-font-weight-semibold)", color: "var(--slds-g-color-on-surface-1)" }}>{title}</span>
            )}
          </div>
          {actions && <div style={{ flex: "none" }}>{actions}</div>}
        </div>
        {meta.length > 0 && (
          <dl style={{ margin: "0.25rem 0 0", display: "grid", gridTemplateColumns: "auto 1fr", columnGap: "0.5rem", rowGap: "0.125rem" }}>
            {meta.map((m, i) => (
              <React.Fragment key={i}>
                <dt style={{ fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-3)" }}>{m.label}</dt>
                <dd style={{ margin: 0, fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-2)" }}>{m.value}</dd>
              </React.Fragment>
            ))}
          </dl>
        )}
        {children}
      </div>
    </article>
  );
}
