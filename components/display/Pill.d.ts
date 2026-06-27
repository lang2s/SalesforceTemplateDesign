import * as React from "react";

export interface PillProps {
  /** Pill text. Alternatively pass children. */
  label?: string;
  children?: React.ReactNode;
  /** Optional leading SLDS icon. */
  iconName?: string;
  /** When provided, renders a remove (×) affordance and calls this on click. */
  onRemove?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Pill — a compact, optionally-removable token for active filters,
 * multi-select values, and lookup chips.
 *
 * @dsCard group="Components"
 */
export function Pill(props: PillProps): JSX.Element;
