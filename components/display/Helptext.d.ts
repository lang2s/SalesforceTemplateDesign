import * as React from "react";

export interface HelptextProps {
  /** Tooltip content. */
  content: React.ReactNode;
  /** @default "utility:info" — the trigger icon. */
  iconName?: string;
  /** @default "top" — tooltip placement. */
  align?: "top" | "bottom" | "left" | "right";
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Helptext — a small "?" / info icon that reveals a dark tooltip on
 * hover/focus; use beside field labels to explain a value.
 *
 * @dsCard group="Components"
 */
export function Helptext(props: HelptextProps): JSX.Element;
