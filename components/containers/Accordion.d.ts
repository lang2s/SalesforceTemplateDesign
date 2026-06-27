import * as React from "react";

export interface AccordionSection {
  id?: string | number;
  label: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  /** Ordered expand/collapse sections. */
  sections: AccordionSection[];
  /** Initially open id(s). Defaults to the first section. */
  defaultActive?: string | number | Array<string | number>;
  /** @default false — allow multiple sections open at once. */
  allowMultiple?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Accordion — stacked, expand/collapse sections with a rotating chevron.
 * Single-open by default; set allowMultiple for independent sections.
 *
 * @dsCard group="Components"
 */
export function Accordion(props: AccordionProps): JSX.Element;
