/* CRM Page Builder — catalog: components, layouts, page types, props schema.
   Exposed as window.CRMB. Every draggable block maps to a real Lightning
   component + a set of configurable properties that flow into the export so
   the generated FlexiPage / LWC matches what was designed.

   Prop schema entry: { k:key, l:label, t:'text'|'textarea'|'number'|'select'|'toggle', d:default, o:[options] } */
(function () {
  // ------------------------------------------------------------- page types
  const pageTypes = {
    record: { label: "Record Page", flexiType: "RecordPage", lwcTarget: "lightning__RecordPage", object: "Contact", objectIcon: "standard:contact" },
    app: { label: "App / Home Page", flexiType: "AppPage", lwcTarget: "lightning__AppPage,lightning__HomePage", object: "", objectIcon: "standard:home" },
  };

  // ------------------------------------------------------------- layouts
  // rows: ordered rows of { region, flex }. Header rows usually one full region.
  const layouts = {
    "header-right": {
      label: "Header + Right Sidebar", icon: "utility:side_list",
      flexiTemplate: "flexipage:recordHomeTemplateDesktop", primary: "main",
      rows: [[{ region: "header", flex: 1 }], [{ region: "main", flex: 1.7 }, { region: "sidebar", flex: 1 }]],
    },
    "header-left": {
      label: "Header + Left Sidebar", icon: "utility:side_list",
      flexiTemplate: "flexipage:recordHomeLeftSidebarTemplateDesktop", primary: "main",
      rows: [[{ region: "header", flex: 1 }], [{ region: "sidebar", flex: 1 }, { region: "main", flex: 1.7 }]],
    },
    "one": {
      label: "One Region", icon: "utility:layout_banner",
      flexiTemplate: "flexipage:defaultTemplateDesktop", primary: "main",
      rows: [[{ region: "header", flex: 1 }], [{ region: "main", flex: 1 }]],
    },
    "two-even": {
      label: "Two Columns (Even)", icon: "utility:columns",
      flexiTemplate: "flexipage:twoColumnTemplateDesktop", primary: "left",
      rows: [[{ region: "header", flex: 1 }], [{ region: "left", flex: 1 }, { region: "right", flex: 1 }]],
    },
    "three": {
      label: "Three Columns", icon: "utility:layout",
      flexiTemplate: "flexipage:threeColumnTemplateDesktop", primary: "main",
      rows: [[{ region: "header", flex: 1 }], [{ region: "left", flex: 1 }, { region: "main", flex: 1.6 }, { region: "right", flex: 1 }]],
    },
    "pinned-left": {
      label: "Pinned Left + Main + Right", icon: "utility:pinned",
      flexiTemplate: "flexipage:pinnedLeftRegionTemplateDesktop", primary: "main",
      rows: [[{ region: "left", flex: 1 }, { region: "main", flex: 2 }, { region: "right", flex: 1 }]],
    },
  };
  // friendly region labels
  const regionLabels = { header: "Header", subheader: "Subheader", main: "Main", sidebar: "Sidebar", left: "Left", right: "Right" };

  // ------------------------------------------------------------- catalog
  const catalog = [
    // ---- Record ----
    { type: "highlights", label: "Highlights Panel", icon: "standard:record", group: "Record", region: "header",
      desc: "Record header: icon, name, key fields & actions", flexipage: "force:highlightsPanel", lwc: "lightning-card",
      props: [{ k: "object", l: "Object", t: "text", d: "Contact" }, { k: "recordName", l: "Record name", t: "text", d: "Lando Voss" }, { k: "showActions", l: "Show actions", t: "toggle", d: true }] },
    { type: "path", label: "Path", icon: "utility:trail", group: "Record", region: "header",
      desc: "Sales/case stage path with guidance", flexipage: "runtime_sales_path:path", lwc: "lightning-progress-indicator",
      props: [{ k: "picklist", l: "Picklist field", t: "text", d: "StageName" }, { k: "current", l: "Current step (0-based)", t: "number", d: 3 }] },
    { type: "recordDetail", label: "Record Detail", icon: "utility:record_lookup", group: "Record", region: "main",
      desc: "Read/edit view of record fields", flexipage: "force:detailPanel", lwc: "lightning-record-form",
      props: [{ k: "columns", l: "Columns", t: "select", d: "2", o: ["1", "2"] }, { k: "mode", l: "Mode", t: "select", d: "readonly", o: ["readonly", "edit", "view"] }] },
    { type: "relatedRecord", label: "Related Record", icon: "standard:account", group: "Record", region: "sidebar",
      desc: "Inline view/edit of a parent record", flexipage: "force:relatedRecord", lwc: "lightning-record-form",
      props: [{ k: "relationship", l: "Relationship", t: "text", d: "AccountId" }, { k: "title", l: "Title", t: "text", d: "Account" }] },
    { type: "fieldSection", label: "Field Section", icon: "utility:layout", group: "Record", region: "main",
      desc: "A grouped section of record fields", flexipage: "flexipage:fieldSection", lwc: "lightning-record-form",
      props: [{ k: "title", l: "Section title", t: "text", d: "Contact Information" }, { k: "columns", l: "Columns", t: "select", d: "2", o: ["1", "2"] }] },

    // ---- Related Lists ----
    { type: "relatedList", label: "Related List — Single", icon: "standard:related_list", group: "Related Lists", region: "main",
      desc: "One child object list (e.g. Opportunities)", flexipage: "force:relatedListSingleContainer", lwc: "lightning-datatable",
      props: [{ k: "relatedObject", l: "Related object", t: "text", d: "Opportunity" }, { k: "title", l: "Title", t: "text", d: "Opportunities" }, { k: "rows", l: "Rows to show", t: "number", d: 3 }] },
    { type: "relatedLists", label: "Related Lists", icon: "standard:related_list", group: "Related Lists", region: "main",
      desc: "All related lists for the record", flexipage: "force:relatedListContainer", lwc: "lightning-tabset",
      props: [{ k: "objects", l: "Objects (comma)", t: "text", d: "Opportunities, Cases, Files" }] },

    // ---- Activity & Collaboration ----
    { type: "activity", label: "Activity Timeline", icon: "standard:timeline", group: "Activity & Collaboration", region: "sidebar",
      desc: "Chronological calls, emails & events", flexipage: "runtime_sales_activities:activityPanel", lwc: "lightning-card",
      props: [{ k: "title", l: "Title", t: "text", d: "Activity" }] },
    { type: "activities", label: "Activities (Composer)", icon: "standard:task", group: "Activity & Collaboration", region: "main",
      desc: "Log a Call / New Task / Email tabs", flexipage: "runtime_sales_activities:activityComposer", lwc: "lightning-tabset",
      props: [{ k: "tabs", l: "Tabs (comma)", t: "text", d: "Log a Call, New Task, Email" }] },
    { type: "chatterFeed", label: "Chatter Feed", icon: "standard:feed", group: "Activity & Collaboration", region: "main",
      desc: "Record feed of posts & comments", flexipage: "forceChatter:feedContainer", lwc: "lightning-card",
      props: [{ k: "title", l: "Title", t: "text", d: "Chatter" }] },
    { type: "chatterPublisher", label: "Chatter Publisher", icon: "standard:feed", group: "Activity & Collaboration", region: "main",
      desc: "Post composer (text / poll / link)", flexipage: "forceChatter:publisher", lwc: "lightning-card",
      props: [{ k: "placeholder", l: "Placeholder", t: "text", d: "Share an update…" }] },
    { type: "topics", label: "Topics", icon: "standard:topic", group: "Activity & Collaboration", region: "sidebar",
      desc: "Topic tags assigned to the record", flexipage: "forceChatter:topics", lwc: "lightning-card",
      props: [{ k: "topics", l: "Topics (comma)", t: "text", d: "Enterprise, Renewal, Strategic" }] },

    // ---- Lists & Tables ----
    { type: "listView", label: "List View", icon: "utility:table", group: "Lists & Tables", region: "main",
      desc: "Full object list view with toolbar", flexipage: "force:listViewManager", lwc: "lightning-datatable",
      props: [{ k: "object", l: "Object", t: "text", d: "Contact" }, { k: "view", l: "List view", t: "text", d: "Recently Viewed" }, { k: "rows", l: "Rows", t: "number", d: 5 }, { k: "rowNumbers", l: "Row numbers", t: "toggle", d: true }] },
    { type: "dataTable", label: "Data Table", icon: "utility:table", group: "Lists & Tables", region: "main",
      desc: "Generic sortable, selectable table", flexipage: "flexipage:datatable", lwc: "lightning-datatable",
      props: [{ k: "selectable", l: "Selectable rows", t: "toggle", d: true }, { k: "rows", l: "Rows", t: "number", d: 3 }] },
    { type: "recentItems", label: "Recent Items", icon: "standard:recent", group: "Lists & Tables", region: "sidebar",
      desc: "Recently accessed records", flexipage: "force:recentItems", lwc: "lightning-card",
      props: [{ k: "title", l: "Title", t: "text", d: "Recent Items" }, { k: "rows", l: "Items", t: "number", d: 4 }] },

    // ---- Analytics ----
    { type: "reportChart", label: "Report Chart", icon: "standard:report", group: "Analytics", region: "sidebar",
      desc: "Embedded report summary chart", flexipage: "force:reportChart", lwc: "lightning-card",
      props: [{ k: "report", l: "Report name", t: "text", d: "Pipeline by Stage" }, { k: "chartType", l: "Chart type", t: "select", d: "bar", o: ["bar", "column", "donut", "line"] }] },
    { type: "dashboard", label: "Dashboard", icon: "standard:dashboard", group: "Analytics", region: "main",
      desc: "Embedded dashboard with KPIs", flexipage: "force:dashboard", lwc: "lightning-card",
      props: [{ k: "dashboard", l: "Dashboard name", t: "text", d: "Sales Performance" }] },
    { type: "metrics", label: "Metric / KPI", icon: "utility:metrics", group: "Analytics", region: "header",
      desc: "Row of single-value KPI tiles", flexipage: "flexipage:metricsRow", lwc: "lightning-card",
      props: [{ k: "kpis", l: "KPIs (label:value, …)", t: "textarea", d: "Open Pipeline: $1.2M\nClosed Won: $320K\nWin Rate: 42%" }] },

    // ---- Layout ----
    { type: "tabs", label: "Tabs", icon: "utility:tabset", group: "Layout", region: "main",
      desc: "Tabbed region", flexipage: "flexipage:tab2", lwc: "lightning-tabset",
      props: [{ k: "tabs", l: "Tab labels (comma)", t: "text", d: "Details, Related, News" }, { k: "variant", l: "Variant", t: "select", d: "standard", o: ["standard", "scoped", "vertical"] }] },
    { type: "accordion", label: "Accordion", icon: "utility:rows", group: "Layout", region: "main",
      desc: "Stacked expand/collapse sections", flexipage: "flexipage:accordion", lwc: "lightning-accordion",
      props: [{ k: "sections", l: "Sections (comma)", t: "text", d: "Contact Information, Additional Details" }, { k: "multiple", l: "Allow multiple open", t: "toggle", d: false }] },
    { type: "card", label: "Card", icon: "standard:report", group: "Layout", region: "main",
      desc: "Titled container for any content", flexipage: "flexipage:card", lwc: "lightning-card",
      props: [{ k: "title", l: "Title", t: "text", d: "Card Title" }, { k: "icon", l: "Icon", t: "text", d: "standard:report" }] },
    { type: "richText", label: "Rich Text", icon: "utility:richtextbox", group: "Layout", region: "sidebar",
      desc: "Static formatted text block", flexipage: "flexipage:richText", lwc: "lightning-formatted-rich-text",
      props: [{ k: "content", l: "Content", t: "textarea", d: "Key Account. Strategic enterprise customer since 2021." }] },

    // ---- Productivity & Custom ----
    { type: "map", label: "Map", icon: "standard:address", group: "Productivity & Custom", region: "sidebar",
      desc: "Map with record address markers", flexipage: "force:map", lwc: "lightning-map",
      props: [{ k: "address", l: "Address", t: "text", d: "415 Mission St, San Francisco, CA" }, { k: "zoom", l: "Zoom", t: "number", d: 14 }] },
    { type: "customLwc", label: "Custom LWC", icon: "utility:apex", group: "Productivity & Custom", region: "main",
      desc: "A developer's own Lightning Web Component", flexipage: "c:customComponent", lwc: "c-custom-component",
      props: [{ k: "tag", l: "Component tag", t: "text", d: "c-my-component" }, { k: "label", l: "Display label", t: "text", d: "My Component" }, { k: "bodyColumns", l: "Body columns", t: "select", d: "1", o: ["1", "2"] }, { k: "attrs", l: "Attributes (when empty)", t: "text", d: "record-id={recordId}" }] },
    { type: "visualforce", label: "Visualforce Page", icon: "utility:page", group: "Productivity & Custom", region: "main",
      desc: "Embedded Visualforce page (iframe)", flexipage: "flexipage:visualforcePage", lwc: "lightning-card",
      props: [{ k: "page", l: "VF page name", t: "text", d: "ContactMap" }, { k: "height", l: "Height (px)", t: "number", d: 320 }] },
  ];

  // Full lightning base-component catalog (mirrors the LWC Reference), grouped by
  // the official functional categories. Each entry can be nested INSIDE a Custom
  // LWC body. [label, tag, icon, previewKind]. previewKind '' → generic placeholder.
  const baseGroups = [
    { title: "Actions & Menus", items: [
      ["Button", "lightning-button", "utility:new_window", "button"],
      ["Button Group", "lightning-button-group", "utility:apps", "buttongroup"],
      ["Button Icon", "lightning-button-icon", "utility:edit", "buttonicon"],
      ["Button Icon Stateful", "lightning-button-icon-stateful", "utility:favorite", "buttonicon"],
      ["Button Menu", "lightning-button-menu", "utility:threedots_vertical", "button"],
      ["Button Stateful", "lightning-button-stateful", "utility:check", "button"],
      ["Click To Dial", "lightning-click-to-dial", "utility:call", "text"],
      ["Flow", "lightning-flow", "utility:trail", "card"],
    ]},
    { title: "Containers", items: [
      ["Accordion", "lightning-accordion", "utility:rows", "accordion"],
      ["Card", "lightning-card", "standard:record", "card"],
      ["Carousel", "lightning-carousel", "utility:right", "card"],
      ["Layout Grid", "lightning-layout", "utility:apps", "card"],
      ["Modal", "lightning-modal", "utility:expand", "card"],
      ["Quick Action Panel", "lightning-quick-action-panel", "utility:edit", "card"],
      ["Tab Set", "lightning-tabset", "utility:rows", "tabset"],
      ["Tile", "lightning-tile", "utility:table", "card"],
    ]},
    { title: "Images & Visuals", items: [
      ["Avatar", "lightning-avatar", "utility:user", "avatar"],
      ["Badge", "lightning-badge", "utility:topic", "badge"],
      ["Dynamic Icon", "lightning-dynamic-icon", "utility:trending", "icon"],
      ["Empty State", "lightning-empty-state", "utility:info", "empty"],
      ["Helptext", "lightning-helptext", "utility:help", "text"],
      ["Icon", "lightning-icon", "utility:apps", "icon"],
      ["Illustration", "lightning-illustration", "utility:image", "empty"],
      ["Map", "lightning-map", "standard:address", "map"],
      ["Pill", "lightning-pill", "utility:topic", "pill"],
      ["Pill Container", "lightning-pill-container", "utility:topic", "pill"],
    ]},
    { title: "Input", items: [
      ["Checkbox Group", "lightning-checkbox-group", "utility:check", "checkbox"],
      ["Combobox", "lightning-combobox", "utility:picklist_type", "combobox"],
      ["Dual Listbox", "lightning-dual-listbox", "utility:list", "duallist"],
      ["File Upload", "lightning-file-upload", "utility:attach", "fileupload"],
      ["Input", "lightning-input", "utility:edit", "input"],
      ["Input Address", "lightning-input-address", "utility:location", "input"],
      ["Input Location", "lightning-input-location", "utility:location", "input"],
      ["Input Name", "lightning-input-name", "utility:user", "input"],
      ["Checkbox Button", "lightning-input", "utility:check", "checkbox"],
      ["Input Rich Text", "lightning-input-rich-text", "utility:richtextbox", "richtext"],
      ["Radio Group", "lightning-radio-group", "utility:check", "radio"],
      ["Record Picker", "lightning-record-picker", "utility:search", "combobox"],
      ["Select", "lightning-select", "utility:picklist_type", "select"],
      ["Slider", "lightning-slider", "utility:settings", "slider"],
      ["Text Area", "lightning-textarea", "utility:justify_text", "textarea"],
      ["Checkbox", "lightning-input", "utility:check", "checkbox"],
      ["Toggle", "lightning-input", "utility:settings", "toggle"],
    ]},
    { title: "Forms", items: [
      ["Record Form", "lightning-record-form", "utility:record_lookup", "recordform"],
      ["Record Edit Form", "lightning-record-edit-form", "utility:edit", "recordform"],
      ["Input Field", "lightning-input-field", "utility:edit", "input"],
      ["Record View Form", "lightning-record-view-form", "utility:preview", "recordform"],
      ["Output Field", "lightning-output-field", "utility:text", "text"],
    ]},
    { title: "Navigation", items: [
      ["Breadcrumbs", "lightning-breadcrumbs", "utility:chevronright", "breadcrumbs"],
      ["Vertical Navigation", "lightning-vertical-navigation", "utility:rows", "card"],
    ]},
    { title: "Notifications", items: [
      ["Alert", "lightning-alert", "utility:warning", "alert"],
      ["Confirm", "lightning-confirm", "utility:check", "alert"],
      ["Prompt", "lightning-prompt", "utility:edit", "alert"],
      ["Toast", "lightning-toast", "utility:notification", "alert"],
      ["Toast Container", "lightning-toast-container", "utility:notification", "alert"],
      ["Platform Show Toast Event", "lightning-platform-show-toast-event", "utility:notification", "text"],
    ]},
    { title: "Output", items: [
      ["Formatted Address", "lightning-formatted-address", "utility:location", "formatted"],
      ["Formatted Date Time", "lightning-formatted-date-time", "utility:date_input", "formatted"],
      ["Formatted Email", "lightning-formatted-email", "utility:email", "formatted"],
      ["Formatted Location", "lightning-formatted-location", "utility:location", "formatted"],
      ["Formatted Name", "lightning-formatted-name", "utility:user", "formatted"],
      ["Formatted Number", "lightning-formatted-number", "utility:metrics", "formatted"],
      ["Formatted Phone", "lightning-formatted-phone", "utility:call", "formatted"],
      ["Formatted Rich Text", "lightning-formatted-rich-text", "utility:richtextbox", "richtext"],
      ["Formatted Text", "lightning-formatted-text", "utility:text", "text"],
      ["Formatted Time", "lightning-formatted-time", "utility:clock", "formatted"],
      ["Formatted URL", "lightning-formatted-url", "utility:link", "formatted"],
      ["Relative Date Time", "lightning-relative-date-time", "utility:clock", "formatted"],
    ]},
    { title: "Progress", items: [
      ["Progress Bar", "lightning-progress-bar", "utility:metrics", "progress"],
      ["Progress Indicator", "lightning-progress-indicator", "utility:trail", "path"],
      ["Progress Ring", "lightning-progress-ring", "utility:metrics", "ring"],
      ["Spinner", "lightning-spinner", "utility:refresh", "spinner"],
    ]},
    { title: "Tables & Trees", items: [
      ["Datatable", "lightning-datatable", "utility:table", "datatable"],
      ["Tree", "lightning-tree", "utility:rows", "tree"],
      ["Tree Grid", "lightning-tree-grid", "utility:table", "datatable"],
      ["Dynamic List", "lightning-dynamic-list-container", "utility:list", "tree"],
    ]},
    { title: "Mobile", items: [
      ["Barcode Scanner", "lightning-barcode-scanner", "utility:search", "card"],
    ]},
    { title: "OmniStudio", items: [
      ["FlexCard", "omnistudio-flexcard", "standard:record", "card"],
      ["OmniScript", "omnistudio-omniscript", "utility:trail", "path"],
      ["PubSub", "omnistudio-pubsub", "utility:share", "text"],
    ]},
    { title: "Text & Layout", items: [
      ["Heading", "lightning-formatted-heading", "utility:text", "heading"],
      ["Text Block", "lightning-formatted-text", "utility:justify_text", "textblock"],
      ["Divider", "lightning-layout", "utility:dash", "divider"],
      ["Spacer", "lightning-layout", "utility:expand_alt", "spacer"],
    ]},
  ];
  const slugify = (s) => "b-" + String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const baseComponents = [];
  baseGroups.forEach((g) => g.items.forEach((it) => baseComponents.push({ label: it[0], base: it[1], icon: it[2], preview: it[3] || "", group: g.title, id: slugify(it[0]) })));
  const baseById = {};
  baseComponents.forEach((b) => (baseById[b.id] = b));
  // legacy: lookup by tag (first match) — kept for any older saved state
  const baseByTag = {};
  baseComponents.forEach((b) => { if (!baseByTag[b.base]) baseByTag[b.base] = b; });

  const byType = {};
  catalog.forEach((c) => (byType[c.type] = c));

  function defaultProps(type) {
    const c = byType[type];
    const p = {};
    (c.props || []).forEach((pr) => (p[pr.k] = pr.d));
    return p;
  }

  // starter layout (for the default header-right record page)
  const starter = {
    header: [mk("highlights"), mk("path")],
    main: [mk("recordDetail"), mk("relatedList")],
    sidebar: [mk("activity"), mk("reportChart")],
  };
  function mk(type) { return { type, props: defaultProps(type) }; }

  window.CRMB = { pageTypes, layouts, regionLabels, catalog, byType, defaultProps, starter, baseGroups, baseComponents, baseById, baseByTag };
})();
