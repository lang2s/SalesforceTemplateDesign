import React from "react";

/** SLDS Progress Bar — a horizontal indicator of completion (0–100). */
export function ProgressBar({ value = 0, size = "medium", variant = "base", showValue = false, label, className = "", style = {} }) {
  const pct = Math.max(0, Math.min(100, value));
  const height = size === "small" ? 4 : size === "large" ? 12 : 8;
  const fill =
    variant === "success" ? "var(--slds-g-color-success-1)" :
    variant === "warning" ? "var(--slds-g-color-warning-1)" :
    "var(--slds-g-color-accent-1)";

  return (
    <div className={`slds2-progress-bar ${className}`} style={style}>
      {(label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
          {label && <span style={{ fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-2)" }}>{label}</span>}
          {showValue && <span style={{ fontSize: "var(--slds-g-text-body-small)", fontWeight: "var(--slds-g-font-weight-semibold)", color: "var(--slds-g-color-on-surface-1)" }}>{pct}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ width: "100%", height, background: "var(--slds-g-color-surface-3)", borderRadius: "var(--slds-g-radius-border-pill)", overflow: "hidden" }}
      >
        <div style={{ width: `${pct}%`, height: "100%", background: fill, borderRadius: "var(--slds-g-radius-border-pill)", transition: "width var(--slds-g-duration-promptly) var(--slds-g-ease-out)" }} />
      </div>
    </div>
  );
}
