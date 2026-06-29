/* LWC Detail Screen Builder — export. window.DSBExport: lwc (html/js/meta), json. */
(function () {
  const { byType } = window.DSB;
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const opts = (s) => String(s || "").split(",").map((x) => x.trim()).filter(Boolean);
  const optVal = (o) => o.toLowerCase().replace(/[^a-z0-9]+/g, "_");
  const PAD = "                ";

  function lwc(state) {
    const getters = [];     // {name, body}
    const handlers = [];    // strings
    let optN = 0, modalN = 0;
    const optGetter = (s, label) => { const name = "options" + (optN++); getters.push({ name, body: opts(s).map((o) => `            { label: '${o.replace(/'/g, "\\'")}', value: '${optVal(o)}' },`).join("\n") }); return name; };

    function attrs(pairs) { return pairs.filter(([, v]) => v !== "" && v != null && v !== false).map(([k, v]) => v === true ? k : `${k}="${esc(v)}"`).join(" "); }

    function leaf(b, indent) {
      const p = b.props || {}, I = indent;
      switch (b.type) {
        case "input":
          return `${I}<lightning-input ${attrs([["label", p.label], ["type", p.type !== "text" ? p.type : ""], ["placeholder", p.placeholder], ["required", !!p.required], ["readonly", !!p.readOnly], ["disabled", !!p.disabled]])}></lightning-input>`;
        case "select":
          return `${I}<lightning-select label="${esc(p.label)}" options={${optGetter(p.options)}} ${p.required ? "required" : ""} ${p.disabled ? "disabled" : ""}></lightning-select>`;
        case "combobox":
          return `${I}<lightning-combobox label="${esc(p.label)}" placeholder="${esc(p.placeholder)}" options={${optGetter(p.options)}} ${p.disabled ? "disabled" : ""}></lightning-combobox>`;
        case "textarea":
          return `${I}<lightning-textarea ${attrs([["label", p.label], ["placeholder", p.placeholder], ["required", !!p.required], ["disabled", !!p.disabled]])}></lightning-textarea>`;
        case "checkbox":
          return `${I}<lightning-input type="checkbox" label="${esc(p.label)}" ${p.checked ? "checked" : ""} ${p.disabled ? "disabled" : ""}></lightning-input>`;
        case "checkboxGroup":
          return `${I}<lightning-checkbox-group label="${esc(p.label)}" options={${optGetter(p.options)}} ${p.disabled ? "disabled" : ""}></lightning-checkbox-group>`;
        case "radioGroup":
          return `${I}<lightning-radio-group label="${esc(p.label)}" options={${optGetter(p.options)}} type="radio" ${p.disabled ? "disabled" : ""}></lightning-radio-group>`;
        case "toggle":
          return `${I}<lightning-input type="toggle" label="${esc(p.label)}" ${p.checked ? "checked" : ""} ${p.disabled ? "disabled" : ""}></lightning-input>`;
        case "slider":
          return `${I}<lightning-slider ${attrs([["label", p.label], ["min", p.min], ["max", p.max], ["step", p.step], ["value", p.value], ["disabled", !!p.disabled]])}></lightning-slider>`;
        case "dualListbox":
          return `${I}<lightning-dual-listbox label="${esc(p.label)}" source-label="${esc(p.sourceLabel)}" selected-label="${esc(p.selectedLabel)}" options={${optGetter(p.options)}}></lightning-dual-listbox>`;
        case "fileUpload":
          return `${I}<lightning-file-upload label="${esc(p.label)}" record-id={recordId} ${p.accept ? `accept="${esc(p.accept)}"` : ""} ${p.multiple ? "multiple" : ""}></lightning-file-upload>`;
        case "badge":
          return `${I}<lightning-badge label="${esc(p.label)}"></lightning-badge>`;
        case "avatar":
          return `${I}<lightning-avatar variant="${p.variant === "square" ? "square" : "circle"}" initials="${esc(p.initials)}" fallback-icon-name="${esc(p.iconName)}" size="${esc(p.size)}" alternative-text="${esc(p.initials)}"></lightning-avatar>`;
        case "pill":
          return `${I}<lightning-pill label="${esc(p.label)}"><lightning-icon icon-name="${esc(p.iconName)}" slot="media" size="x-small"></lightning-icon></lightning-pill>`;
        case "icon":
          return `${I}<lightning-icon icon-name="${esc(p.iconName)}" size="${esc(p.size)}"></lightning-icon>`;
        case "progressBar":
          return `${I}<lightning-progress-bar value="${esc(p.value)}" variant="${esc(p.variant)}" size="${esc(p.size)}"></lightning-progress-bar>`;
        case "formattedText":
          return `${I}<lightning-formatted-text value="${esc(p.content)}"></lightning-formatted-text>`;
        case "button":
          return `${I}<lightning-button ${attrs([["label", p.label], ["variant", p.variant], ["icon-name", p.iconName], ["icon-position", p.iconName ? p.iconPosition : ""], ["stretch", !!p.stretch], ["disabled", !!p.disabled]])}></lightning-button>`;
        case "buttonGroup":
          return `${I}<lightning-button-group>\n${opts(p.items).map((l) => `${I}    <lightning-button label="${esc(l)}"></lightning-button>`).join("\n")}\n${I}</lightning-button-group>`;
        case "tabset":
          return `${I}<lightning-tabset variant="${esc(p.variant)}">\n${opts(p.tabs).map((l) => `${I}    <lightning-tab label="${esc(l)}">${esc(l)} content</lightning-tab>`).join("\n")}\n${I}</lightning-tabset>`;
        case "accordion":
          return `${I}<lightning-accordion ${p.allowMultiple ? "allow-multiple-sections-open" : ""}>\n${opts(p.sections).map((l) => `${I}    <lightning-accordion-section name="${optVal(l)}" label="${esc(l)}">${esc(l)}</lightning-accordion-section>`).join("\n")}\n${I}</lightning-accordion>`;
        case "datatable":
          return `${I}<lightning-datatable key-field="id" data={tableData} columns={tableColumns} ${p.selectable ? "" : "hide-checkbox-column"}></lightning-datatable>`;
        case "divider":
          return `${I}<hr class="slds-m-vertical_small" />`;
        case "spacer":
          return `${I}<div style="height:${Number(p.height) || 24}px"></div>`;
        default:
          return `${I}<!-- ${b.type} -->`;
      }
    }

    function alignWrap(markup, b, indent) {
      const a = b.props && b.props._align;
      if (!a || a === "left") return markup;
      const cls = a === "center" ? "slds-grid_align-center" : "slds-grid_align-end";
      return `${indent}<div class="slds-grid ${cls}">\n${markup}\n${indent}</div>`;
    }

    function colWrap(children, cols, indent) {
      if (Number(cols) === 2) {
        return `${indent}<lightning-layout multiple-rows>\n` + (children || []).map((c) => `${indent}    <lightning-layout-item size="6" padding="horizontal-small" class="slds-p-bottom_small">\n${alignWrap(leaf(c, indent + "        "), c, indent + "    ")}\n${indent}    </lightning-layout-item>`).join("\n") + `\n${indent}</lightning-layout>`;
      }
      return (children || []).map((c) => alignWrap(leaf(c, indent), c, indent)).join("\n");
    }

    function top(b) {
      const p = b.props || {};
      if (b.type === "section") {
        return `        <div class="slds-box slds-box_xx-small slds-m-bottom_medium">\n            <h3 class="slds-text-title_caps slds-p-around_x-small">${esc(p.title)}</h3>\n${colWrap(b.children, p.columns, "            ")}\n        </div>`;
      }
      if (b.type === "card") {
        return `        <lightning-card title="${esc(p.title)}" icon-name="${esc(p.iconName)}">\n            <div class="slds-p-horizontal_medium slds-p-bottom_medium">\n${colWrap(b.children, p.columns, "                ")}\n            </div>\n        </lightning-card>`;
      }
      if (b.type === "modal") {
        const hn = "openModal" + (modalN++);
        handlers.push(`    ${hn}() {\n        // Open a LightningModal subclass, passing the body fields as needed.\n        // import MyModal from 'c/${state.settings.componentName}Modal';\n        // MyModal.open({ size: '${p.size}', label: '${(p.title || "").replace(/'/g, "\\'")}' });\n    }`);
        return `        <!-- Modal: ${esc(p.title)} (size ${esc(p.size)}) — body composed of ${(b.children || []).length} component(s).\n             In LWC, modals extend LightningModal and open via MyModal.open(). The body markup below\n             goes in that modal component's template. -->\n        <lightning-button variant="${esc(p.triggerVariant)}" label="${esc(p.trigger)}" icon-name="utility:expand" onclick={${hn}} class="slds-m-bottom_medium"></lightning-button>\n        <!-- modal body:\n${colWrap(b.children, p.columns, "        ")}\n        -->`;
      }
      return alignWrap(leaf(b, "        "), b, "        ");
    }

    const markup = state.blocks.map(top).join("\n\n");
    const cls = state.settings.componentName.charAt(0).toUpperCase() + state.settings.componentName.slice(1);
    const ha = state.settings.headerActions || [];
    const actionsSlot = ha.length ? `\n        <lightning-button-group slot="actions">\n` + ha.map((a) => `            <lightning-button label="${esc(a.label)}" variant="${esc(a.variant)}"${a.iconName ? ` icon-name="${esc(a.iconName)}"` : ""}></lightning-button>`).join("\n") + `\n        </lightning-button-group>` : "";
    const tmpl = `<template>\n    <lightning-card title="${esc(state.settings.title)}" icon-name="standard:contact">${actionsSlot}\n        <div class="slds-p-horizontal_medium slds-p-bottom_medium">\n${markup}\n            <div class="slds-m-top_medium slds-text-align_right">\n                <lightning-button variant="brand" label="Save" onclick={handleSave}></lightning-button>\n            </div>\n        </div>\n    </lightning-card>\n</template>`;

    const getterJs = getters.map((g) => `    get ${g.name}() {\n        return [\n${g.body}\n        ];\n    }`).join("\n\n");
    const hasTable = state.blocks.some(function find(b) { return b.type === "datatable" || (b.children || []).some(find); });
    const js = [
      "import { LightningElement, api } from 'lwc';",
      "",
      `export default class ${cls} extends LightningElement {`,
      "    @api recordId;",
      hasTable ? "\n    tableColumns = [\n        { label: 'Opportunity', fieldName: 'c0' },\n        { label: 'Amount', fieldName: 'c1', type: 'currency' },\n        { label: 'Stage', fieldName: 'c2' },\n        { label: 'Close Date', fieldName: 'c3', type: 'date' },\n    ];\n    tableData = [];" : "",
      getterJs ? "\n" + getterJs : "",
      handlers.length ? "\n" + handlers.join("\n\n") : "",
      "\n    handleSave() {\n        // Persist the record (lightning-record-edit-form or an Apex/LDS call).\n    }",
      "}",
    ].filter((x) => x !== "").join("\n");

    const meta = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">',
      "    <apiVersion>61.0</apiVersion>", "    <isExposed>true</isExposed>",
      `    <masterLabel>${esc(state.settings.title)}</masterLabel>`,
      "    <targets>", "        <target>lightning__RecordPage</target>", "        <target>lightning__AppPage</target>", "    </targets>",
      "</LightningComponentBundle>",
    ].join("\n");

    return { dir: state.settings.componentName, html: tmpl, js, meta, htmlName: state.settings.componentName + ".html", jsName: state.settings.componentName + ".js", metaName: state.settings.componentName + ".js-meta.xml" };
  }

  function json(state) {
    const strip = (b) => ({ type: b.type, label: byType[b.type].label, lwc: byType[b.type].lwc, properties: b.props, children: b.children ? b.children.map(strip) : undefined });
    return JSON.stringify({ screen: { title: state.settings.title, object: state.settings.object, componentName: state.settings.componentName, columns: state.settings.columns }, blocks: state.blocks.map(strip) }, null, 2);
  }

  window.DSBExport = { lwc, json };
})();
