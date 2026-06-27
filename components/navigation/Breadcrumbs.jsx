import React from "react";

/** SLDS Breadcrumbs — hierarchy trail above a record or list view. */
export function Breadcrumbs({ items = [], className = "", style = {} }) {
  return (
    <nav aria-label="Breadcrumbs" className={`slds2-breadcrumbs ${className}`} style={style}>
      <ol
        style={{
          listStyle: "none",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.25rem",
          margin: 0,
          padding: 0,
        }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              {isLast ? (
                <span
                  aria-current="page"
                  style={{
                    fontSize: "var(--slds-g-text-body-small)",
                    color: "var(--slds-g-color-on-surface-3)",
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href || "#"}
                  onClick={item.onClick}
                  style={{
                    fontSize: "var(--slds-g-text-body-small)",
                    color: "var(--slds-g-color-accent-1)",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </a>
              )}
              {!isLast && (
                <span
                  aria-hidden="true"
                  style={{
                    color: "var(--slds-g-color-on-surface-3)",
                    fontSize: "var(--slds-g-text-body-small)",
                    userSelect: "none",
                  }}
                >
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
