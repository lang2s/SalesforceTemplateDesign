import * as React from "react";

export interface CheckboxProps {
  /** Label text shown beside the box. */
  label?: string;
  /** Controlled checked state. Omit to use defaultChecked (uncontrolled). */
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Checkbox — a single labeled boolean. Works controlled or uncontrolled.
 *
 * @dsCard group="Components"
 */
export function Checkbox(props: CheckboxProps): JSX.Element;
