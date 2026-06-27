import React from "react";
import { Icon } from "../display/Icon.jsx";

/**
 * SLDS Button Stateful — a toggle button that flips between two states,
 * e.g. Follow → Following (with a hover "Unfollow" affordance).
 */
export function ButtonStateful({
  selected: controlled,
  defaultSelected = false,
  onChange,
  labelWhenOff = "Follow",
  labelWhenOn = "Following",
  labelWhenHover = "Unfollow",
  iconNameWhenOff = "utility:add",
  iconNameWhenOn = "utility:check",
  className = "",
  style = {},
}) {
  const isControlled = controlled !== undefined;
  const [internal, setInternal] = React.useState(defaultSelected);
  const [hover, setHover] = React.useState(false);
  const selected = isControlled ? controlled : internal;

  const toggle = () => {
    if (!isControlled) setInternal((s) => !s);
    onChange && onChange(!selected);
  };

  const label = selected ? (hover ? labelWhenHover : labelWhenOn) : labelWhenOff;
  const icon = selected ? iconNameWhenOn : iconNameWhenOff;

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={toggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`slds2-button-stateful ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        height: "2rem",
        padding: "0 0.875rem",
        font: "inherit",
        fontSize: "var(--slds-g-text-body-regular)",
        fontWeight: "var(--slds-g-font-weight-semibold)",
        color: selected ? "var(--slds-g-color-on-accent-1)" : "var(--slds-g-color-accent-1)",
        background: selected ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-surface-container-1)",
        border: "1px solid var(--slds-g-color-accent-1)",
        borderRadius: "var(--slds-g-radius-border-3)",
        cursor: "pointer",
        minWidth: "6.5rem",
        justifyContent: "center",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <Icon iconName={icon} size="x-small" style={{ color: "inherit" }} />
      {label}
    </button>
  );
}
