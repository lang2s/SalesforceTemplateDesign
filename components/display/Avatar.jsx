import React from "react";
import { Icon } from "./Icon.jsx";

const SIZES = { "x-small": 20, small: 24, medium: 32, large: 48, "x-large": 64 };

export function Avatar({
  src,
  initials,
  iconName = "standard:user",
  size = "medium",
  variant = "circle",
  alt = "",
  className = "",
  style = {},
}) {
  const dim = SIZES[size] || SIZES.medium;
  const radius = variant === "circle" ? "var(--slds-g-radius-border-circle)" : "var(--slds-g-radius-border-3)";
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: dim,
    height: dim,
    borderRadius: radius,
    overflow: "hidden",
    flex: "none",
    ...style,
  };

  if (src) {
    return <img className={className} src={src} alt={alt} style={{ ...base, objectFit: "cover" }} />;
  }
  if (initials) {
    return (
      <span
        className={className}
        style={{
          ...base,
          background: "var(--slds-g-color-palette-blue-60)",
          color: "#fff",
          fontSize: Math.round(dim * 0.4),
          fontWeight: "var(--slds-g-font-weight-semibold)",
          letterSpacing: ".02em",
        }}
      >
        {initials}
      </span>
    );
  }
  return (
    <span className={className} style={{ ...base }}>
      <Icon iconName={iconName} size={dim >= 48 ? "large" : "small"} />
    </span>
  );
}
