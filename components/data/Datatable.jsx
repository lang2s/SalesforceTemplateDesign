import React from "react";
import { Icon } from "../display/Icon.jsx";

/**
 * SLDS Datatable — a styled record grid with header, optional row selection,
 * sortable-column affordance, and a row-actions slot.
 * columns: [{ key, label, width, align, render }]
 * rows: array of record objects (need a unique `id`).
 */
export function Datatable({ columns = [], rows = [], selectable = false, sortBy, sortDir = "asc", onSort, rowActions, className = "", style = {} }) {
  const [selected, setSelected] = React.useState([]);
  const allChecked = selectable && rows.length > 0 && selected.length === rows.length;

  const toggleAll = () => setSelected(allChecked ? [] : rows.map((r) => r.id));
  const toggleOne = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const checkbox = (checked, onClick) => (
    <span onClick={(e) => { e.stopPropagation(); onClick(); }} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: "1rem", height: "1rem", borderRadius: "var(--slds-g-radius-border-2)",
      background: checked ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-surface-container-1)",
      border: `1px solid ${checked ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-2)"}`,
      cursor: "pointer", flex: "none",
    }}>
      {checked && <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M13.5 4.5L6.5 11.5L3 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
    </span>
  );

  const th = {
    padding: "0.5rem 0.75rem", textAlign: "left", whiteSpace: "nowrap",
    fontSize: "var(--slds-g-text-body-small)", fontWeight: "var(--slds-g-font-weight-bold)",
    textTransform: "uppercase", letterSpacing: ".04em", color: "var(--slds-g-color-on-surface-3)",
  };
  const td = { padding: "0.625rem 0.75rem", fontSize: "var(--slds-g-text-body-regular)", color: "var(--slds-g-color-on-surface-1)", borderTop: "1px solid var(--slds-g-color-border-1)" };

  return (
    <div className={`slds2-datatable ${className}`} style={{ overflowX: "auto", background: "var(--slds-g-color-surface-container-1)", border: "1px solid var(--slds-g-color-border-1)", borderRadius: "var(--slds-g-radius-border-4)", boxShadow: "var(--slds-g-shadow-1)", ...style }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--slds-g-color-surface-1)" }}>
            {selectable && <th style={{ ...th, width: 40 }}>{checkbox(allChecked, toggleAll)}</th>}
            {columns.map((c) => {
              const active = sortBy === c.key;
              return (
                <th key={c.key} style={{ ...th, width: c.width, textAlign: c.align || "left", cursor: c.sortable ? "pointer" : "default" }}
                  onClick={() => c.sortable && onSort && onSort(c.key, active && sortDir === "asc" ? "desc" : "asc")}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                    {c.label}
                    {c.sortable && <Icon iconName={active ? (sortDir === "asc" ? "utility:arrowup" : "utility:arrowdown") : "utility:arrowdown"} size="xx-small" style={{ color: active ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-3)", fontSize: 12 }} />}
                  </span>
                </th>
              );
            })}
            {rowActions && <th style={{ ...th, width: 40 }} />}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const checked = selected.includes(r.id);
            return (
              <tr key={r.id}
                style={{ background: checked ? "var(--slds-g-color-accent-container-1)" : "transparent" }}
                onMouseEnter={(e) => { if (!checked) e.currentTarget.style.background = "var(--slds-g-color-surface-1)"; }}
                onMouseLeave={(e) => { if (!checked) e.currentTarget.style.background = "transparent"; }}>
                {selectable && <td style={td}>{checkbox(checked, () => toggleOne(r.id))}</td>}
                {columns.map((c) => (
                  <td key={c.key} style={{ ...td, textAlign: c.align || "left" }}>
                    {c.render ? c.render(r[c.key], r) : r[c.key]}
                  </td>
                ))}
                {rowActions && <td style={{ ...td, textAlign: "right" }}>{rowActions(r)}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
