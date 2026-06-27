import * as React from "react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
  /** @default "info" — sets color + default leading icon. */
  variant?: AlertVariant;
  /** Override the default leading icon (SLDS name, e.g. "utility:offline"). */
  iconName?: string;
  /** When provided, shows a close (×) button. */
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Alert — a full-width, persistent notification bar pinned in context
 * (top of a page or region) to communicate a system-level state. Unlike a
 * Toast it does not auto-dismiss.
 *
 * @dsCard group="Components"
 */
export function Alert(props: AlertProps): JSX.Element;
