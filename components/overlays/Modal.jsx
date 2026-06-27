import React from "react";
import { Icon } from "../display/Icon.jsx";

const SIZES = {
  small: "30rem",
  medium: "40rem",
  large: "52rem",
};

/** SLDS Modal — a focused dialog over a dimmed backdrop. */
export function Modal({
  isOpen = true,
  onClose,
  title,
  tagline,
  size = "medium",
  footer,
  children,
  className = "",
  style = {},
}) {
  if (!isOpen) return null;
  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "4rem 1rem",
        background: "rgba(24, 24, 24, 0.55)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        onClick={(e) => e.stopPropagation()}
        className={`slds2-modal ${className}`}
        style={{
          width: "100%",
          maxWidth: SIZES[size] || SIZES.medium,
          maxHeight: "calc(100vh - 8rem)",
          display: "flex",
          flexDirection: "column",
          background: "var(--slds-g-color-surface-container-1)",
          borderRadius: "var(--slds-g-radius-border-5)",
          boxShadow: "var(--slds-g-shadow-4)",
          overflow: "hidden",
          ...style,
        }}
      >
        {/* Header */}
        {(title || onClose) && (
          <div
            style={{
              position: "relative",
              padding: "1.25rem 3rem 1rem 1.5rem",
              borderBottom: "1px solid var(--slds-g-color-border-1)",
            }}
          >
            {title && (
              <h2
                style={{
                  fontSize: "var(--slds-g-text-heading-large)",
                  fontWeight: "var(--slds-g-font-weight-bold)",
                  color: "var(--slds-g-color-on-surface-1)",
                  margin: 0,
                }}
              >
                {title}
              </h2>
            )}
            {tagline && (
              <p
                style={{
                  marginTop: "0.25rem",
                  fontSize: "var(--slds-g-text-body-small)",
                  color: "var(--slds-g-color-on-surface-3)",
                }}
              >
                {tagline}
              </p>
            )}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2rem",
                  height: "2rem",
                  padding: 0,
                  border: 0,
                  borderRadius: "var(--slds-g-radius-border-circle)",
                  background: "transparent",
                  color: "var(--slds-g-color-on-surface-2)",
                  cursor: "pointer",
                }}
              >
                <Icon iconName="utility:close" size="x-small" style={{ color: "inherit" }} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1.5rem",
            fontSize: "var(--slds-g-text-body-regular)",
            lineHeight: "var(--slds-g-font-lineheight-body)",
            color: "var(--slds-g-color-on-surface-1)",
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.75rem",
              padding: "0.875rem 1.5rem",
              borderTop: "1px solid var(--slds-g-color-border-1)",
              background: "var(--slds-g-color-surface-2)",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
