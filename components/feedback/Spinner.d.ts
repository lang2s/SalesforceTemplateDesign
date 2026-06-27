import * as React from "react";

export type SpinnerSize = "x-small" | "small" | "medium" | "large";

export interface SpinnerProps {
  /** @default "medium" */
  size?: SpinnerSize;
  /** Use light colors for dark/overlay backgrounds. */
  inverse?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Spinner — a circular loading indicator in the brand color.
 *
 * @dsCard group="Components"
 */
export function Spinner(props: SpinnerProps): JSX.Element;
