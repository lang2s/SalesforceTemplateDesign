import React from "react";
import { Icon } from "../display/Icon.jsx";

/**
 * SLDS Tree — a nested, expand/collapse hierarchy.
 * nodes: [{ id, label, iconName, children: [...] }]
 */
export function Tree({ nodes = [], defaultExpanded, value, onSelect, className = "", style = {} }) {
  const [expanded, setExpanded] = React.useState(() => new Set(defaultExpanded || collectIds(nodes, 1)));
  const [selected, setSelected] = React.useState(value);
  const current = value !== undefined ? value : selected;

  const toggle = (id) => setExpanded((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const pick = (id) => { setSelected(id); onSelect && onSelect(id); };

  const renderNodes = (list, depth) =>
    list.map((node) => {
      const hasKids = node.children && node.children.length > 0;
      const isOpen = expanded.has(node.id);
      const on = node.id === current;
      return (
        <li key={node.id} role="treeitem" aria-expanded={hasKids ? isOpen : undefined}>
          <div
            onClick={() => pick(node.id)}
            style={{
              display: "flex", alignItems: "center", gap: "0.375rem",
              padding: "0.375rem 0.5rem",
              paddingLeft: `calc(0.5rem + ${depth * 1.25}rem)`,
              borderRadius: "var(--slds-g-radius-border-2)",
              background: on ? "var(--slds-g-color-surface-3)" : "transparent",
              fontSize: "var(--slds-g-text-body-regular)",
              color: "var(--slds-g-color-on-surface-1)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "var(--slds-g-color-surface-2)"; }}
            onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = "transparent"; }}
          >
            <span onClick={(e) => { e.stopPropagation(); if (hasKids) toggle(node.id); }} style={{ width: 16, display: "inline-flex", justifyContent: "center", flex: "none" }}>
              {hasKids && <Icon iconName="utility:chevronright" size="xx-small" style={{ color: "var(--slds-g-color-on-surface-2)", fontSize: 13, transition: "transform var(--slds-g-duration-quickly) var(--slds-g-ease-out)", transform: isOpen ? "rotate(90deg)" : "none" }} />}
            </span>
            {node.iconName && <Icon iconName={node.iconName} size="x-small" style={{ color: "var(--slds-g-color-on-surface-2)", flex: "none" }} />}
            <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{node.label}</span>
          </div>
          {hasKids && isOpen && (
            <ul role="group" style={{ listStyle: "none", margin: 0, padding: 0 }}>{renderNodes(node.children, depth + 1)}</ul>
          )}
        </li>
      );
    });

  return (
    <ul role="tree" className={`slds2-tree ${className}`} style={{ listStyle: "none", margin: 0, padding: 0, ...style }}>
      {renderNodes(nodes, 0)}
    </ul>
  );
}

function collectIds(nodes, maxDepth, depth = 0, acc = []) {
  if (depth >= maxDepth) return acc;
  nodes.forEach((n) => { if (n.children) { acc.push(n.id); collectIds(n.children, maxDepth, depth + 1, acc); } });
  return acc;
}
