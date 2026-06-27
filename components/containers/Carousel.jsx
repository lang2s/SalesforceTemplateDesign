import React from "react";
import { Icon } from "../display/Icon.jsx";

/**
 * SLDS Carousel — cycle through a set of slides with indicator dots and
 * optional arrows. slides: [{ key?, content }] or any React nodes.
 */
export function Carousel({ slides = [], height = 220, showArrows = true, className = "", style = {} }) {
  const [i, setI] = React.useState(0);
  const n = slides.length;
  const go = (next) => setI(((next % n) + n) % n);

  return (
    <div className={`slds2-carousel ${className}`} style={{ position: "relative", ...style }}>
      <div
        style={{
          height,
          borderRadius: "var(--slds-g-radius-border-4)",
          border: "1px solid var(--slds-g-color-border-1)",
          background: "var(--slds-g-color-surface-container-1)",
          overflow: "hidden",
          display: "flex",
        }}
      >
        <div style={{ display: "flex", width: "100%", transform: `translateX(-${i * 100}%)`, transition: "transform var(--slds-g-duration-promptly) var(--slds-g-ease-in-out)" }}>
          {slides.map((s, idx) => (
            <div key={s.key ?? idx} style={{ flex: "0 0 100%", width: "100%", height: "100%" }}>
              {s.content ?? s}
            </div>
          ))}
        </div>
      </div>

      {showArrows && n > 1 && (
        <React.Fragment>
          <button type="button" aria-label="Previous" onClick={() => go(i - 1)} style={arrowStyle("left")}>
            <Icon iconName="utility:chevronleft" size="x-small" style={{ color: "var(--slds-g-color-on-surface-1)" }} />
          </button>
          <button type="button" aria-label="Next" onClick={() => go(i + 1)} style={arrowStyle("right")}>
            <Icon iconName="utility:chevronright" size="x-small" style={{ color: "var(--slds-g-color-on-surface-1)" }} />
          </button>
        </React.Fragment>
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: "0.375rem", marginTop: "0.625rem" }}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Slide ${idx + 1}`}
            onClick={() => setI(idx)}
            style={{
              width: idx === i ? "1.25rem" : "0.5rem",
              height: "0.5rem",
              padding: 0,
              border: 0,
              borderRadius: "var(--slds-g-radius-border-pill)",
              background: idx === i ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-2)",
              cursor: "pointer",
              transition: "width var(--slds-g-duration-quickly) var(--slds-g-ease-out)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function arrowStyle(side) {
  return {
    position: "absolute",
    top: "calc(50% - 1rem - 0.625rem)",
    [side]: "0.5rem",
    transform: "translateY(-50%)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2rem",
    height: "2rem",
    borderRadius: "var(--slds-g-radius-border-circle)",
    background: "var(--slds-g-color-surface-container-1)",
    border: "1px solid var(--slds-g-color-border-1)",
    boxShadow: "var(--slds-g-shadow-2)",
    cursor: "pointer",
  };
}
