import * as React from "react";

export interface SliderProps {
  label?: React.ReactNode;
  /** @default 0 */
  min?: number;
  /** @default 100 */
  max?: number;
  /** @default 1 */
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** @default true — show the current value next to the label. */
  showValue?: boolean;
  /** Unit suffix appended to the value (e.g. "%"). */
  unit?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Slider — a range input with an SLDS-styled track, brand fill, and
 * round thumb, plus an optional live value label.
 *
 * @dsCard group="Components"
 */
export function Slider(props: SliderProps): JSX.Element;
