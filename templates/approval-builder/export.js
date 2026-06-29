/* Approval (전자결재) Form Builder — export generators.
   window.APBExport: html (inline form), lwc (scaffold), json. */
(function () {
  const { byType } = window.APB;
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  const splitC = (s) => String(s || "").split(",").map((x) => x.trim()).filter(Boolean);
  const splitL = (s) => String(s || "").split("\n").map((x) => x.trim()).filter(Boolean);
  const INPUT_TYPES = ["textField", "numberField", "dateField", "currencyField", "selectField", "radioGroup", "checkboxGroup", "textareaField", "fileField"];

  // -------------------------------------------------------------- HTML form
  function blockHtml(b, s, idx) {
    const p = b.props || {}, acc = s.accent, name = "field" + idx;
    const lab = (text, req) => `<span style="font-weight:700;font-size:13.5px;color:#1c2430;min-width:108px;flex:none;padding-top:4px;">${esc(text)}${req ? '<span style="color:#c0392b;"> *</span>' : ""}</span>`;
    const rowOpen = `<div style="display:flex;align-items:flex-start;gap:12px;padding:7px 2px;">`, rowClose = `</div>`;
    const u = (extra) => `border:0;border-bottom:1px solid #b9c0cc;background:transparent;font:inherit;font-size:13.5px;padding:3px 2px;outline:none;${extra || ""}`;
    switch (b.type) {
      case "approvalLine": {
        const roles = splitL(p.roles).map((r) => { const i = r.indexOf(":"); return i >= 0 ? { role: r.slice(0, i).trim(), name: r.slice(i + 1).trim() } : { role: r, name: "" }; });
        const cb = "border:1px solid #6b7280;text-align:center;";
        const head = roles.map((r) => `<td style="${cb}min-width:64px;height:22px;background:#f5f7fa;font-weight:600;color:#3a4250;padding:2px 6px;font-size:12px;">${esc(r.role)}</td>`).join("");
        const stamp = roles.map((r) => `<td style="${cb}height:50px;color:#1c2430;font-weight:600;font-size:12px;">${esc(r.name)}</td>`).join("");
        const dates = p.showDate ? `<tr>${roles.map(() => `<td style="${cb}height:20px;font-size:10.5px;color:#9aa3b2;">.  .</td>`).join("")}</tr>` : "";
        const just = p.align === "left" ? "flex-start" : p.align === "center" ? "center" : "flex-end";
        return `<div style="display:flex;justify-content:${just};margin:0 0 10px;"><table style="border-collapse:collapse;"><tr><td rowspan="${p.showDate ? 3 : 2}" style="${cb}width:22px;background:#eef1f5;font-weight:700;color:#1c2430;letter-spacing:2px;writing-mode:vertical-rl;text-orientation:upright;padding:8px 2px;font-size:12px;">${esc(p.label)}</td>${head}</tr><tr>${stamp}</tr>${dates}</table></div>`;
      }
      case "docTitle":
        return `<div style="text-align:center;margin:4px 0 14px;"><div style="font-size:27px;font-weight:800;color:#10151d;letter-spacing:${p.spread ? "0.22em" : "0.02em"};line-height:1.2;">${esc(p.title)}</div>${p.subtitle ? `<div style="font-size:12.5px;color:#7b8493;margin-top:4px;letter-spacing:0.18em;text-transform:uppercase;">${esc(p.subtitle)}</div>` : ""}<div style="height:3px;background:${acc};width:64px;margin:10px auto 0;border-radius:2px;"></div></div>`;
      case "docInfo": {
        const rows = splitL(p.rows).map((r) => { const i = r.indexOf(":"); return { label: i >= 0 ? r.slice(0, i).trim() : r, value: i >= 0 ? r.slice(i + 1).trim() : "" }; });
        const cols = Number(p.cols) || 2;
        const labS = `border:1px solid #6b7280;background:#eef1f5;font-weight:700;color:#1c2430;font-size:12.5px;text-align:center;padding:7px 8px;white-space:nowrap;`;
        const valS = `border:1px solid #6b7280;font-size:12.5px;color:#222;padding:7px 10px;`;
        let html = "", i = 0;
        while (i < rows.length) { const row = rows.slice(i, i + cols); html += "<tr>" + row.map((c) => `<td style="${labS}">${esc(c.label)}</td><td style="${valS}">${esc(c.value) || "&nbsp;"}</td>`).join("") + "</tr>"; i += cols; }
        return `<table style="width:100%;border-collapse:collapse;margin:0 0 12px;"><tbody>${html}</tbody></table>`;
      }
      case "sectionHeader":
        return `<div style="background:${p.shade ? "#eef1f5" : "transparent"};border-left:3px solid ${acc};padding:7px 10px;margin:12px 0 4px;font-weight:700;font-size:14px;color:#1c2430;">${esc(p.text)}</div>`;
      case "textField":
        return `${rowOpen}${lab(p.label, p.required)}<div style="flex:1;"><input type="text" name="${name}" placeholder="${esc(p.placeholder)}" style="width:100%;${u()}"></div>${rowClose}`;
      case "numberField":
        return `${rowOpen}${lab(p.label, p.required)}<div style="flex:1;"><span style="display:inline-flex;align-items:center;gap:6px;border-bottom:1px solid #b9c0cc;"><input type="number" name="${name}" style="${u("border-bottom:0;")}"> ${p.unit ? `<span style="font-size:12.5px;color:#6b7280;">${esc(p.unit)}</span>` : ""}</span></div>${rowClose}`;
      case "dateField":
        return `${rowOpen}${lab(p.label, p.required)}<div style="flex:1;"><input type="date" name="${name}" style="${u("color:#444;")}"></div>${rowClose}`;
      case "currencyField":
        return `${rowOpen}${lab(p.label, p.required)}<div style="flex:1;"><span style="display:inline-flex;align-items:center;gap:6px;border-bottom:1px solid #b9c0cc;max-width:220px;"><span style="font-size:14px;font-weight:700;color:#1c2430;">${esc(p.currency)}</span><input type="text" name="${name}" placeholder="0" style="${u("border-bottom:0;text-align:right;")}width:160px;"></span></div>${rowClose}`;
      case "selectField":
        return `${rowOpen}${lab(p.label, p.required)}<div style="flex:1;"><select name="${name}" style="width:100%;max-width:280px;${u("color:#444;")}"><option value="">선택하세요</option>${splitC(p.options).map((o) => `<option>${esc(o)}</option>`).join("")}</select></div>${rowClose}`;
      case "radioGroup":
        return `${rowOpen}${lab(p.label)}<div style="flex:1;display:flex;flex-direction:${p.inline ? "row" : "column"};flex-wrap:wrap;gap:${p.inline ? "18px" : "6px"};padding-top:4px;">${splitC(p.options).map((o) => `<label style="display:inline-flex;align-items:center;gap:6px;font-size:13.5px;color:#222;"><input type="radio" name="${name}" value="${esc(o)}">${esc(o)}</label>`).join("")}</div>${rowClose}`;
      case "checkboxGroup":
        return `${rowOpen}${lab(p.label)}<div style="flex:1;display:flex;flex-direction:${p.inline ? "row" : "column"};flex-wrap:wrap;gap:${p.inline ? "18px" : "6px"};padding-top:4px;">${splitC(p.options).map((o) => `<label style="display:inline-flex;align-items:center;gap:6px;font-size:13.5px;color:#222;"><input type="checkbox" name="${name}" value="${esc(o)}">${esc(o)}</label>`).join("")}</div>${rowClose}`;
      case "textareaField":
        return `${rowOpen}${lab(p.label)}<div style="flex:1;"><textarea name="${name}" rows="${Number(p.rows) || 3}" placeholder="${esc(p.placeholder)}" style="width:100%;border:1px solid #cdd3dd;border-radius:4px;background:#fff;font:inherit;font-size:13.5px;padding:6px 8px;outline:none;resize:vertical;"></textarea></div>${rowClose}`;
      case "fileField":
        return `${rowOpen}${lab(p.label)}<div style="flex:1;display:flex;align-items:center;gap:10px;"><input type="file" name="${name}" ${p.multiple ? "multiple" : ""} style="font-size:13px;">${p.hint ? `<span style="font-size:12px;color:#8a93a3;">${esc(p.hint)}</span>` : ""}</div>${rowClose}`;
      case "lineItems": {
        const cols = splitC(p.columns), n = Number(p.rows) || 4;
        const th = `border:1px solid #6b7280;background:${acc};color:#fff;font-size:12.5px;font-weight:700;padding:7px 8px;text-align:center;`;
        const td = (c) => `border:1px solid #c2c8d2;height:30px;font-size:12.5px;padding:3px 8px;text-align:${c === p.amountCol || /금액|단가/.test(c) ? "right" : "left"};`;
        const body = Array.from({ length: n }).map(() => `<tr>${cols.map((c) => `<td style="${td(c)}">&nbsp;</td>`).join("")}</tr>`).join("");
        const total = p.showTotal ? `<tr><td colspan="${Math.max(1, cols.length - 1)}" style="border:1px solid #c2c8d2;background:#eef1f5;font-weight:700;text-align:center;padding:6px 8px;">합 계</td><td style="border:1px solid #c2c8d2;background:#eef1f5;font-weight:700;text-align:right;padding:6px 8px;">${esc(p.currency)} 0</td></tr>` : "";
        return `<div style="margin:6px 0 12px;">${p.title ? `<div style="font-weight:700;font-size:13.5px;color:#1c2430;margin:0 0 6px;">${esc(p.title)}</div>` : ""}<table style="width:100%;border-collapse:collapse;"><thead><tr>${cols.map((c) => `<th style="${th}">${esc(c)}</th>`).join("")}</tr></thead><tbody>${body}${total}</tbody></table></div>`;
      }
      case "signatureArea": {
        const parties = splitC(p.parties);
        const lines = parties.map((pt) => `<div style="display:flex;align-items:baseline;gap:10px;font-size:14px;color:#1c2430;justify-content:flex-end;"><span style="font-weight:700;min-width:56px;text-align:right;">${esc(pt)}</span><span style="display:inline-block;width:150px;border-bottom:1px solid #6b7280;height:22px;"></span><span style="color:#6b7280;">${esc(p.stampWord)}</span></div>`).join("");
        return `<div style="margin:18px 0 4px;text-align:right;">${p.showDate ? `<div style="font-size:14px;letter-spacing:0.1em;color:#1c2430;margin:0 0 16px;text-align:center;">20&nbsp;&nbsp;&nbsp;&nbsp;년&nbsp;&nbsp;&nbsp;&nbsp;월&nbsp;&nbsp;&nbsp;&nbsp;일</div>` : ""}<div style="display:flex;flex-direction:column;gap:12px;align-items:flex-end;max-width:360px;margin-left:auto;">${lines}</div></div>`;
      }
      case "notice":
        return `<div style="font-size:12.5px;color:#6b7280;line-height:1.7;padding:8px 2px;white-space:pre-wrap;">${esc(p.text)}</div>`;
      default: return "";
    }
  }

  function html(state) {
    const s = state.settings;
    let k = 0;
    const body = state.blocks.map((b) => blockHtml(b, s, INPUT_TYPES.includes(b.type) ? k++ : -1)).join("\n");
    return [
      '<!DOCTYPE html>', '<html lang="ko"><head>', '  <meta charset="utf-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1">',
      `  <title>${esc(s.docTitle)} — ${esc(s.company)}</title>`,
      '  <style>',
      `    body { margin:0; background:#e9edf2; font-family:${s.fontFamily}; color:#222; }`,
      `    .doc { width:${s.width}px; max-width:100%; margin:24px auto; background:#fff; border:1px solid #d0d6e0; box-shadow:0 6px 24px rgba(16,22,40,.10); padding:40px 44px; box-sizing:border-box; }`,
      '    @media print { body { background:#fff; } .doc { box-shadow:none; border:0; margin:0; } }',
      '    input, select, textarea { font-family:inherit; }',
      '  </style>', '</head>', '<body>',
      `  <form class="doc">`, body, '  </form>', '</body></html>',
    ].join("\n");
  }

  // -------------------------------------------------------------- LWC scaffold
  function slug(i) { return "field" + i; }
  function lwc(state) {
    const s = state.settings; let k = 0; const getters = [];
    const lines = state.blocks.map((b) => {
      const p = b.props || {};
      switch (b.type) {
        case "docTitle": return `        <h1 class="slds-text-heading_large slds-align_absolute-center slds-m-vertical_medium">${esc(p.title)}</h1>`;
        case "sectionHeader": return `        <h3 class="slds-text-title_caps slds-m-top_medium slds-m-bottom_x-small">${esc(p.text)}</h3>`;
        case "notice": return `        <p class="slds-text-body_small slds-text-color_weak slds-m-vertical_x-small">${esc(p.text)}</p>`;
        case "approvalLine": return `        <!-- 결재선: ${splitL(p.roles).map((r) => r.split(":")[0].trim()).join(" → ")} — map to a Salesforce Approval Process (ProcessDefinition) -->\n        <div class="approval-line slds-m-bottom_small"></div>`;
        case "docInfo": return `        <!-- 문서 정보 -->\n${splitL(p.rows).map((r) => `        <lightning-input label="${esc(r.split(":")[0].trim())}" value="${esc((r.split(":")[1] || "").trim())}" readonly></lightning-input>`).join("\n")}`;
        case "textField": { const n = slug(k++); return `        <lightning-input name="${n}" label="${esc(p.label)}" ${p.required ? "required" : ""}></lightning-input>`; }
        case "numberField": { const n = slug(k++); return `        <lightning-input type="number" name="${n}" label="${esc(p.label)}${p.unit ? ` (${esc(p.unit)})` : ""}" ${p.required ? "required" : ""}></lightning-input>`; }
        case "dateField": { const n = slug(k++); return `        <lightning-input type="date" name="${n}" label="${esc(p.label)}" ${p.required ? "required" : ""}></lightning-input>`; }
        case "currencyField": { const n = slug(k++); return `        <lightning-input type="number" formatter="currency" name="${n}" label="${esc(p.label)}" ${p.required ? "required" : ""}></lightning-input>`; }
        case "selectField": { const n = slug(k++); getters.push([n + "Options", splitC(p.options)]); return `        <lightning-combobox name="${n}" label="${esc(p.label)}" options={${n}Options} ${p.required ? "required" : ""}></lightning-combobox>`; }
        case "radioGroup": { const n = slug(k++); getters.push([n + "Options", splitC(p.options)]); return `        <lightning-radio-group name="${n}" label="${esc(p.label)}" options={${n}Options} type="${p.inline ? "button" : "radio"}"></lightning-radio-group>`; }
        case "checkboxGroup": { const n = slug(k++); getters.push([n + "Options", splitC(p.options)]); return `        <lightning-checkbox-group name="${n}" label="${esc(p.label)}" options={${n}Options}></lightning-checkbox-group>`; }
        case "textareaField": { const n = slug(k++); return `        <lightning-textarea name="${n}" label="${esc(p.label)}" placeholder="${esc(p.placeholder)}"></lightning-textarea>`; }
        case "fileField": { slug(k++); return `        <lightning-file-upload label="${esc(p.label)}" name="fileUploader" record-id={recordId} ${p.multiple ? "multiple" : ""}></lightning-file-upload>`; }
        case "lineItems": return `        <!-- ${esc(p.title)} -->\n        <lightning-datatable key-field="id" data={lineItems} columns={lineItemColumns} show-row-number-column></lightning-datatable>`;
        case "signatureArea": return `        <!-- 서명/도장: ${esc(p.parties)} — capture via signature pad or record approval steps -->\n        <div class="signature-area slds-m-top_medium"></div>`;
        default: return "";
      }
    }).join("\n");

    const className = "ApprovalForm";
    const dir = "approvalForm";
    const tmpl = `<template>\n    <lightning-card title="${esc(s.docTitle)}" icon-name="standard:approval">\n        <div class="slds-p-horizontal_medium slds-p-bottom_medium">\n${lines}\n            <div class="slds-m-top_medium slds-text-align_right">\n                <lightning-button variant="neutral" label="임시저장"></lightning-button>\n                <lightning-button variant="brand" label="결재 상신" class="slds-m-left_x-small" onclick={handleSubmit}></lightning-button>\n            </div>\n        </div>\n    </lightning-card>\n</template>`;

    const getterJs = getters.map(([nm, arr]) => `    get ${nm}() {\n        return [\n${arr.map((o) => `            { label: '${o.replace(/'/g, "\\'")}', value: '${o.replace(/'/g, "\\'")}' },`).join("\n")}\n        ];\n    }`).join("\n\n");
    const js = [
      "import { LightningElement, api } from 'lwc';",
      "// Optionally submit to a Salesforce Approval Process via Apex (Approval.process).",
      "",
      `export default class ${className} extends LightningElement {`,
      "    @api recordId;",
      "",
      "    lineItems = [];",
      "    lineItemColumns = [",
      "        { label: '적요', fieldName: 'desc' },",
      "        { label: '수량', fieldName: 'qty', type: 'number' },",
      "        { label: '단가', fieldName: 'price', type: 'currency' },",
      "        { label: '금액', fieldName: 'amount', type: 'currency' },",
      "    ];",
      getterJs,
      "",
      "    handleSubmit() {",
      "        // Validate inputs, create the record, then kick off the Approval Process.",
      "        // import approve from '@salesforce/apex/ApprovalController.submitForApproval';",
      "    }",
      "}",
    ].filter((x) => x !== "").join("\n");

    const meta = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">',
      "    <apiVersion>61.0</apiVersion>", "    <isExposed>true</isExposed>",
      `    <masterLabel>${esc(s.docTitle)}</masterLabel>`,
      "    <targets>", "        <target>lightning__RecordPage</target>", "        <target>lightning__AppPage</target>", "        <target>lightning__HomePage</target>", "    </targets>",
      "</LightningComponentBundle>",
    ].join("\n");

    return { dir, html: tmpl, js, meta, htmlName: `${dir}.html`, jsName: `${dir}.js`, metaName: `${dir}.js-meta.xml` };
  }

  function json(state) {
    return JSON.stringify({
      form: { docTitle: state.settings.docTitle, company: state.settings.company, objectApiName: state.settings.objectApiName, accent: state.settings.accent, width: state.settings.width },
      blocks: state.blocks.map((b) => ({ type: b.type, label: byType[b.type].label, properties: b.props })),
    }, null, 2);
  }

  window.APBExport = { html, lwc, json };
})();
