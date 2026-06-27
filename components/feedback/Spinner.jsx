import React from "react";

const SIZES = { "x-small": 16, small: 20, medium: 28, large: 40 };

/** SLDS Spinner — a circular brand loading indicator. */
export function Spinner({ size = "medium", inverse = false, className = "", style = {} }) {
  const dim = SIZES[size] || SIZES.medium;
  const track = inverse ? "rgba(255,255,255,0.3)" : "var(--slds-g-color-border-2)";
  const head = inverse ? "#fff" : "var(--slds-g-color-accent-1)";
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`slds2-spinner ${className}`}
      style={{
        display: "inline-block",
        width: dim,
        height: dim,
        border: `${Math.max(2, Math.round(dim / 10))}px solid ${track}`,
        borderTopColor: head,
        borderRadius: "50%",
        animation: "slds2-spin 0.8s linear infinite",
        ...style,
      }}
    >
      <style>{`@keyframes slds2-spin{to{transform:rotate(360deg)}}`}</style>
    </span>
  );
}
