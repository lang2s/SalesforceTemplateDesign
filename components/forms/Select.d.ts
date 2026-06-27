import * as React from "react";

export interface SelectOption {
  label?: React.ReactNode;
  value?: string;
}

export interface SelectProps {
  label?: React.ReactNode;
  /** Options as `{label,value}` or plain strings. */
  options: Array<SelectOption | string>;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  /** Error message (also turns the border red). */
  error?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Select — a native dropdown styled to match SLDS inputs, with a custom
 * chevron. Use for short, fixed option sets; use Combobox for richer menus.
 *
 * @dsCard group="Components"
 */
export function Select(props: SelectProps): JSX.Element;
