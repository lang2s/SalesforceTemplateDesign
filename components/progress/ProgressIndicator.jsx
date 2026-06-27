import React from "react";
import { Icon } from "../display/Icon.jsx";

/**
 * SLDS Progress Indicator.
 * - variant="base": dotted track with circular step markers (setup flows).
 * - variant="path": the Salesforce "Path" — chevron stages for sales/case
 *   progress; completed = brand, current = darker brand, upcoming = gray.
 */
export function ProgressIndicator({
  steps = [],
  current = 0,
  variant = "base",
  className = "",
  style = {},
}) {
  if (variant === "path") {
    return (
      <ol
        className={`slds2-path ${className}`}
        style={{ display: "flex", listStyle: "none", margin: 0, padding: 0, gap: "2px", ...style }}
      >
        {steps.map((label, i) => {
          const done = i < current;
          const active = i === current;
          const bg = done
            ? "var(--slds-g-color-accent-1)"
            : active
            ? "var(--slds-g-color-accent-3)"
            : "var(--slds-g-color-surface-3)";
          const fg = done || active ? "#fff" : "var(--slds-g-color-on-surface-2)";
          return (
            <li
              key={i}
              style={{
                position: "relative",
                flex: 1,
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.375rem",
                height: "2rem",
                padding: "0 0.5rem 0 1.25rem",
                background: bg,
                color: fg,
                fontSize: "var(--slds-g-text-body-small)",
                fontWeight: active
                  ? "var(--slds-g-font-weight-bold)"
                  : "var(--slds-g-font-weight-medium)",
                clipPath:
                  "polygon(0 0, calc(100% - 0.9rem) 0, 100% 50%, calc(100% - 0.9rem) 100%, 0 100%, 0.9rem 50%)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {done && <Icon iconName="utility:check" size="xx-small" style={{ color: "#fff", fontSize: 13 }} />}
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
            </li>
          );
        })}
      </ol>
    );
  }

  // base variant — circles on a connecting track
  return (
    <div
      className={`slds2-progress ${className}`}
      style={{ position: "relative", display: "flex", alignItems: "center", padding: "0 0.75rem", ...style }}
    >
      {/* track */}
      <div
        style={{
          position: "absolute",
          left: "1.25rem",
          right: "1.25rem",
          height: 2,
          background: "var(--slds-g-color-border-2)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "1.25rem",
          height: 2,
          width: steps.length > 1 ? `calc((100% - 2.5rem) * ${current / (steps.length - 1)})` : 0,
          background: "var(--slds-g-color-accent-1)",
          transition: "width var(--slds-g-duration-promptly) var(--slds-g-ease-out)",
        }}
      />
      <ol style={{ position: "relative", display: "flex", justifyContent: "space-between", width: "100%", listStyle: "none", margin: 0, padding: 0 }}>
        {steps.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
              <span
                title={typeof label === "string" ? label : undefined}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "1rem",
                  height: "1rem",
                  borderRadius: "var(--slds-g-radius-border-circle)",
                  background: done
                    ? "var(--slds-g-color-accent-1)"
                    : "var(--slds-g-color-surface-container-1)",
                  border: `2px solid ${
                    done || active ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-2)"
                  }`,
                  boxShadow: active ? "var(--slds-g-shadow-focus)" : "none",
                }}
              >
                {done && <Icon iconName="utility:check" size="xx-small" style={{ color: "#fff", fontSize: 10 }} />}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
