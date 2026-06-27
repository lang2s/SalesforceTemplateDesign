import React from "react";
import { Icon } from "../display/Icon.jsx";

/**
 * SLDS Vertical Navigation — a sidebar nav with optional sections, per-item
 * icons and count badges, and a selected state.
 * sections: [{ label?, items: [{ id, label, iconName, badge }] }]
 */
export function VerticalNavigation({ sections = [], value, defaultValue, onSelect, className = "", style = {} }) {
  const firstId = sections[0] && sections[0].items[0] && sections[0].items[0].id;
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? firstId);
  const current = isControlled ? value : internal;

  const pick = (id) => { if (!isControlled) setInternal(id); onSelect && onSelect(id); };

  return (
    <nav className={`slds2-vertical-nav ${className}`} style={{ minWidth: "12rem", ...style }}>
      {sections.map((sec, si) => (
        <div key={si} style={{ marginBottom: "1rem" }}>
          {sec.label && (
            <div style={{ padding: "0 0.75rem 0.375rem", fontSize: "var(--slds-g-text-body-small)", fontWeight: "var(--slds-g-font-weight-bold)", textTransform: "uppercase", letterSpacing: ".04em", color: "var(--slds-g-color-on-surface-3)" }}>{sec.label}</div>
          )}
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {sec.items.map((it) => {
              const on = it.id === current;
              return (
                <li key={it.id}>
                  <a
                    href={it.href || "#"}
                    onClick={(e) => { if (!it.href) e.preventDefault(); pick(it.id); it.onClick && it.onClick(); }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 0.75rem",
                      borderLeft: `3px solid ${on ? "var(--slds-g-color-accent-1)" : "transparent"}`,
                      background: on ? "var(--slds-g-color-surface-3)" : "transparent",
                      color: on ? "var(--slds-g-color-on-surface-1)" : "var(--slds-g-color-on-surface-2)",
                      fontSize: "var(--slds-g-text-body-regular)",
                      fontWeight: on ? "var(--slds-g-font-weight-semibold)" : "var(--slds-g-font-weight-regular)",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "var(--slds-g-color-surface-2)"; }}
                    onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = "transparent"; }}
                  >
                    {it.iconName && <Icon iconName={it.iconName} size="x-small" style={{ color: "inherit", flex: "none" }} />}
                    <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.label}</span>
                    {it.badge != null && (
                      <span style={{ flex: "none", fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-3)" }}>{it.badge}</span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
