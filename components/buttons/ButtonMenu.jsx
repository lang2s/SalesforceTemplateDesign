import React from "react";
import { Icon } from "../display/Icon.jsx";

/**
 * SLDS Button Menu — a button that opens a dropdown of menu items.
 * Items: { label, iconName, onClick } | { divider: true } | { subheader: "…" }.
 */
export function ButtonMenu({
  label,
  iconName = "utility:down",
  items = [],
  align = "left",
  variant = "border",
  className = "",
  style = {},
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const bordered = variant === "border";
  return (
    <div ref={ref} className={`slds2-button-menu ${className}`} style={{ position: "relative", display: "inline-block", ...style }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          height: "2rem",
          padding: label ? "0 0.75rem" : "0 0.5rem",
          minWidth: label ? "auto" : "2rem",
          justifyContent: "center",
          font: "inherit",
          fontSize: "var(--slds-g-text-body-regular)",
          fontWeight: "var(--slds-g-font-weight-semibold)",
          color: "var(--slds-g-color-accent-1)",
          background: "var(--slds-g-color-surface-container-1)",
          border: bordered ? "1px solid var(--slds-g-color-border-2)" : "1px solid transparent",
          borderRadius: "var(--slds-g-radius-border-3)",
          cursor: "pointer",
        }}
      >
        {label}
        <Icon iconName={iconName} size="xx-small" style={{ color: "var(--slds-g-color-on-surface-3)" }} />
      </button>
      {open && (
        <ul
          role="menu"
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            [align]: 0,
            zIndex: 30,
            minWidth: "12rem",
            margin: 0,
            padding: "0.25rem",
            listStyle: "none",
            background: "var(--slds-g-color-surface-container-1)",
            border: "1px solid var(--slds-g-color-border-1)",
            borderRadius: "var(--slds-g-radius-border-3)",
            boxShadow: "var(--slds-g-shadow-4)",
          }}
        >
          {items.map((it, i) => {
            if (it.divider) return <li key={i} role="separator" style={{ height: 1, margin: "0.25rem 0", background: "var(--slds-g-color-border-1)" }} />;
            if (it.subheader) return <li key={i} style={{ padding: "0.375rem 0.625rem 0.25rem", fontSize: "var(--slds-g-text-body-small)", fontWeight: "var(--slds-g-font-weight-bold)", textTransform: "uppercase", letterSpacing: ".04em", color: "var(--slds-g-color-on-surface-3)" }}>{it.subheader}</li>;
            return (
              <li
                key={i}
                role="menuitem"
                onClick={() => { it.onClick && it.onClick(); setOpen(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 0.625rem",
                  borderRadius: "var(--slds-g-radius-border-2)",
                  fontSize: "var(--slds-g-text-body-regular)",
                  color: it.destructive ? "var(--slds-g-color-error-1)" : "var(--slds-g-color-on-surface-1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--slds-g-color-surface-3)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {it.iconName && <Icon iconName={it.iconName} size="x-small" style={{ color: "inherit", flex: "none" }} />}
                <span style={{ flex: 1 }}>{it.label}</span>
                {it.checked && <Icon iconName="utility:check" size="xx-small" variant="brand" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
