import React from "react";

let _slid = 0;

/** SLDS Slider — a range input with SLDS-styled track, thumb, and value label. */
export function Slider({ label, min = 0, max = 100, step = 1, value, defaultValue, onChange, showValue = true, unit = "", disabled = false, className = "", style = {} }) {
  const id = React.useMemo(() => `slds2-slider-${++_slid}`, []);
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? min);
  const current = isControlled ? value : internal;
  const pct = ((current - min) / (max - min)) * 100;

  const handle = (e) => {
    const v = Number(e.target.value);
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };

  return (
    <div className={`slds2-slider ${className}`} style={style}>
      {(label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
          {label && <label htmlFor={id} style={{ fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-2)" }}>{label}</label>}
          {showValue && <span style={{ fontSize: "var(--slds-g-text-body-small)", fontWeight: "var(--slds-g-font-weight-semibold)", color: "var(--slds-g-color-on-surface-1)" }}>{current}{unit}</span>}
        </div>
      )}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={handle}
        disabled={disabled}
        style={{
          width: "100%",
          height: "1rem",
          appearance: "none",
          WebkitAppearance: "none",
          background: "transparent",
          cursor: disabled ? "not-allowed" : "pointer",
          // track fill via gradient
          backgroundImage: `linear-gradient(var(--slds-g-color-accent-1), var(--slds-g-color-accent-1))`,
          backgroundSize: `${pct}% 4px`,
          backgroundPosition: "0 center",
          backgroundRepeat: "no-repeat",
          borderRadius: "var(--slds-g-radius-border-pill)",
          opacity: disabled ? 0.5 : 1,
          // base track
          boxShadow: "none",
        }}
      />
      <style>{`
        #${id} { background-color: var(--slds-g-color-border-2); background-clip: padding-box; }
        #${id}::-webkit-slider-runnable-track { height: 4px; border-radius: 999px; background: transparent; }
        #${id}::-moz-range-track { height: 4px; border-radius: 999px; background: var(--slds-g-color-border-2); }
        #${id}::-moz-range-progress { height: 4px; border-radius: 999px; background: var(--slds-g-color-accent-1); }
        #${id}::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; margin-top: -6px; border-radius: 50%; background: var(--slds-g-color-accent-1); border: 2px solid var(--slds-g-color-surface-container-1); box-shadow: var(--slds-g-shadow-2); cursor: pointer; }
        #${id}::-moz-range-thumb { width: 16px; height: 16px; border-radius: 50%; background: var(--slds-g-color-accent-1); border: 2px solid var(--slds-g-color-surface-container-1); box-shadow: var(--slds-g-shadow-2); cursor: pointer; }
        #${id}:focus { outline: none; }
        #${id}:focus::-webkit-slider-thumb { box-shadow: var(--slds-g-shadow-focus); }
      `}</style>
    </div>
  );
}
