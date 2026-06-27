import * as React from "react";

export type ButtonIconVariant = "border" | "border-filled" | "bare" | "brand" | "container";
export type ButtonIconSize = "x-small" | "small" | "medium" | "large";

export interface ButtonIconProps {
  /** SLDS icon name, e.g. "utility:settings". */
  iconName?: string;
  /** @default "border" */
  variant?: ButtonIconVariant;
  /** @default "medium" */
  size?: ButtonIconSize;
  disabled?: boolean;
  /** Accessible label + tooltip (icon-only buttons must have one). */
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS icon-only Button. Use `bare` in toolbars/headers, `border` for standalone
 * actions, `brand` for emphasis. Always supply `title` for accessibility.
 *
 * @dsCard group="Components"
 */
export function ButtonIcon(props: ButtonIconProps): JSX.Element;
