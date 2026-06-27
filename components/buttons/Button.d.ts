import * as React from "react";

export type ButtonVariant =
  | "neutral"
  | "brand"
  | "outline-brand"
  | "destructive"
  | "success"
  | "text";
export type ButtonSize = "small" | "medium";

/**
 * Props for the SLDS Button.
 */
export interface ButtonProps {
  /** Button text. Alternatively pass children. */
  label?: string;
  children?: React.ReactNode;
  /** Visual treatment. @default "neutral" */
  variant?: ButtonVariant;
  /** @default "medium" */
  size?: ButtonSize;
  /** Optional SLDS icon name, e.g. "utility:download". */
  iconName?: string;
  /** Icon placement relative to the label. @default "left" */
  iconPosition?: "left" | "right";
  disabled?: boolean;
  /** Fill the container width. @default false */
  stretch?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Button. The primary action control — `brand` for the main action on a
 * view, `neutral` for secondary actions, `destructive` for deletes.
 *
 * @dsCard group="Components"
 */
export function Button(props: ButtonProps): JSX.Element;
