import * as React from "react";

export type BadgeVariant = "default" | "inverse" | "brand" | "success" | "warning" | "error";

export interface BadgeProps {
  /** Badge text. Alternatively pass children. */
  label?: string;
  children?: React.ReactNode;
  /** @default "default" */
  variant?: BadgeVariant;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Badge — a small pill label for status, counts, or metadata.
 *
 * @dsCard group="Components"
 */
export function Badge(props: BadgeProps): JSX.Element;
