import * as React from "react";

export interface ProgressRingProps {
  /** Completion 0–100. */
  value: number;
  /** @default 32 — diameter in px. */
  size?: number;
  /** @default "base" — ring color. */
  variant?: "base" | "success" | "warning" | "error";
  /** @default false — show the rounded percent in the center. */
  showValue?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Progress Ring — a compact circular completion indicator (0–100),
 * good for inline status and dashboards.
 *
 * @dsCard group="Components"
 */
export function ProgressRing(props: ProgressRingProps): JSX.Element;
