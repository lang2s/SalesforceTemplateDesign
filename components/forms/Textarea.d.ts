import * as React from "react";

export interface TextareaProps {
  label?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  /** @default 3 */
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS Textarea — a multi-line text input matching SLDS form styling
 * (focus ring, error state, vertical resize).
 *
 * @dsCard group="Components"
 */
export function Textarea(props: TextareaProps): JSX.Element;
