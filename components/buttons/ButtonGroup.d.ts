import * as React from "react";

export interface ButtonGroupItem {
  label?: React.ReactNode;
  value?: string;
  iconName?: string;
  title?: string;
  onClick?: () => void;
}

export interface ButtonGroupProps {
  /** Buttons to join into the segmented control. */
  items: ButtonGroupItem[];
  /** Controlled selected value (highlights the matching item). */
  value?: string;
  /** Called with the clicked item's value. */
  onChange?: (value?: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Button Group — joins related buttons into one segmented control with
 * shared borders; optionally single-select (toolbars, view switchers).
 *
 * @dsCard group="Components"
 */
export function ButtonGroup(props: ButtonGroupProps): JSX.Element;
