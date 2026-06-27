import * as React from "react";

export interface ProgressBarProps {
  /** Completion 0–100. */
  value: number;
  /** @default "medium" — bar thickness. */
  size?: "small" | "medium" | "large";
  /** @default "base" — fill color. */
  variant?: "base" | "success" | "warning";
  /** @default false — show "NN%" above the bar. */
  showValue?: boolean;
  label?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Progress Bar — a horizontal completion indicator (0–100) with optional
 * label and percent readout.
 *
 * @dsCard group="Components"
 */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
