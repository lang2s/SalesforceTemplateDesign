import * as React from "react";

export interface ButtonStatefulProps {
  /** Controlled selected state. */
  selected?: boolean;
  /** @default false — uncontrolled initial state. */
  defaultSelected?: boolean;
  /** Called with the next selected value on toggle. */
  onChange?: (selected: boolean) => void;
  /** @default "Follow" */
  labelWhenOff?: string;
  /** @default "Following" */
  labelWhenOn?: string;
  /** @default "Unfollow" — shown on hover while selected. */
  labelWhenHover?: string;
  /** @default "utility:add" */
  iconNameWhenOff?: string;
  /** @default "utility:check" */
  iconNameWhenOn?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Button Stateful — a toggle button that flips between two states with a
 * hover affordance to reverse (the classic Follow / Following / Unfollow).
 *
 * @dsCard group="Components"
 */
export function ButtonStateful(props: ButtonStatefulProps): JSX.Element;
