import * as React from "react";

export interface InputProps {
  /** Field label, shown above the control. */
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Native input type. @default "text" */
  type?: string;
  placeholder?: string;
  /** Mark required (red asterisk before label). */
  required?: boolean;
  /** Display-only mode: borderless, transparent. */
  readOnly?: boolean;
  disabled?: boolean;
  /** Error message; presence turns the field red. */
  error?: string;
  /** Optional leading SLDS icon (e.g. "utility:search"). */
  iconName?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS text Input / form element. Label, required marker, leading icon,
 * read-only display mode, and error state all driven by props.
 *
 * @dsCard group="Components"
 */
export function Input(props: InputProps): JSX.Element;
