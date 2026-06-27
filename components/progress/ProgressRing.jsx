import React from "react";

/** SLDS Progress Ring — a circular completion indicator (0–100). */
export function ProgressRing({ value = 0, size = 32, variant = "base", showValue = false, className = "", style = {} }) {
  const pct = Math.max(0, Math.min(100, value));
  const stroke = Math.max(3, Math.round(size * 0.1));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  const color =
    variant === "success" ? "var(--slds-g-color-success-1)" :
    variant === "warning" ? "var(--slds-g-color-warning-1)" :
    variant === "error" ? "var(--slds-g-color-error-1)" :
    "var(--slds-g-color-accent-1)";

  return (
    <div className={`slds2-progress-ring ${className}`} style={{ position: "relative", width: size, height: size, display: "inline-flex", ...style }} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--slds-g-color-surface-3)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset var(--slds-g-duration-promptly) var(--slds-g-ease-out)" }}
        />
      </svg>
      {showValue && (
        <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: Math.max(9, Math.round(size * 0.26)), fontWeight: "var(--slds-g-font-weight-semibold)", color: "var(--slds-g-color-on-surface-1)" }}>
          {Math.round(pct)}
        </span>
      )}
    </div>
  );
}
