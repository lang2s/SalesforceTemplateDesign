/* Dashboard Builder — export generators.
   window.DBBExport: dashboardXml, json, mock. */
(function () {
  const { byType, labelToKey, datasets } = window.DBB;
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  // ----- helpers -----
  function colSpanToSize(w) { return w; } // 1..12 grid columns
  function devName(s) { return String(s || "").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "Component"; }

  // ---------------------------------------------------------------- Dashboard XML
  function dashboardXml(state) {
    const cols = state.settings.columns || 12;
    const comps = state.widgets.filter((w) => w.type !== "filter").map((w, idx) => {
      const c = byType[w.type], p = w.props || {};
      const lines = [
        "    <components>",
        `        <componentType>${esc(c.sfType)}</componentType>`,
        p.title ? `        <header>${esc(p.title)}</header>` : null,
        p.report ? `        <reportName>${esc(devName(p.report))}</reportName>` : null,
        c.sfType === "Metric" ? null : (p.groupBy ? `        <groupingColumn>${esc(p.groupBy)}</groupingColumn>` : null),
        p.measure ? `        <summaryField>${esc(p.measure)}</summaryField>` : null,
        p.units ? `        <displayUnits>${esc(p.units)}</displayUnits>` : null,
        p.legend ? `        <legendPosition>${esc(p.legend)}</legendPosition>` : null,
        w.type === "metric" && p.value != null ? `        <metricLabel>${esc(p.title)}</metricLabel>` : null,
        w.type === "gauge" ? `        <gaugeMin>${esc(p.min)}</gaugeMin>\n        <gaugeMax>${esc(p.max)}</gaugeMax>\n        <breakpointOne>${esc(p.low)}</breakpointOne>\n        <breakpointTwo>${esc(p.high)}</breakpointTwo>` : null,
        p.showValues != null ? `        <showPercentage>${!!p.showValues}</showPercentage>` : null,
        `        <colSpan>${colSpanToSize(w.w)}</colSpan>`,
        `        <rowSpan>${w.h}</rowSpan>`,
        "    </components>",
      ].filter((x) => x != null);
      return lines.join("\n");
    }).join("\n");

    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<Dashboard xmlns="http://soap.sforce.com/2006/04/metadata">',
      `    <title>${esc(state.settings.title)}</title>`,
      `    <description>${esc(state.settings.description || "")}</description>`,
      "    <dashboardType>SpecifiedUser</dashboardType>",
      `    <runningUser>${esc(state.settings.runningUser)}</runningUser>`,
      `    <dashboardGridLayout>`,
      `        <numberOfColumns>${cols}</numberOfColumns>`,
      "        <rowHeight>Medium</rowHeight>",
      "    </dashboardGridLayout>",
      `    <colorPalette>${esc(state.settings.palette)}</colorPalette>`,
      comps,
      "</Dashboard>",
    ].filter(Boolean).join("\n");
  }

  // ---------------------------------------------------------------- JSON
  function json(state) {
    return JSON.stringify({
      dashboard: {
        title: state.settings.title, folder: state.settings.folder, runningUser: state.settings.runningUser,
        description: state.settings.description, columns: state.settings.columns, palette: state.settings.palette,
      },
      widgets: state.widgets.map((w) => ({
        type: w.type, label: byType[w.type].label, salesforceType: byType[w.type].sfType,
        grid: { w: w.w, h: w.h }, properties: w.props,
      })),
    }, null, 2);
  }

  // ---------------------------------------------------------------- mockup
  function mock(state) {
    const list = state.widgets.map((w) => {
      const c = byType[w.type], p = w.props || {};
      const ps = Object.entries(p).filter(([, v]) => v !== "" && v != null && v !== false).map(([k, v]) => `${k}=${v}`).join(", ");
      return `  • ${c.label}  [${w.w}×${w.h}]${ps ? "\n      " + ps : ""}`;
    }).join("\n\n");
    return `<!--\n  ${state.settings.title}\n  Folder: ${state.settings.folder} · Running user: ${state.settings.runningUser}\n  Grid: ${state.settings.columns} columns · Palette: ${state.settings.palette}\n  ${state.widgets.length} widgets\n\n${list}\n\n  Tip: use Preview in the builder and screenshot for a pixel view.\n-->`;
  }

  window.DBBExport = { dashboardXml, json, mock };
})();
