import * as React from "react";

export interface FileUploadProps {
  label?: React.ReactNode;
  /** Accepted MIME/extension filter (e.g. ".pdf,image/*"). */
  accept?: string;
  /** @default true */
  multiple?: boolean;
  /** Called with the selected File[] (no network upload performed). */
  onFiles?: (files: File[]) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SLDS File Upload — a dashed drop zone with a browse link that lists selected
 * file names. Interaction/visual shell only (does not upload).
 *
 * @dsCard group="Components"
 */
export function FileUpload(props: FileUploadProps): JSX.Element;
