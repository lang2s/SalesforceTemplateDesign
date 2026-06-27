import * as React from "react";

export interface DatatableColumn {
  /** Field key on each row object. */
  key: string;
  label: React.ReactNode;
  width?: number | string;
  align?: "left" | "center" | "right";
  /** Show a sort affordance and emit onSort. */
  sortable?: boolean;
  /** Custom cell renderer: (value, row) => node. */
  render?: (value: any, row: any) => React.ReactNode;
}

export interface DatatableProps {
  columns: DatatableColumn[];
  /** Records; each needs a unique `id`. */
  rows: Array<Record<string, any>>;
  /** @default false — show the selection checkbox column. */
  selectable?: boolean;
  /** Current sort column key. */
  sortBy?: string;
  /** @default "asc" */
  sortDir?: "asc" | "desc";
  onSort?: (key: string, dir: "asc" | "desc") => void;
  /** Right-aligned per-row actions: (row) => node. */
  rowActions?: (row: any) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Datatable — a record grid with sticky-styled header, optional row
 * selection (with select-all), sortable columns, custom cell renderers, and a
 * per-row actions slot. Presentation component — sorting/paging are yours.
 *
 * @dsCard group="Components"
 */
export function Datatable(props: DatatableProps): JSX.Element;
