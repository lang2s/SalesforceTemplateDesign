import * as React from "react";

export interface VerticalNavItem {
  id: string;
  label: React.ReactNode;
  iconName?: string;
  /** Trailing count/badge text. */
  badge?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface VerticalNavSection {
  label?: string;
  items: VerticalNavItem[];
}

export interface VerticalNavigationProps {
  /** Grouped navigation sections. */
  sections: VerticalNavSection[];
  /** Controlled selected item id. */
  value?: string;
  defaultValue?: string;
  onSelect?: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Vertical Navigation — a sidebar nav with optional section headers,
 * per-item icons, trailing count badges, and a left-border selected state.
 *
 * @dsCard group="Components"
 */
export function VerticalNavigation(props: VerticalNavigationProps): JSX.Element;
