import * as React from "react";

export interface MenuItem {
  label?: React.ReactNode;
  iconName?: string;
  onClick?: () => void;
  /** Show a trailing check (selected state). */
  checked?: boolean;
  /** Render in destructive red. */
  destructive?: boolean;
  /** Render as a divider line. */
  divider?: boolean;
  /** Render as an uppercase section subheader. */
  subheader?: string;
}

export interface ButtonMenuProps {
  /** Trigger label; omit for an icon-only menu button. */
  label?: React.ReactNode;
  /** @default "utility:down" — trigger icon (e.g. "utility:settings"). */
  iconName?: string;
  /** Menu rows — items, dividers, and subheaders. */
  items: MenuItem[];
  /** @default "left" — which edge the dropdown aligns to. */
  align?: "left" | "right";
  /** @default "border" — "border" (outlined) or "bare". */
  variant?: "border" | "bare";
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Button Menu — a button that opens a dropdown of actions. Supports
 * item icons, checked items, destructive items, dividers and subheaders.
 * Closes on outside click or selection.
 *
 * @dsCard group="Components"
 */
export function ButtonMenu(props: ButtonMenuProps): JSX.Element;
