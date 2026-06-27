import * as React from "react";

export type ModalSize = "small" | "medium" | "large";

export interface ModalProps {
  /** @default true — render the modal + backdrop. */
  isOpen?: boolean;
  /** Called when the backdrop or the × button is clicked. */
  onClose?: () => void;
  /** Heading shown in the modal header. */
  title?: React.ReactNode;
  /** Optional sub-line under the title. */
  tagline?: React.ReactNode;
  /** @default "medium" — controls max width (30 / 40 / 52rem). */
  size?: ModalSize;
  /** Footer actions, typically right-aligned Buttons. */
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Modal — a focused dialog rendered over a dimmed, blurred backdrop,
 * with an optional header (title, tagline, close) and a footer for actions.
 * Clicking the backdrop or × calls `onClose`.
 *
 * @dsCard group="Components"
 */
export function Modal(props: ModalProps): JSX.Element | null;
