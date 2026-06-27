import * as React from "react";

/**
 * Props for the SLDS Card.
 */
export interface CardProps {
  /** Header title text. */
  title?: string;
  /** Optional SLDS icon shown before the title (e.g. "standard:contact"). */
  iconName?: string;
  /** Header-right content, typically Buttons. */
  actions?: React.ReactNode;
  /** Optional footer content (centered, muted). */
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Card — the workhorse surface container. A rounded, lightly-shadowed
 * panel with an optional icon+title header, actions, body, and footer.
 *
 * @dsCard group="Components"
 */
export function Card(props: CardProps): JSX.Element;
