import React from "react";
import { Icon } from "../display/Icon.jsx";

/**
 * SLDS Accordion — expand/collapse sections of related content.
 * sections: [{ id, label, content }]. Set allowMultiple to keep several open.
 */
export function Accordion({ sections = [], defaultActive, allowMultiple = false, className = "", style = {} }) {
  const initial = defaultActive != null
    ? (Array.isArray(defaultActive) ? defaultActive : [defaultActive])
    : (sections[0] ? [sections[0].id ?? 0] : []);
  const [open, setOpen] = React.useState(initial);

  const toggle = (key) => {
    setOpen((cur) => {
      const has = cur.includes(key);
      if (allowMultiple) return has ? cur.filter((k) => k !== key) : [...cur, key];
      return has ? [] : [key];
    });
  };

  return (
    <div className={`slds2-accordion ${className}`} style={style}>
      {sections.map((s, i) => {
        const key = s.id ?? i;
        const isOpen = open.includes(key);
        return (
          <div key={key} style={{ borderBottom: "1px solid var(--slds-g-color-border-1)" }}>
            <button
              type="button"
              onClick={() => toggle(key)}
              aria-expanded={isOpen}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                width: "100%",
                padding: "0.75rem 0.25rem",
                font: "inherit",
                fontSize: "var(--slds-g-text-heading-small)",
                fontWeight: "var(--slds-g-font-weight-semibold)",
                color: "var(--slds-g-color-on-surface-1)",
                background: "transparent",
                border: 0,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <Icon
                iconName="utility:chevronright"
                size="xx-small"
                style={{ color: "var(--slds-g-color-on-surface-2)", transition: "transform var(--slds-g-duration-quickly) var(--slds-g-ease-out)", transform: isOpen ? "rotate(90deg)" : "none" }}
              />
              <span style={{ flex: 1 }}>{s.label}</span>
            </button>
            {isOpen && (
              <div style={{ padding: "0 0.25rem 1rem 1.75rem", fontSize: "var(--slds-g-text-body-regular)", lineHeight: "var(--slds-g-font-lineheight-body)", color: "var(--slds-g-color-on-surface-2)" }}>
                {s.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
