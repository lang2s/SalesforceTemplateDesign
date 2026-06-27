import * as React from "react";

export type IconSize = "xx-small" | "x-small" | "small" | "medium" | "large";
export type IconVariant = "default" | "error" | "success" | "warning" | "brand" | "inverse";

export interface IconProps {
  /** SLDS-style icon name, "category:name" — e.g. "utility:download", "standard:contact". */
  iconName?: string;
  /** Rendered glyph size. @default "small" */
  size?: IconSize;
  /** Tint for utility icons (ignored for standard/colored-tile icons). @default "default" */
  variant?: IconVariant;
  /** Use the filled glyph axis. @default false */
  filled?: boolean;
  /** Accessible title; when set the icon is exposed to AT, otherwise aria-hidden. */
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Icon. Utility icons render monochrome (currentColor / variant tint);
 * standard, action and custom icons render as a colored rounded tile with a
 * white glyph, matching the SLDS icon blueprint.
 *
 * @dsCard group="Components"
 */
export function Icon(props: IconProps): JSX.Element;
