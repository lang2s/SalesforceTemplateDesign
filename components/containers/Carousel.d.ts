import * as React from "react";

export interface CarouselSlide {
  key?: string | number;
  content: React.ReactNode;
}

export interface CarouselProps {
  /** Slides to cycle through (objects with `content`, or raw nodes). */
  slides: Array<CarouselSlide | React.ReactNode>;
  /** @default 220 — viewport height in px. */
  height?: number;
  /** @default true — show prev/next arrows. */
  showArrows?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Carousel — a horizontally sliding panel with indicator dots and
 * optional arrows for promos, onboarding, or featured records.
 *
 * @dsCard group="Components"
 */
export function Carousel(props: CarouselProps): JSX.Element;
