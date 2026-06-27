import React from "react";
import { Icon } from "./Icon.jsx";

/**
 * SLDS Helptext — a small info "?" icon that reveals a tooltip on hover/focus.
 */
export function Helptext({ content, iconName = "utility:info", align = "top", className = "", style = {} }) {
  const [show, setShow] = React.useState(false);

  const pos =
    align === "bottom"
      ? { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" }
      : align === "left"
      ? { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }
      : align === "right"
      ? { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }
      : { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" };

  return (
    <span
      className={`slds2-helptext ${className}`}
      style={{ position: "relative", display: "inline-flex", ...style }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      tabIndex={0}
      role="button"
      aria-label="Help"
    >
      <Icon iconName={iconName} size="x-small" style={{ color: "var(--slds-g-color-on-surface-3)", cursor: "help" }} />
      {show && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            ...pos,
            zIndex: 40,
            width: "max-content",
            maxWidth: "16rem",
            padding: "0.5rem 0.625rem",
            fontSize: "var(--slds-g-text-body-small)",
            lineHeight: 1.4,
            color: "var(--slds-g-color-on-surface-inverse-1)",
            background: "var(--slds-g-color-surface-inverse-1)",
            borderRadius: "var(--slds-g-radius-border-2)",
            boxShadow: "var(--slds-g-shadow-3)",
            textAlign: "left",
          }}
        >
          {content}
        </span>
      )}
    </span>
  );
}
