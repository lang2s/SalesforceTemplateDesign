import * as React from "react";

export interface DualListboxOption {
  label: React.ReactNode;
  value: string;
}

export interface DualListboxProps {
  label?: React.ReactNode;
  /** @default "Available" */
  sourceLabel?: string;
  /** @default "Selected" */
  selectedLabel?: string;
  options: DualListboxOption[];
  /** Controlled selected values. */
  value?: string[];
  /** @default [] */
  defaultValue?: string[];
  onChange?: (selected: string[]) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Dual Listbox — move options between Available and Selected lists with
 * arrow buttons (click to highlight, double-click or arrow to move).
 *
 * @dsCard group="Components"
 */
export function DualListbox(props: DualListboxProps): JSX.Element;
