import React from "react";
import { Icon } from "../display/Icon.jsx";

/**
 * SLDS File Upload — a drop zone + browse button. Visual/interaction shell;
 * surfaces selected file names (no real upload).
 */
export function FileUpload({ label, accept, multiple = true, onFiles, className = "", style = {} }) {
  const [over, setOver] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const inputRef = React.useRef(null);

  const take = (list) => {
    const arr = Array.from(list || []);
    setFiles(arr.map((f) => f.name));
    onFiles && onFiles(arr);
  };

  return (
    <div className={`slds2-file-upload ${className}`} style={style}>
      {label && <div style={{ marginBottom: "0.375rem", fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-2)" }}>{label}</div>}
      <div
        onClick={() => inputRef.current && inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); take(e.dataTransfer.files); }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "1.5rem",
          textAlign: "center",
          background: over ? "var(--slds-g-color-accent-container-1)" : "var(--slds-g-color-surface-2)",
          border: `2px dashed ${over ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-2)"}`,
          borderRadius: "var(--slds-g-radius-border-4)",
          cursor: "pointer",
          transition: "background var(--slds-g-duration-quickly) var(--slds-g-ease-out)",
        }}
      >
        <Icon iconName="utility:upload" size="medium" style={{ color: "var(--slds-g-color-accent-1)" }} />
        <div style={{ fontSize: "var(--slds-g-text-body-regular)", color: "var(--slds-g-color-on-surface-2)" }}>
          <span style={{ color: "var(--slds-g-color-accent-1)", fontWeight: "var(--slds-g-font-weight-semibold)" }}>Upload Files</span> or drop them here
        </div>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={(e) => take(e.target.files)} style={{ display: "none" }} />
      </div>
      {files.length > 0 && (
        <ul style={{ listStyle: "none", margin: "0.625rem 0 0", padding: 0, display: "flex", flexDirection: "column", gap: "0.375rem" }}>
          {files.map((name, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 0.5rem", background: "var(--slds-g-color-surface-container-1)", border: "1px solid var(--slds-g-color-border-1)", borderRadius: "var(--slds-g-radius-border-2)", fontSize: "var(--slds-g-text-body-small)" }}>
              <Icon iconName="doctype:attachment" size="x-small" />
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
              <Icon iconName="utility:success" size="xx-small" variant="success" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
