import * as React from "react";

export interface EmptyStateProps {
  /** @default "standard:empty" — leading SLDS icon. */
  iconName?: string;
  title?: React.ReactNode;
  message?: React.ReactNode;
  /** Optional CTA (e.g. a Button). */
  action?: React.ReactNode;
  /** @default "medium" */
  size?: "small" | "medium";
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Empty State (a.k.a. Illustration) — a centered icon + message + action
 * shown for no-data, no-results, or error states.
 *
 * @dsCard group="Components"
 */
export function EmptyState(props: EmptyStateProps): JSX.Element;
