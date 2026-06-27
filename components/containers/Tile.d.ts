import * as React from "react";

export interface TileMeta {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface TileProps {
  /** Record title. */
  title: React.ReactNode;
  /** Make the title a link. */
  href?: string;
  onTitleClick?: (e: React.MouseEvent) => void;
  /** Leading SLDS icon name (used if `avatar` not given). */
  iconName?: string;
  /** Leading avatar node (overrides `iconName`). */
  avatar?: React.ReactNode;
  /** Key/value meta rows. */
  meta?: TileMeta[];
  /** Right-aligned actions (e.g. a ButtonMenu). */
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Tile — a compact record summary for related lists and side panels:
 * linked title, optional avatar/icon, key/value meta, and an actions slot.
 *
 * @dsCard group="Components"
 */
export function Tile(props: TileProps): JSX.Element;
