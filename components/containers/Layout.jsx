import React from "react";

/**
 * SLDS Layout / Layout Item — a 12-column flex grid.
 * <Layout gutters horizontalAlign="spread">
 *   <LayoutItem size={6}>…</LayoutItem>
 *   <LayoutItem size={6}>…</LayoutItem>
 * </Layout>
 */
export function Layout({ children, gutters = true, wrap = true, horizontalAlign = "start", verticalAlign = "stretch", className = "", style = {} }) {
  const justify = {
    start: "flex-start", center: "center", end: "flex-end",
    spread: "space-between", space: "space-around",
  }[horizontalAlign] || "flex-start";
  const align = {
    start: "flex-start", center: "center", end: "flex-end", stretch: "stretch",
  }[verticalAlign] || "stretch";
  const gap = gutters ? "var(--slds-g-spacing-4)" : "0";

  return (
    <div
      className={`slds2-layout ${className}`}
      style={{ display: "flex", flexWrap: wrap ? "wrap" : "nowrap", gap, justifyContent: justify, alignItems: align, ...style }}
    >
      {children}
    </div>
  );
}

export function LayoutItem({ children, size, flexibility, className = "", style = {} }) {
  const basis = size ? `calc(${(size / 12) * 100}% - var(--slds-g-spacing-4))` : "auto";
  const grow = flexibility === "auto" || flexibility === "grow" ? 1 : 0;
  return (
    <div
      className={`slds2-layout-item ${className}`}
      style={{
        flex: size ? `1 1 ${basis}` : `${grow} 1 auto`,
        minWidth: size ? basis : "auto",
        maxWidth: size ? basis : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
