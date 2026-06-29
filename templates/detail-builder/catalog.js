/* LWC Detail Screen Builder — catalog: components with REAL editable variant
   schemas, container definitions, palette groups & a starter screen.
   Exposed as window.DSB.

   Prop editor entry: { k, l, t, d, o? }
   t: 'text' | 'textarea' | 'number' | 'toggle' | 'select'(o:[]) | 'options'(comma list) | 'icon' */
(function () {
  // container types own a `children` array of leaf blocks
  const CONTAINERS = ["section", "card", "modal"];

  const catalog = [
    // ---------------- Forms ----------------
    { type: "input", label: "Input", icon: "utility:edit", group: "Forms", lwc: "lightning-input", leaf: true,
      desc: "Single-line text/email/number/date input",
      props: [{ k: "label", l: "Label", t: "text", d: "Field label" }, { k: "type", l: "Type", t: "select", d: "text", o: ["text", "email", "number", "tel", "url", "date", "password", "search"] }, { k: "placeholder", l: "Placeholder", t: "text", d: "" }, { k: "iconName", l: "Icon", t: "icon", d: "" }, { k: "required", l: "Required", t: "toggle", d: false }, { k: "readOnly", l: "Read only", t: "toggle", d: false }, { k: "disabled", l: "Disabled", t: "toggle", d: false }] },
    { type: "select", label: "Select", icon: "utility:picklist_type", group: "Forms", lwc: "lightning-select", leaf: true,
      desc: "Native dropdown",
      props: [{ k: "label", l: "Label", t: "text", d: "Picklist" }, { k: "options", l: "Options (comma)", t: "options", d: "New, Working, Closed Won, Closed Lost" }, { k: "required", l: "Required", t: "toggle", d: false }, { k: "disabled", l: "Disabled", t: "toggle", d: false }] },
    { type: "combobox", label: "Combobox", icon: "utility:picklist_type", group: "Forms", lwc: "lightning-combobox", leaf: true,
      desc: "Styled single-select with checkmark",
      props: [{ k: "label", l: "Label", t: "text", d: "Stage" }, { k: "options", l: "Options (comma)", t: "options", d: "Qualification, Discovery, Proposal, Negotiation, Closed Won" }, { k: "placeholder", l: "Placeholder", t: "text", d: "Select an option" }, { k: "disabled", l: "Disabled", t: "toggle", d: false }] },
    { type: "textarea", label: "Text Area", icon: "utility:justify_text", group: "Forms", lwc: "lightning-textarea", leaf: true,
      desc: "Multi-line text input",
      props: [{ k: "label", l: "Label", t: "text", d: "Description" }, { k: "placeholder", l: "Placeholder", t: "text", d: "Enter details…" }, { k: "rows", l: "Rows", t: "number", d: 3 }, { k: "required", l: "Required", t: "toggle", d: false }, { k: "disabled", l: "Disabled", t: "toggle", d: false }] },
    { type: "checkbox", label: "Checkbox", icon: "utility:check", group: "Forms", lwc: "lightning-input", leaf: true,
      desc: "Single checkbox toggle",
      props: [{ k: "label", l: "Label", t: "text", d: "I agree" }, { k: "checked", l: "Checked", t: "toggle", d: false }, { k: "disabled", l: "Disabled", t: "toggle", d: false }] },
    { type: "checkboxGroup", label: "Checkbox Group", icon: "utility:check", group: "Forms", lwc: "lightning-checkbox-group", leaf: true,
      desc: "Multi-select checkboxes",
      props: [{ k: "label", l: "Label", t: "text", d: "Industries" }, { k: "options", l: "Options (comma)", t: "options", d: "Technology, Finance, Media, Retail" }, { k: "disabled", l: "Disabled", t: "toggle", d: false }] },
    { type: "radioGroup", label: "Radio Group", icon: "utility:check", group: "Forms", lwc: "lightning-radio-group", leaf: true,
      desc: "Mutually-exclusive radios",
      props: [{ k: "label", l: "Label", t: "text", d: "Priority" }, { k: "options", l: "Options (comma)", t: "options", d: "High, Medium, Low" }, { k: "disabled", l: "Disabled", t: "toggle", d: false }] },
    { type: "toggle", label: "Toggle", icon: "utility:settings", group: "Forms", lwc: "lightning-input", leaf: true,
      desc: "On/off switch",
      props: [{ k: "label", l: "Label", t: "text", d: "Notify my team" }, { k: "checked", l: "On", t: "toggle", d: true }, { k: "disabled", l: "Disabled", t: "toggle", d: false }] },
    { type: "slider", label: "Slider", icon: "utility:settings", group: "Forms", lwc: "lightning-slider", leaf: true,
      desc: "Range input with value",
      props: [{ k: "label", l: "Label", t: "text", d: "Probability" }, { k: "min", l: "Min", t: "number", d: 0 }, { k: "max", l: "Max", t: "number", d: 100 }, { k: "step", l: "Step", t: "number", d: 1 }, { k: "value", l: "Value", t: "number", d: 60 }, { k: "unit", l: "Unit", t: "text", d: "%" }, { k: "showValue", l: "Show value", t: "toggle", d: true }, { k: "disabled", l: "Disabled", t: "toggle", d: false }] },
    { type: "dualListbox", label: "Dual Listbox", icon: "utility:list", group: "Forms", lwc: "lightning-dual-listbox", leaf: true,
      desc: "Move options between two lists",
      props: [{ k: "label", l: "Label", t: "text", d: "Permissions" }, { k: "sourceLabel", l: "Source label", t: "text", d: "Available" }, { k: "selectedLabel", l: "Selected label", t: "text", d: "Selected" }, { k: "options", l: "Options (comma)", t: "options", d: "Read, Edit, Delete, Share, Transfer" }] },
    { type: "fileUpload", label: "File Upload", icon: "utility:attach", group: "Forms", lwc: "lightning-file-upload", leaf: true,
      desc: "Drag-and-drop upload zone",
      props: [{ k: "label", l: "Label", t: "text", d: "Attachments" }, { k: "accept", l: "Accept (e.g. .pdf,.png)", t: "text", d: "" }, { k: "multiple", l: "Multiple files", t: "toggle", d: true }] },

    // ---------------- Display ----------------
    { type: "badge", label: "Badge", icon: "utility:topic", group: "Display", lwc: "lightning-badge", leaf: true,
      desc: "Small status label",
      props: [{ k: "label", l: "Text", t: "text", d: "Active" }, { k: "variant", l: "Variant", t: "select", d: "brand", o: ["default", "inverse", "brand", "success", "warning", "error"] }] },
    { type: "avatar", label: "Avatar", icon: "utility:user", group: "Display", lwc: "lightning-avatar", leaf: true,
      desc: "Initials / icon avatar",
      props: [{ k: "initials", l: "Initials", t: "text", d: "LV" }, { k: "iconName", l: "Fallback icon", t: "icon", d: "standard:contact" }, { k: "size", l: "Size", t: "select", d: "medium", o: ["x-small", "small", "medium", "large", "x-large"] }, { k: "variant", l: "Shape", t: "select", d: "circle", o: ["circle", "square"] }] },
    { type: "pill", label: "Pill", icon: "utility:topic", group: "Display", lwc: "lightning-pill", leaf: true,
      desc: "Removable token / chip",
      props: [{ k: "label", l: "Text", t: "text", d: "Enterprise" }, { k: "iconName", l: "Icon", t: "icon", d: "utility:filter" }] },
    { type: "icon", label: "Icon", icon: "utility:apps", group: "Display", lwc: "lightning-icon", leaf: true,
      desc: "SLDS icon by name",
      props: [{ k: "iconName", l: "Icon", t: "icon", d: "standard:contact" }, { k: "size", l: "Size", t: "select", d: "medium", o: ["x-small", "small", "medium", "large"] }] },
    { type: "progressBar", label: "Progress Bar", icon: "utility:metrics", group: "Display", lwc: "lightning-progress-bar", leaf: true,
      desc: "Horizontal completion indicator",
      props: [{ k: "label", l: "Label", t: "text", d: "Setup progress" }, { k: "value", l: "Value (0–100)", t: "number", d: 68 }, { k: "variant", l: "Variant", t: "select", d: "base", o: ["base", "success", "warning"] }, { k: "size", l: "Size", t: "select", d: "medium", o: ["small", "medium", "large"] }, { k: "showValue", l: "Show value", t: "toggle", d: true }] },
    { type: "formattedText", label: "Text Block", icon: "utility:justify_text", group: "Display", lwc: "lightning-formatted-text", leaf: true,
      desc: "Static paragraph / formatted text",
      props: [{ k: "content", l: "Content", t: "textarea", d: "Strategic enterprise customer since 2021. Renewal in Q3." }] },

    // ---------------- Actions ----------------
    { type: "button", label: "Button", icon: "utility:new_window", group: "Actions", lwc: "lightning-button", leaf: true,
      desc: "Clickable action",
      props: [{ k: "label", l: "Label", t: "text", d: "Save" }, { k: "variant", l: "Variant", t: "select", d: "brand", o: ["neutral", "brand", "outline-brand", "destructive", "success", "text"] }, { k: "size", l: "Size", t: "select", d: "medium", o: ["small", "medium"] }, { k: "iconName", l: "Icon", t: "icon", d: "" }, { k: "iconPosition", l: "Icon position", t: "select", d: "left", o: ["left", "right"] }, { k: "stretch", l: "Full width", t: "toggle", d: false }, { k: "disabled", l: "Disabled", t: "toggle", d: false }] },
    { type: "buttonGroup", label: "Button Group", icon: "utility:apps", group: "Actions", lwc: "lightning-button-group", leaf: true,
      desc: "Segmented control / view switcher",
      props: [{ k: "items", l: "Buttons (comma)", t: "options", d: "List, Kanban, Table" }] },

    // ---------------- Containers ----------------
    { type: "section", label: "Section", icon: "utility:rows", group: "Containers", lwc: "section", container: true,
      desc: "Titled group of fields in 1–2 columns",
      props: [{ k: "title", l: "Section title", t: "text", d: "Contact Information" }, { k: "columns", l: "Columns", t: "select", d: "2", o: ["1", "2"] }, { k: "collapsible", l: "Collapsible", t: "toggle", d: false }] },
    { type: "card", label: "Card", icon: "standard:record", group: "Containers", lwc: "lightning-card", container: true,
      desc: "Titled surface with body & icon",
      props: [{ k: "title", l: "Title", t: "text", d: "Details" }, { k: "iconName", l: "Icon", t: "icon", d: "standard:contact" }, { k: "columns", l: "Body columns", t: "select", d: "1", o: ["1", "2"] }] },
    { type: "tabset", label: "Tab Set", icon: "utility:rows", group: "Containers", lwc: "lightning-tabset", leaf: true,
      desc: "Tabbed views (sample content)",
      props: [{ k: "tabs", l: "Tabs (comma)", t: "options", d: "Details, Related, News" }, { k: "variant", l: "Variant", t: "select", d: "standard", o: ["standard", "scoped", "vertical"] }] },
    { type: "accordion", label: "Accordion", icon: "utility:rows", group: "Containers", lwc: "lightning-accordion", leaf: true,
      desc: "Expand/collapse sections (sample content)",
      props: [{ k: "sections", l: "Sections (comma)", t: "options", d: "Address, Company, System Info" }, { k: "allowMultiple", l: "Allow multiple open", t: "toggle", d: false }] },

    // ---------------- Data ----------------
    { type: "datatable", label: "Datatable", icon: "utility:table", group: "Data", lwc: "lightning-datatable", leaf: true,
      desc: "Record grid with columns",
      props: [{ k: "columns", l: "Columns (comma)", t: "options", d: "Opportunity, Amount, Stage, Close Date" }, { k: "rows", l: "Rows", t: "number", d: 3 }, { k: "selectable", l: "Selectable", t: "toggle", d: true }] },

    // ---------------- Overlays ----------------
    { type: "modal", label: "Modal", icon: "utility:expand", group: "Overlays", lwc: "lightning-modal", container: true,
      desc: "Dialog over a dimmed backdrop — composable body",
      props: [{ k: "trigger", l: "Trigger button", t: "text", d: "Edit details" }, { k: "triggerVariant", l: "Trigger variant", t: "select", d: "brand", o: ["neutral", "brand", "outline-brand", "destructive", "success", "text"] }, { k: "title", l: "Modal title", t: "text", d: "Edit Contact" }, { k: "tagline", l: "Tagline", t: "text", d: "Update the fields below." }, { k: "size", l: "Size", t: "select", d: "medium", o: ["small", "medium", "large"] }, { k: "columns", l: "Body columns", t: "select", d: "2", o: ["1", "2"] }, { k: "footerSave", l: "Save label", t: "text", d: "Save" }, { k: "footerCancel", l: "Cancel label", t: "text", d: "Cancel" }] },

    // ---------------- Layout ----------------
    { type: "divider", label: "Divider", icon: "utility:dash", group: "Layout", lwc: "divider", leaf: true,
      desc: "Horizontal rule", props: [{ k: "pad", l: "Vertical padding", t: "number", d: 12 }] },
    { type: "spacer", label: "Spacer", icon: "utility:expand_alt", group: "Layout", lwc: "spacer", leaf: true,
      desc: "Empty vertical space", props: [{ k: "height", l: "Height (px)", t: "number", d: 24 }] },
  ];

  const byType = {};
  catalog.forEach((c) => (byType[c.type] = c));
  const isContainer = (t) => byType[t] && byType[t].container;

  function defaultProps(type) { const c = byType[type]; const p = {}; (c.props || []).forEach((pr) => (p[pr.k] = pr.d)); return p; }
  // leaf components offered inside container bodies (no nested containers)
  const leafCatalog = catalog.filter((c) => c.leaf);

  function groupOrder() { const seen = []; catalog.forEach((c) => { if (!seen.includes(c.group)) seen.push(c.group); }); return seen; }

  let _uid = 1;
  function mk(type, over, children) {
    const b = { id: "n" + (_uid++), type, props: Object.assign(defaultProps(type), over || {}) };
    if (isContainer(type)) b.children = (children || []).map((c) => mk(c.type, c.props, c.children));
    return b;
  }

  const baseSettings = { title: "Contact Record", object: "Contact", componentName: "contactDetail", columns: 2, accent: "#0176D3", headerActions: [{ id: "h1", label: "Edit", variant: "neutral", iconName: "utility:edit" }, { id: "h2", label: "New Case", variant: "neutral", iconName: "" }] };

  function starter() {
    return [
      mk("section", { title: "Contact Information", columns: 2 }, [
        { type: "input", props: { label: "First Name", value: "Lando" } },
        { type: "input", props: { label: "Last Name", value: "Voss" } },
        { type: "input", props: { label: "Title", value: "VP Sales" } },
        { type: "input", props: { label: "Email", type: "email", iconName: "utility:email" } },
        { type: "combobox", props: { label: "Lead Source" } },
        { type: "input", props: { label: "Phone", type: "tel", iconName: "utility:call" } },
      ]),
      mk("section", { title: "Opportunity", columns: 2 }, [
        { type: "combobox", props: { label: "Stage" } },
        { type: "slider", props: { label: "Probability", value: 60 } },
        { type: "radioGroup", props: { label: "Priority" } },
        { type: "toggle", props: { label: "Active customer", checked: true } },
      ]),
      mk("modal", { trigger: "Edit details", title: "Edit Contact" }, [
        { type: "input", props: { label: "First Name" } },
        { type: "input", props: { label: "Last Name" } },
        { type: "combobox", props: { label: "Stage" } },
        { type: "textarea", props: { label: "Notes" } },
      ]),
    ];
  }

  window.DSB = { catalog, byType, isContainer, CONTAINERS, defaultProps, leafCatalog, groupOrder, mk, baseSettings, starter };
})();
