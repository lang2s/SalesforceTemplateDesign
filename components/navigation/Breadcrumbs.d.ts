import * as React from "react";

export interface BreadcrumbItem {
  /** Visible label. */
  label: React.ReactNode;
  /** Link target; omit for the current (last) crumb. */
  href?: string;
  /** Click handler (e.g. SPA navigation). */
  onClick?: (e: React.MouseEvent) => void;
}

export interface BreadcrumbsProps {
  /** Ordered trail, root first. The last item renders as the current page. */
  items: BreadcrumbItem[];
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Breadcrumbs — a compact hierarchy trail (Object › List › Record)
 * shown above record and list views. The last crumb is the current page
 * and is not a link.
 *
 * @dsCard group="Components"
 */
export function Breadcrumbs(props: BreadcrumbsProps): JSX.Element;
