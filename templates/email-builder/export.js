/* Email Template Builder — export generators.
   window.EMBExport: html (inline table email), lightning (Lightning Email
   Template body), json. Merge tokens emitted in the chosen syntax. */
(function () {
  const { byType } = window.EMB;
  const TOKEN_RE = /\{\{\s*([^}]+?)\s*\}\}|\{!\s*([^}]+?)\s*\}/g;

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function tokens(str, mode) {
    return String(str == null ? "" : str).replace(TOKEN_RE, (m, a, b) => { const name = (a || b || "").trim(); return mode === "salesforce" ? "{!" + name + "}" : "{{" + name + "}}"; });
  }
  // text -> safe HTML with tokens + line breaks. Tokens are emitted first, then
  // we escape everything except the brace token markers.
  function txt(str, mode) {
    const withTokens = tokens(str, mode);
    return esc(withTokens).replace(/\n/g, "<br>");
  }
  const PADX = 32;
  const url = (u) => esc(u || "#");

  // ---------- per-block HTML (table cell rows inside the 600px content table) ----------
  function blockHtml(b, s) {
    const p = b.props || {}, mode = s.mergeSyntax, brand = s.brandColor, font = s.fontFamily;
    const row = (inner, style) => `        <tr><td style="${style || ""}">${inner}</td></tr>`;
    switch (b.type) {
      case "header":
        return row(p.logoUrl
          ? `<img src="${url(p.logoUrl)}" alt="${esc(p.logoText)}" height="34" style="display:inline-block;border:0;">`
          : `<span style="font-weight:800;letter-spacing:.08em;font-size:18px;color:${s.textColor};">${esc(p.logoText)}</span>`,
          `background:${p.bg};padding:24px ${PADX}px;text-align:${p.align};${p.showRule ? "border-bottom:1px solid #e3e8ef;" : ""}`);
      case "hero":
        return row(
          `<div style="font-size:30px;font-weight:800;line-height:1.2;color:${p.color};">${txt(p.heading, mode)}</div>` +
          (p.sub ? `<div style="font-size:16px;line-height:1.55;margin:12px auto 0;max-width:420px;color:${p.color};">${txt(p.sub, mode)}</div>` : "") +
          (p.buttonLabel ? `<div style="margin-top:24px;"><a href="${url(p.url)}" style="display:inline-block;background:#ffffff;color:${p.bg};font-weight:700;font-size:15px;padding:13px 26px;border-radius:6px;text-decoration:none;">${esc(p.buttonLabel)}</a></div>` : ""),
          `background:${p.bg};padding:44px ${PADX}px;text-align:center;`);
      case "heading":
        return row(`<div style="font-size:${Number(p.size)}px;font-weight:800;line-height:1.25;color:${p.color};">${txt(p.text, mode)}</div>`, `padding:24px ${PADX}px 8px;text-align:${p.align};`);
      case "text":
        return row(`<div style="font-size:${Number(p.size)}px;line-height:1.6;color:${p.color};">${txt(p.content, mode)}</div>`, `padding:8px ${PADX}px;text-align:${p.align};`);
      case "button":
        return row(`<a href="${url(p.url)}" style="display:${p.full ? "block" : "inline-block"};background:${p.bg};color:${p.color};font-weight:700;font-size:15px;padding:13px 28px;border-radius:${Number(p.radius)}px;text-decoration:none;text-align:center;">${txt(p.label, mode)}</a>`, `padding:16px ${PADX}px;text-align:${p.align};`);
      case "list": {
        const items = String(p.items || "").split("\n").map((x) => x.trim()).filter(Boolean);
        const lis = items.map((it, i) => `<tr><td valign="top" style="color:${brand};font-weight:700;padding:0 10px 8px 0;width:18px;">${p.marker === "number" ? (i + 1) + "." : p.marker === "check" ? "&#10003;" : "&bull;"}</td><td style="font-size:15px;line-height:1.5;color:${p.color};padding:0 0 8px;">${txt(it, mode)}</td></tr>`).join("");
        return row((p.title ? `<div style="font-size:15px;font-weight:700;color:${s.textColor};margin-bottom:8px;">${esc(p.title)}</div>` : "") + `<table cellpadding="0" cellspacing="0" role="presentation">${lis}</table>`, `padding:12px ${PADX}px;`);
      }
      case "image":
        return row(p.url ? `<a href="${url(p.href || p.url)}"><img src="${url(p.url)}" alt="${esc(p.alt)}" width="${Math.round((Number(p.width) || 100) / 100 * (s.width - PADX * 2))}" style="max-width:100%;border-radius:6px;border:0;display:inline-block;"></a>` : `<div style="height:180px;background:#dde4ee;border-radius:6px;line-height:180px;color:#9aa7bd;font-size:13px;">${esc(p.alt || "Image")}</div>`, `padding:12px ${PADX}px;text-align:${p.align};`);
      case "productCard": {
        const top = p.layout === "top";
        const img = p.image ? `<img src="${url(p.image)}" alt="${esc(p.title)}" width="${top ? s.width - PADX * 2 - 32 : 120}" style="border-radius:6px;border:0;display:block;max-width:100%;">` : `<div style="height:${top ? 150 : 96}px;background:#dde4ee;border-radius:6px;"></div>`;
        const body = `<div style="font-size:17px;font-weight:800;color:${s.textColor};">${esc(p.title)}</div>` + (p.subtitle ? `<div style="font-size:13px;color:#7f8baa;margin-top:2px;">${esc(p.subtitle)}</div>` : "") + (p.price ? `<div style="font-size:18px;font-weight:800;color:${brand};margin-top:8px;">${esc(p.price)}</div>` : "") + (p.buttonLabel ? `<div style="margin-top:12px;"><a href="${url(p.url)}" style="display:inline-block;background:${brand};color:#fff;font-weight:700;font-size:14px;padding:10px 20px;border-radius:6px;text-decoration:none;">${esc(p.buttonLabel)}</a></div>` : "");
        const inner = top
          ? `<div style="margin-bottom:14px;">${img}</div>${body}`
          : `<table cellpadding="0" cellspacing="0" role="presentation" width="100%"><tr><td width="136" valign="top" style="padding-right:16px;">${img}</td><td valign="middle">${body}</td></tr></table>`;
        return row(`<div style="background:${p.bg};border-radius:10px;padding:16px;">${inner}</div>`, `padding:16px ${PADX}px;`);
      }
      case "twoColumn":
        return row(`<table cellpadding="0" cellspacing="0" role="presentation" width="100%"><tr>
          <td valign="top" width="48%" style="padding-right:12px;"><div style="font-size:16px;font-weight:700;color:${s.textColor};margin-bottom:6px;">${esc(p.col1Heading)}</div><div style="font-size:14px;line-height:1.55;color:${p.color};">${txt(p.col1Text, mode)}</div></td>
          <td valign="top" width="48%" style="padding-left:12px;"><div style="font-size:16px;font-weight:700;color:${s.textColor};margin-bottom:6px;">${esc(p.col2Heading)}</div><div style="font-size:14px;line-height:1.55;color:${p.color};">${txt(p.col2Text, mode)}</div></td>
        </tr></table>`, `padding:16px ${PADX}px;`);
      case "divider":
        return row(`<div style="border-top:${Number(p.thickness)}px solid ${p.color};font-size:0;line-height:0;">&nbsp;</div>`, `padding:${Number(p.pad)}px ${PADX}px;`);
      case "spacer":
        return row(`<div style="height:${Number(p.height)}px;font-size:0;line-height:0;">&nbsp;</div>`, "");
      case "social": {
        const items = String(p.networks || "").split(",").map((x) => x.trim()).filter(Boolean);
        const spans = items.map((n) => `<a href="#" style="display:inline-block;width:34px;height:34px;line-height:34px;border-radius:50%;background:${p.color}1f;color:${p.color};font-weight:800;font-size:14px;text-decoration:none;text-align:center;margin:0 6px;">${esc(n[0])}</a>`).join("");
        return row(spans, `padding:16px ${PADX}px;text-align:${p.align};`);
      }
      case "footer":
        return row(`<div style="font-weight:700;">${esc(p.company)}</div><div>${esc(p.address)}</div><div style="margin-top:8px;"><a href="#" style="color:${brand};text-decoration:underline;">${esc(p.unsubscribe)}</a> &nbsp;|&nbsp; <a href="#" style="color:${brand};text-decoration:underline;">${esc(p.manage)}</a></div>`, `background:${p.bg};padding:28px ${PADX}px;text-align:center;color:${p.color};font-size:12.5px;line-height:1.7;`);
      default:
        return row("");
    }
  }

  function bodyRows(state) { return state.widgets ? state.widgets.map((b) => blockHtml(b, state.settings)).join("\n") : state.blocks.map((b) => blockHtml(b, state.settings)).join("\n"); }

  function shell(state, opts) {
    const s = state.settings;
    const rows = bodyRows(state);
    const pre = opts && opts.preheaderHidden ? `    <span style="display:none;max-height:0;overflow:hidden;opacity:0;">${txt(s.preheader, s.mergeSyntax)}</span>\n` : "";
    return [
      '<!DOCTYPE html>',
      '<html lang="en"><head>',
      '  <meta charset="utf-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1">',
      '  <meta http-equiv="X-UA-Compatible" content="IE=edge">',
      `  <title>${esc(s.subject)}</title>`,
      '</head>',
      `<body style="margin:0;padding:0;background:${s.pageBg};font-family:${s.fontFamily};-webkit-font-smoothing:antialiased;">`,
      pre,
      `  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${s.pageBg};"><tr><td align="center" style="padding:24px 12px;">`,
      `    <table role="presentation" width="${s.width}" cellpadding="0" cellspacing="0" style="width:${s.width}px;max-width:100%;background:${s.contentBg};border-radius:12px;overflow:hidden;">`,
      rows,
      '    </table>',
      '  </td></tr></table>',
      '</body></html>',
    ].join("\n");
  }

  function html(state) { return shell(state, { preheaderHidden: true }); }

  function lightning(state) {
    const body = shell(state, { preheaderHidden: true });
    const note = `<!-- Lightning Email Template body — Salesforce.
     Subject: ${esc(state.settings.subject)}
     Merge fields are in ${state.settings.mergeSyntax === "salesforce" ? "{!Object.Field}" : "{{Object.Field}}"} syntax.
     Paste into the Email Template Builder (HTML) or set on an EmailTemplate's body.
     For a related-entity template, set relatedEntityType (e.g. Contact, Lead). -->\n`;
    return note + body;
  }

  function json(state) {
    return JSON.stringify({
      email: { subject: state.settings.subject, preheader: state.settings.preheader, mergeSyntax: state.settings.mergeSyntax, brandColor: state.settings.brandColor, width: state.settings.width, fontFamily: state.settings.fontFamily },
      blocks: state.blocks.map((b) => ({ type: b.type, label: byType[b.type].label, properties: b.props })),
    }, null, 2);
  }

  window.EMBExport = { html, lightning, json };
})();
