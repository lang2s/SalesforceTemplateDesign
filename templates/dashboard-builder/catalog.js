/* Dashboard Builder — catalog: widget types, palettes, sample datasets, props.
   Exposed as window.DBB. Each widget maps to a real Salesforce dashboard
   component type (componentType) + configurable properties that flow into the
   exported .dashboard-meta.xml / JSON.

   Prop schema entry: { k:key, l:label, t:'text'|'textarea'|'number'|'select'|'toggle', d:default, o:[options] } */
(function () {
  // ----------------------------------------------------------- color palettes
  const palettes = {
    Salesforce: ["#1B96FF", "#9050E9", "#06A59A", "#FE9339", "#E16032", "#3BA755", "#F5325C", "#0B827C"],
    Cool:       ["#0176D3", "#5867E8", "#06A59A", "#1B96FF", "#9050E9", "#0B827C", "#78B0FB", "#04844B"],
    Warm:       ["#FE9339", "#E16032", "#BA0517", "#F5325C", "#DD7A01", "#944D00", "#FFB75D", "#8C4B02"],
    Ocean:      ["#032D60", "#0B5CAB", "#1B96FF", "#78B0FB", "#06A59A", "#0B827C", "#AACBFF", "#04E1CB"],
  };

  // ----------------------------------------------------------- sample datasets
  // groupings keyed by a "dataset" name; charts pick one via the groupBy prop.
  const datasets = {
    stage: { label: "Stage", cats: ["Qualify", "Discovery", "Proposal", "Negotiation", "Closed Won"], series: [{ name: "Amount", data: [120, 98, 156, 84, 210] }] },
    month: { label: "Close Month", cats: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"], series: [{ name: "Won", data: [86, 124, 98, 168, 142, 196] }, { name: "Pipeline", data: [140, 160, 180, 150, 175, 220] }] },
    source: { label: "Lead Source", cats: ["Web", "Referral", "Partner", "Event", "Outbound"], series: [{ name: "Leads", data: [320, 210, 168, 132, 96] }] },
    owner: { label: "Owner", cats: ["A. Guevara", "M. Stone", "P. Reyes", "L. Cho", "K. Adler"], series: [{ name: "Amount", data: [184, 152, 138, 96, 72] }] },
    type: { label: "Type", cats: ["New Business", "Existing", "Renewal", "Upsell"], series: [{ name: "Amount", data: [240, 180, 160, 90] }] },
    industry: { label: "Industry", cats: ["Tech", "Finance", "Media", "Retail", "Health", "Energy"], series: [{ name: "Accounts", data: [64, 48, 36, 28, 22, 14] }] },
  };
  const datasetKeys = Object.keys(datasets);
  const groupOptions = datasetKeys.map((k) => datasets[k].label);
  const labelToKey = {};
  datasetKeys.forEach((k) => (labelToKey[datasets[k].label] = k));

  const measures = ["Sum of Amount", "Record Count", "Average Amount", "Sum of ARR", "Max of Amount"];
  const reports = ["Pipeline by Stage", "Revenue Trend", "Leads by Source", "Top Accounts", "Win Rate by Owner", "Open Opportunities"];

  // ----------------------------------------------------------- shared prop sets
  const P = {
    title: (d) => ({ k: "title", l: "Title", t: "text", d }),
    report: (d) => ({ k: "report", l: "Source report", t: "select", d: d || reports[0], o: reports }),
    measure: (d) => ({ k: "measure", l: "Measure", t: "select", d: d || measures[0], o: measures }),
    groupBy: (d) => ({ k: "groupBy", l: "Group by", t: "select", d: d || groupOptions[0], o: groupOptions }),
    palette: () => ({ k: "palette", l: "Palette", t: "select", d: "inherit", o: ["inherit", "Salesforce", "Cool", "Warm", "Ocean"] }),
    units: () => ({ k: "units", l: "Display units", t: "select", d: "Shortened", o: ["Full", "Shortened", "Auto"] }),
    showValues: (d) => ({ k: "showValues", l: "Show values", t: "toggle", d: d == null ? true : d }),
    legend: () => ({ k: "legend", l: "Legend", t: "select", d: "Right", o: ["None", "Right", "Bottom"] }),
    maxRows: (d) => ({ k: "maxRows", l: "Max groups", t: "number", d: d || 5 }),
  };

  // ----------------------------------------------------------- widget catalog
  const catalog = [
    // ---- Bar & Column ----
    { type: "bar", label: "Bar Chart", icon: "utility:chart", group: "Bar & Column", sfType: "Bar", w: 4, h: 3,
      desc: "Horizontal bars compare groups", props: [P.title("Pipeline by Stage"), P.report("Pipeline by Stage"), P.groupBy("Stage"), P.measure(), P.units(), P.showValues(), P.palette(), P.maxRows()] },
    { type: "column", label: "Column Chart", icon: "utility:chart", group: "Bar & Column", sfType: "Column", w: 4, h: 3,
      desc: "Vertical columns compare groups", props: [P.title("Revenue by Month"), P.report("Revenue Trend"), P.groupBy("Close Month"), P.measure(), P.units(), P.showValues(), P.palette()] },
    { type: "stackedBar", label: "Stacked Bar", icon: "utility:chart", group: "Bar & Column", sfType: "BarStacked", w: 4, h: 3,
      desc: "Bars split into series segments", props: [P.title("Pipeline by Month"), P.report("Revenue Trend"), P.groupBy("Close Month"), P.measure(), P.units(), P.legend(), P.palette()] },
    { type: "stackedColumn", label: "Stacked Column", icon: "utility:chart", group: "Bar & Column", sfType: "ColumnStacked", w: 4, h: 3,
      desc: "Columns split into series segments", props: [P.title("Bookings by Month"), P.report("Revenue Trend"), P.groupBy("Close Month"), P.measure(), P.units(), P.legend(), P.palette()] },

    // ---- Line & Trend ----
    { type: "line", label: "Line Chart", icon: "utility:graph", group: "Line & Trend", sfType: "Line", w: 6, h: 3,
      desc: "Trend over an ordered grouping", props: [P.title("Revenue Trend"), P.report("Revenue Trend"), P.groupBy("Close Month"), P.measure(), P.units(), P.legend(), P.showValues(false), P.palette()] },
    { type: "cumulativeLine", label: "Cumulative Line", icon: "utility:trending", group: "Line & Trend", sfType: "LineCumulative", w: 6, h: 3,
      desc: "Running total across the grouping", props: [P.title("Cumulative Bookings"), P.report("Revenue Trend"), P.groupBy("Close Month"), P.measure(), P.units(), P.palette()] },
    { type: "area", label: "Area Chart", icon: "utility:trending", group: "Line & Trend", sfType: "Line", w: 6, h: 3,
      desc: "Line with filled area below", props: [P.title("Pipeline Growth"), P.report("Revenue Trend"), P.groupBy("Close Month"), P.measure(), P.units(), P.palette()] },
    { type: "combo", label: "Combo Chart", icon: "utility:graph", group: "Line & Trend", sfType: "Column", w: 6, h: 3,
      desc: "Columns + line overlay", props: [P.title("Won vs. Pipeline"), P.report("Revenue Trend"), P.groupBy("Close Month"), P.measure(), P.units(), P.legend(), P.palette()] },

    // ---- Proportion ----
    { type: "donut", label: "Donut Chart", icon: "utility:donut_chart", group: "Proportion", sfType: "Donut", w: 3, h: 3,
      desc: "Share of total per group", props: [P.title("Amount by Type"), P.report("Open Opportunities"), P.groupBy("Type"), P.measure(), P.units(), P.legend(), P.showValues(), P.palette()] },
    { type: "pie", label: "Pie Chart", icon: "utility:donut_chart", group: "Proportion", sfType: "Pie", w: 3, h: 3,
      desc: "Classic pie of group shares", props: [P.title("Leads by Source"), P.report("Leads by Source"), P.groupBy("Lead Source"), P.measure("Record Count"), P.legend(), P.palette()] },
    { type: "funnel", label: "Funnel Chart", icon: "utility:filter", group: "Proportion", sfType: "Funnel", w: 3, h: 4,
      desc: "Stage-by-stage drop-off", props: [P.title("Conversion Funnel"), P.report("Pipeline by Stage"), P.groupBy("Stage"), P.measure("Record Count"), P.showValues(), P.palette()] },

    // ---- Distribution ----
    { type: "scatter", label: "Scatter Plot", icon: "utility:graph", group: "Distribution", sfType: "Scatter", w: 4, h: 3,
      desc: "Two-measure point distribution", props: [P.title("Amount vs. Age"), P.report("Open Opportunities"), P.groupBy("Owner"), P.measure(), P.palette()] },
    { type: "heatMap", label: "Heat Map", icon: "utility:apps", group: "Distribution", sfType: "HeatMap", w: 4, h: 3,
      desc: "Color-graded matrix of values", props: [P.title("Activity Heat Map"), P.report("Win Rate by Owner"), P.groupBy("Owner"), P.measure("Record Count"), P.palette()] },

    // ---- Gauge & Metric ----
    { type: "gauge", label: "Gauge", icon: "utility:metrics", group: "Gauge & Metric", sfType: "Gauge", w: 3, h: 3,
      desc: "Progress toward a target", props: [P.title("Quota Attainment"), P.report("Win Rate by Owner"), P.measure(), { k: "min", l: "Min", t: "number", d: 0 }, { k: "max", l: "Max (target)", t: "number", d: 100 }, { k: "value", l: "Current value", t: "number", d: 68 }, { k: "low", l: "Low breakpoint", t: "number", d: 34 }, { k: "high", l: "High breakpoint", t: "number", d: 67 }, P.units()] },
    { type: "metric", label: "Metric / KPI", icon: "utility:number_input", group: "Gauge & Metric", sfType: "Metric", w: 2, h: 2,
      desc: "Single big number with label", props: [P.title("Closed Won"), P.report("Open Opportunities"), P.measure(), { k: "value", l: "Value", t: "text", d: "$1.24M" }, { k: "delta", l: "Delta (e.g. +12%)", t: "text", d: "+12%" }, { k: "trend", l: "Trend", t: "select", d: "up", o: ["up", "down", "flat"] }, { k: "accent", l: "Accent", t: "toggle", d: true }] },

    // ---- Tables ----
    { type: "table", label: "Table", icon: "utility:table", group: "Tables", sfType: "Table", w: 6, h: 3,
      desc: "Grouped summary rows", props: [P.title("Pipeline by Stage"), P.report("Pipeline by Stage"), P.groupBy("Stage"), P.measure(), P.maxRows(6), { k: "showTotal", l: "Show grand total", t: "toggle", d: true }] },
    { type: "lightningTable", label: "Lightning Table", icon: "utility:table", group: "Tables", sfType: "LightningTable", w: 6, h: 3,
      desc: "Record-level columns, sortable", props: [P.title("Top Opportunities"), P.report("Open Opportunities"), { k: "columns", l: "Columns (comma)", t: "text", d: "Opportunity, Amount, Stage, Close Date" }, P.maxRows(5), { k: "rowNumbers", l: "Row numbers", t: "toggle", d: true }] },
    { type: "pivot", label: "Pivot Table", icon: "utility:matrix", group: "Tables", sfType: "PivotTable", w: 6, h: 3,
      desc: "Rows × columns matrix of a measure", props: [P.title("Stage × Month"), P.report("Pipeline by Stage"), { k: "rowGroup", l: "Row group", t: "select", d: "Stage", o: groupOptions }, { k: "colGroup", l: "Column group", t: "select", d: "Type", o: groupOptions }, P.measure(), P.units()] },

    // ---- Other ----
    { type: "text", label: "Text Widget", icon: "utility:richtextbox", group: "Other", sfType: "Text", w: 3, h: 2,
      desc: "Rich text / heading block", props: [{ k: "heading", l: "Heading", t: "text", d: "Q3 Summary" }, { k: "content", l: "Body", t: "textarea", d: "Pipeline is up 18% QoQ. Renewal motion on track; watch enterprise win rate." }, { k: "align", l: "Align", t: "select", d: "left", o: ["left", "center"] }] },
    { type: "image", label: "Image Widget", icon: "utility:image", group: "Other", sfType: "Image", w: 3, h: 2,
      desc: "Logo or static image", props: [{ k: "label", l: "Caption", t: "text", d: "Global Media" }, { k: "url", l: "Image URL", t: "text", d: "" }] },
    { type: "filter", label: "Filter", icon: "utility:filterList", group: "Other", sfType: "Filter", w: 12, h: 1,
      desc: "Dashboard-wide filter bar", props: [{ k: "fields", l: "Filters (comma)", t: "text", d: "Close Date, Stage, Owner, Type" }] },
  ];

  const byType = {};
  catalog.forEach((c) => (byType[c.type] = c));

  function defaultProps(type) {
    const c = byType[type];
    const p = {};
    (c.props || []).forEach((pr) => (p[pr.k] = pr.d));
    return p;
  }
  function mk(type, over) { return { type, props: Object.assign(defaultProps(type), over || {}) }; }

  // ----------------------------------------------------------- starter dashboard
  function starter() {
    return [
      { w: 12, h: 1, ...mk("filter") },
      { w: 2, h: 2, ...mk("metric", { title: "Closed Won", value: "$1.24M", delta: "+12%", trend: "up" }) },
      { w: 2, h: 2, ...mk("metric", { title: "Open Pipeline", value: "$4.8M", delta: "+6%", trend: "up", accent: false }) },
      { w: 3, h: 2, ...mk("gauge") },
      { w: 5, h: 3, ...mk("column", { title: "Revenue by Month" }) },
      { w: 4, h: 3, ...mk("bar") },
      { w: 3, h: 3, ...mk("donut") },
      { w: 5, h: 3, ...mk("line") },
      { w: 7, h: 3, ...mk("table") },
    ];
  }

  window.DBB = { palettes, datasets, datasetKeys, groupOptions, labelToKey, measures, reports, catalog, byType, defaultProps, mk, starter };
})();
