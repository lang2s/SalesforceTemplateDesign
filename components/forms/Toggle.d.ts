import * as React from "react";

export interface ToggleProps {
  /** Label text shown beside the switch. */
  label?: string;
  /** Controlled on/off state. Omit to use defaultChecked. */
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Toggle (switch) — an instant-apply on/off control for settings.
 *
 * @dsCard group="Components"
 */
export function Toggle(props: ToggleProps): JSX.Element;
