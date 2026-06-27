import * as React from "react";

export type AvatarSize = "x-small" | "small" | "medium" | "large" | "x-large";

export interface AvatarProps {
  /** Image URL. Falls back to initials, then icon. */
  src?: string;
  /** 1–2 character initials shown when no src. */
  initials?: string;
  /** Fallback SLDS icon when no src/initials. @default "standard:user" */
  iconName?: string;
  /** @default "medium" */
  size?: AvatarSize;
  /** @default "circle" */
  variant?: "circle" | "square";
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Avatar — represents a user or object as an image, initials, or icon.
 *
 * @dsCard group="Components"
 */
export function Avatar(props: AvatarProps): JSX.Element;
