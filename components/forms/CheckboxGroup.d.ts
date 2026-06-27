import * as React from "react";

export interface CheckboxOption {
  label: React.ReactNode;
  value: string;
}

export interface CheckboxGroupProps {
  label?: React.ReactNode;
  options: CheckboxOption[];
  /** Controlled array of selected values. */
  value?: string[];
  /** @default [] — uncontrolled initial selection. */
  defaultValue?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Checkbox Group — a labeled set of related checkboxes for multi-select.
 *
 * @dsCard group="Components"
 */
export function CheckboxGroup(props: CheckboxGroupProps): JSX.Element;
