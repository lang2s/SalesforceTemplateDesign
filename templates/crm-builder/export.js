/* CRM Page Builder — export generators (props + layout + settings aware).
   window.CRMBExport: flexipage, lwc, json, htmlMock. */
(function () {
  const { byType, layouts, pageTypes } = window.CRMB;

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function regionsOf(state) {
    const order = [];
    layouts[state.layout].rows.forEach((row) => row.forEach((cell) => order.push(cell.region)));
    return order;
  }

  // ---------------------------------------------------------------- FlexiPage
  function flexipage(state) {
    const pt = pageTypes[state.pageType];
    const regionXml = regionsOf(state).map((rn) => {
      const items = (state.regions[rn] || []).map((blk) => {
        const c = byType[blk.type];
        const props = Object.entries(blk.props || {}).filter(([, v]) => v !== "" && v != null).map(([k, v]) =>
          `                    <componentInstanceProperties>\n                        <name>${esc(k)}</name>\n                        <value>${esc(typeof v === "boolean" ? v : String(v).replace(/\n/g, " "))}</value>\n                    </componentInstanceProperties>`
        ).join("\n");
        return [
          "                <itemInstances>",
          "                    <componentInstance>",
          `                        <componentName>${c.flexipage}</componentName>`,
          props,
          "                    </componentInstance>",
          "                </itemInstances>",
        ].filter(Boolean).join("\n");
      }).join("\n");
      return [
        "        <flexiPageRegions>",
        `            <name>${rn}</name>`,
        "            <type>Region</type>",
        items || "            <!-- empty region -->",
        "        </flexiPageRegions>",
      ].join("\n");
    }).join("\n");

    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<FlexiPage xmlns="http://soap.sforce.com/2006/04/metadata">',
      regionXml,
      `    <masterLabel>${esc(state.settings.label)}</masterLabel>`,
      state.pageType === "record" && state.settings.object ? `    <sobjectType>${esc(state.settings.object)}</sobjectType>` : null,
      "    <template>",
      `        <name>${layouts[state.layout].flexiTemplate}</name>`,
      "    </template>",
      `    <type>${pt.flexiType}</type>`,
      "</FlexiPage>",
    ].filter(Boolean).join("\n");
  }

  // ---------------------------------------------------------------- LWC markup
  function lwcMarkup(blk, state) {
    const p = blk.props || {};
    const obj = state.settings.object || "Contact";
    switch (blk.type) {
      case "highlights":
        return `        <lightning-card icon-name="standard:contact" title="${esc(p.recordName)}">\n            <!-- force:highlightsPanel -->\n            ${p.showActions ? `<lightning-button-group slot="actions">\n                <lightning-button label="Follow"></lightning-button>\n                <lightning-button label="Edit"></lightning-button>\n            </lightning-button-group>` : ""}\n            <p class="slds-p-horizontal_medium">${esc(p.object)} highlights</p>\n        </lightning-card>`;
      case "path":
        return `        <lightning-progress-indicator type="path" current-step={currentStep} variant="base">\n            <!-- picklist: ${esc(p.picklist)} -->\n            <lightning-progress-step label="Qualification" value="qual"></lightning-progress-step>\n            <lightning-progress-step label="Proposal" value="prop"></lightning-progress-step>\n            <lightning-progress-step label="Negotiation" value="neg"></lightning-progress-step>\n            <lightning-progress-step label="Closed Won" value="won"></lightning-progress-step>\n        </lightning-progress-indicator>`;
      case "recordDetail":
      case "fieldSection":
        return `        <lightning-record-form\n            record-id={recordId}\n            object-api-name="${esc(obj)}"\n            fields={detailFields}\n            columns="${esc(p.columns || "2")}"\n            mode="${esc(p.mode || "readonly")}">\n        </lightning-record-form>`;
      case "relatedRecord":
        return `        <lightning-record-form record-id={accountId} object-api-name="Account" fields={accountFields} columns="1" mode="readonly"></lightning-record-form>`;
      case "relatedList":
        return `        <lightning-card title="${esc(p.title)}" icon-name="standard:related_list">\n            <!-- related object: ${esc(p.relatedObject)} · rows: ${esc(p.rows)} -->\n            <lightning-datatable key-field="id" data={relatedRecords} columns={relatedColumns} max-row-selection="${esc(p.rows)}"></lightning-datatable>\n        </lightning-card>`;
      case "relatedLists":
        return `        <lightning-tabset>\n            <!-- ${esc(p.objects)} -->\n            <lightning-tab label="Opportunities"><lightning-datatable key-field="id" data={relatedRecords} columns={relatedColumns}></lightning-datatable></lightning-tab>\n        </lightning-tabset>`;
      case "activity":
        return `        <lightning-card title="${esc(p.title)}" icon-name="standard:timeline">\n            <template for:each={activities} for:item="a">\n                <div key={a.id} class="slds-p-horizontal_medium slds-p-vertical_x-small">{a.title}</div>\n            </template>\n        </lightning-card>`;
      case "activities":
        return `        <lightning-tabset>\n            ${splitTabs(p.tabs).map((t) => `<lightning-tab label="${esc(t)}"></lightning-tab>`).join("\n            ")}\n        </lightning-tabset>`;
      case "chatterFeed":
      case "chatterPublisher":
        return `        <lightning-card title="${esc(p.title || "Chatter")}" icon-name="standard:feed">\n            <!-- Chatter ${blk.type === "chatterPublisher" ? "publisher" : "feed"} (forceChatter) -->\n        </lightning-card>`;
      case "topics":
        return `        <lightning-card title="Topics" icon-name="standard:topic">\n            ${splitTabs(p.topics).map((t) => `<lightning-pill label="${esc(t)}"></lightning-pill>`).join("\n            ")}\n        </lightning-card>`;
      case "listView":
        return `        <lightning-card title="${esc(p.view)}" icon-name="standard:datatable">\n            <lightning-datatable key-field="id" data={records} columns={columns} ${p.rowNumbers ? "show-row-number-column" : ""}></lightning-datatable>\n        </lightning-card>`;
      case "dataTable":
        return `        <lightning-datatable key-field="id" data={records} columns={columns} ${p.selectable ? "" : 'hide-checkbox-column'}></lightning-datatable>`;
      case "recentItems":
        return `        <lightning-card title="${esc(p.title)}" icon-name="standard:recent"></lightning-card>`;
      case "reportChart":
        return `        <lightning-card title="${esc(p.report)}" icon-name="standard:report">\n            <!-- chart type: ${esc(p.chartType)} — embed report chart -->\n        </lightning-card>`;
      case "dashboard":
        return `        <lightning-card title="${esc(p.dashboard)}" icon-name="standard:dashboard"></lightning-card>`;
      case "metrics":
        return `        <lightning-card>\n            <!-- KPIs -->\n${String(p.kpis || "").split("\n").map((l) => `            <!-- ${esc(l)} -->`).join("\n")}\n        </lightning-card>`;
      case "tabs":
        return `        <lightning-tabset variant="${esc(p.variant || "standard")}">\n            ${splitTabs(p.tabs).map((t) => `<lightning-tab label="${esc(t)}"></lightning-tab>`).join("\n            ")}\n        </lightning-tabset>`;
      case "accordion":
        return `        <lightning-accordion ${p.multiple ? "allow-multiple-sections-open" : ""}>\n            ${splitTabs(p.sections).map((s) => `<lightning-accordion-section name="${esc(s)}" label="${esc(s)}"></lightning-accordion-section>`).join("\n            ")}\n        </lightning-accordion>`;
      case "card":
        return `        <lightning-card title="${esc(p.title)}" icon-name="${esc(p.icon)}">\n            <p class="slds-p-horizontal_medium">Card content</p>\n        </lightning-card>`;
      case "richText":
        return `        <lightning-formatted-rich-text value={richText}></lightning-formatted-rich-text>`;
      case "map":
        return `        <lightning-map map-markers={mapMarkers} zoom-level="${esc(p.zoom)}"></lightning-map>`;
      case "customLwc": {
        const body = Array.isArray(p.body) ? p.body : [];
        if (!body.length) return `        <${esc(p.tag)} ${esc(p.attrs || "")}></${esc(p.tag)}>`;
        const tagFor = (c) => { const it = (window.CRMB.baseById && window.CRMB.baseById[c.key]) || (window.CRMB.baseByTag && window.CRMB.baseByTag[c.base]); return (it && it.base) || c.base || "lightning-card"; };
        const kids = body.map((c) => `            <${esc(tagFor(c))}></${esc(tagFor(c))}>`).join("\n");
        return `        <${esc(p.tag)}>\n${kids}\n        </${esc(p.tag)}>`;
      }
      case "visualforce":
        return `        <iframe src="/apex/${esc(p.page)}" height="${esc(p.height)}" width="100%" frameborder="0"></iframe>`;
      default:
        return `        <lightning-card title="Card"></lightning-card>`;
    }
  }
  function splitTabs(s) { return String(s || "").split(",").map((x) => x.trim()).filter(Boolean); }

  function lwc(state) {
    const regionBlocks = regionsOf(state).map((rn) => {
      const blks = state.regions[rn] || [];
      if (!blks.length) return null;
      return `        <!-- region: ${rn} -->\n        <lightning-layout-item size="12" padding="around-small">\n${blks.map((b) => lwcMarkup(b, state)).join("\n\n")}\n        </lightning-layout-item>`;
    }).filter(Boolean).join("\n\n");

    const html = `<template>\n    <lightning-layout multiple-rows="true">\n${regionBlocks}\n    </lightning-layout>\n</template>`;

    const className = state.pageType === "record" ? "ContactRecordPage" : "ContactHomePage";
    const dir = state.pageType === "record" ? "contactRecordPage" : "contactHomePage";
    const js = [
      "import { LightningElement, api } from 'lwc';",
      "",
      `export default class ${className} extends LightningElement {`,
      "    @api recordId;",
      "    @api objectApiName;",
      "",
      "    currentStep = 'neg';",
      "    detailFields = ['Title', 'AccountId', 'Phone', 'Email', 'Department', 'LeadSource'];",
      "    accountFields = ['Name', 'Industry', 'Phone'];",
      "    richText = '<b>Key Account.</b> Strategic enterprise customer.';",
      "    mapMarkers = [];",
      "",
      "    // Replace with wire adapters (getRecord / getListUi / GraphQL) for live data.",
      "    columns = [",
      "        { label: 'Name', fieldName: 'name' },",
      "        { label: 'Amount', fieldName: 'amount', type: 'currency' },",
      "        { label: 'Stage', fieldName: 'stage' },",
      "    ];",
      "    relatedColumns = this.columns;",
      "    records = [];",
      "    relatedRecords = [];",
      "    activities = [];",
      "}",
    ].join("\n");

    const meta = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">',
      "    <apiVersion>61.0</apiVersion>",
      "    <isExposed>true</isExposed>",
      "    <masterLabel>" + esc(state.settings.label) + "</masterLabel>",
      "    <targets>",
      pageTypes[state.pageType].lwcTarget.split(",").map((t) => `        <target>${t}</target>`).join("\n"),
      "    </targets>",
      "</LightningComponentBundle>",
    ].join("\n");

    return { dir, html, js, meta, htmlName: `${dir}.html`, jsName: `${dir}.js`, metaName: `${dir}.js-meta.xml` };
  }

  // ---------------------------------------------------------------- JSON
  function json(state) {
    return JSON.stringify({
      page: {
        label: state.settings.label, apiName: state.settings.apiName, description: state.settings.description,
        type: pageTypes[state.pageType].flexiType, object: state.settings.object,
        layout: state.layout, template: layouts[state.layout].flexiTemplate,
      },
      regions: regionsOf(state).map((rn) => ({
        name: rn,
        components: (state.regions[rn] || []).map((b) => ({
          type: b.type, label: byType[b.type].label,
          flexipageComponent: byType[b.type].flexipage, lwcBaseComponent: byType[b.type].lwc,
          properties: b.props,
        })),
      })),
    }, null, 2);
  }

  // ---------------------------------------------------------------- mockup
  function htmlMock(state) {
    const list = regionsOf(state).map((rn) => {
      const blks = (state.regions[rn] || []).map((b) => {
        const ps = Object.entries(b.props || {}).map(([k, v]) => `${k}=${v}`).join(", ");
        return `      • ${byType[b.type].label}${ps ? "  (" + ps + ")" : ""}`;
      }).join("\n");
      return `  [${rn}]\n${blks || "      (empty)"}`;
    }).join("\n\n");
    return `<!--\n  ${state.settings.label}\n  ${pageTypes[state.pageType].label} · layout: ${layouts[state.layout].label}\n  ${state.settings.object ? "Object: " + state.settings.object : ""}\n\n${list}\n\n  Tip: use the Preview toggle in the builder and screenshot for a pixel view.\n-->`;
  }

  window.CRMBExport = { flexipage, lwc, json, htmlMock, regionsOf };
})();
