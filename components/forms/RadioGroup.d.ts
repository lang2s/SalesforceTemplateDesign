import * as React from "react";

export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioGroupProps {
  /** Group label (legend). */
  label?: string;
  options: RadioOption[];
  /** Controlled selected value. Omit to use defaultValue. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Shared input name; auto-generated if omitted. */
  name?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Radio Group — choose exactly one option from a short list.
 *
 * @dsCard group="Components"
 */
export function RadioGroup(props: RadioGroupProps): JSX.Element;
