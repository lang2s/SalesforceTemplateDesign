import * as React from "react";

export interface ComboboxOption {
  label: string;
  value: string;
}

export interface ComboboxProps {
  /** Field label. */
  label?: string;
  options: ComboboxOption[];
  /** Controlled selected value. Omit to use defaultValue. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Empty-state text. @default "Select an option" */
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Combobox — a single-select dropdown with a styled popover list,
 * keyboard/click-outside dismissal, and a check on the selected option.
 *
 * @dsCard group="Components"
 */
export function Combobox(props: ComboboxProps): JSX.Element;
