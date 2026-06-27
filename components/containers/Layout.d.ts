import * as React from "react";

export interface LayoutProps {
  children?: React.ReactNode;
  /** @default true — apply column gutters (16px). */
  gutters?: boolean;
  /** @default true — allow items to wrap to new rows. */
  wrap?: boolean;
  /** @default "start" */
  horizontalAlign?: "start" | "center" | "end" | "spread" | "space";
  /** @default "stretch" */
  verticalAlign?: "start" | "center" | "end" | "stretch";
  className?: string;
  style?: React.CSSProperties;
}

export interface LayoutItemProps {
  children?: React.ReactNode;
  /** Column span out of 12. */
  size?: number;
  /** "auto"/"grow" lets the item grow to fill space. */
  flexibility?: "auto" | "grow";
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Layout — a responsive 12-column flex grid. Pair with LayoutItem and
 * set `size` (1–12) per item; toggle `gutters` and alignment as needed.
 *
 * @dsCard group="Components"
 */
export function Layout(props: LayoutProps): JSX.Element;
export function LayoutItem(props: LayoutItemProps): JSX.Element;
