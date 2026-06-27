import * as React from "react";

export type ProgressVariant = "base" | "path";

export interface ProgressIndicatorProps {
  /** Ordered step labels. */
  steps: React.ReactNode[];
  /** Zero-based index of the active step (steps before it read as complete). @default 0 */
  current?: number;
  /**
   * @default "base"
   * - "base": dotted track with circular markers (setup/guided flows).
   * - "path": the Salesforce Path — chevron stages for sales/case progress.
   */
  variant?: ProgressVariant;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Progress Indicator — communicates progress through a sequence of steps.
 * The "path" variant is the signature Salesforce sales/case Path (chevrons);
 * the "base" variant is the circular-marker stepper used in guided flows.
 *
 * @dsCard group="Components"
 */
export function ProgressIndicator(props: ProgressIndicatorProps): JSX.Element;
