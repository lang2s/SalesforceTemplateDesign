import * as React from "react";

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  iconName?: string;
  children?: TreeNode[];
}

export interface TreeProps {
  /** Root nodes; nest via `children`. */
  nodes: TreeNode[];
  /** Ids expanded initially (defaults to the first level). */
  defaultExpanded?: string[];
  /** Controlled selected node id. */
  value?: string;
  onSelect?: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Tree — a nested, expand/collapse hierarchy with rotating chevrons,
 * optional per-node icons, and a selected row. (Tree Grid = Tree + Datatable
 * columns; compose the two for that pattern.)
 *
 * @dsCard group="Components"
 */
export function Tree(props: TreeProps): JSX.Element;
