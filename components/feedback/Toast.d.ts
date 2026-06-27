import * as React from "react";

export type ToastVariant = "info" | "success" | "warning" | "error";

export interface ToastProps {
  /** @default "info" */
  variant?: ToastVariant;
  /** Bold lead-in text. */
  title?: string;
  /** Body message. */
  message?: React.ReactNode;
  /** When provided, shows a close (×) button. */
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Toast — a transient, full-color confirmation or alert banner shown
 * after an action. Pair with a timeout to auto-dismiss.
 *
 * @dsCard group="Components"
 */
export function Toast(props: ToastProps): JSX.Element;
