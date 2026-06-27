import * as React from "react";

export interface TabItem {
  label: string;
  value: string;
}

export interface TabsProps {
  tabs: TabItem[];
  /** Controlled active tab value. Omit to use defaultValue. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Tabs — an underlined tab bar for switching between sibling views.
 * Render the active view yourself based on the selected value.
 *
 * @dsCard group="Components"
 */
export function Tabs(props: TabsProps): JSX.Element;
