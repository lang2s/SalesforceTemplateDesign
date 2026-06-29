/* Email Template Builder — block renderers (inline-styled to match export).
   window.EMBRender(type, props, ctx) -> React element.
   ctx = { settings }. Merge tokens are highlighted as chips. */
(function () {
  const TOKEN_RE = /\{\{\s*([^}]+?)\s*\}\}|\{!\s*([^}]+?)\s*\}/g;

  // canonical -> display string in chosen syntax
  function emit(name, mode) { return mode === "salesforce" ? "{!" + name + "}" : "{{" + name + "}}"; }

  // split text into [strings, {token}] preserving order
  function parse(text) {
    const out = []; let last = 0; let m; TOKEN_RE.lastIndex = 0;
    const s = String(text == null ? "" : text);
    while ((m = TOKEN_RE.exec(s))) {
      if (m.index > last) out.push(s.slice(last, m.index));
      out.push({ token: (m[1] || m[2] || "").trim() });
      last = m.index + m[0].length;
    }
    if (last < s.length) out.push(s.slice(last));
    return out;
  }

  // render text with token chips + newline support
  function rich(text, ctx, style) {
    const mode = (ctx.settings && ctx.settings.mergeSyntax) || "handlebars";
    const brand = (ctx.settings && ctx.settings.brandColor) || "#0176D3";
    const parts = parse(text);
    const nodes = [];
    parts.forEach((p, i) => {
      if (typeof p === "string") {
        p.split("\n").forEach((line, j, arr) => { nodes.push(line); if (j < arr.length - 1) nodes.push(<br key={"br" + i + "_" + j} />); });
      } else {
        nodes.push(<span key={"t" + i} style={{ background: hexA(brand, 0.12), color: brand, borderRadius: 4, padding: "0 4px", fontWeight: 600, whiteSpace: "nowrap" }}>{emit(p.token, mode)}</span>);
      }
    });
    return <span style={style}>{nodes}</span>;
  }
  function hexA(hex, a) {
    const h = hex.replace("#", ""); const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const r = parseInt(n.slice(0, 2), 16), g = parseInt(n.slice(2, 4), 16), b = parseInt(n.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  const PADX = "32px";
  const cellPad = (top, bottom) => ({ padding: `${top}px ${PADX} ${bottom}px` });
  const imgPlaceholder = (h, label) => (
    <div style={{ height: h, background: "#dde4ee", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", color: "#9aa7bd", fontSize: 13, fontFamily: "inherit" }}>{label || "Image"}</div>
  );

  const R = {
    header: (p, ctx) => (
      <div style={{ background: p.bg, ...cellPad(24, 24), borderBottom: p.showRule ? "1px solid #e3e8ef" : "none", textAlign: p.align }}>
        {p.logoUrl ? <img src={p.logoUrl} alt={p.logoText} style={{ maxHeight: 34, verticalAlign: "middle" }} />
          : <span style={{ fontWeight: 800, letterSpacing: "0.08em", fontSize: 18, color: ctx.settings.textColor }}>{p.logoText}</span>}
      </div>
    ),
    hero: (p, ctx) => (
      <div style={{ background: p.image ? `linear-gradient(rgba(0,0,0,.32),rgba(0,0,0,.32)), center/cover no-repeat` : p.bg, backgroundColor: p.bg, ...cellPad(44, 44), textAlign: "center", color: p.color }}>
        <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.2, color: p.color }}>{rich(p.heading, ctx, { color: p.color })}</div>
        {p.sub ? <div style={{ fontSize: 16, lineHeight: 1.55, margin: "12px auto 0", maxWidth: 420, color: p.color, opacity: 0.94 }}>{rich(p.sub, ctx, { color: p.color })}</div> : null}
        {p.buttonLabel ? <div style={{ marginTop: 24 }}><span style={{ display: "inline-block", background: "#ffffff", color: p.bg, fontWeight: 700, fontSize: 15, padding: "13px 26px", borderRadius: 6 }}>{p.buttonLabel}</span></div> : null}
      </div>
    ),
    heading: (p, ctx) => (
      <div style={{ ...cellPad(24, 8), textAlign: p.align }}>
        <div style={{ fontSize: Number(p.size), fontWeight: 800, lineHeight: 1.25, color: p.color, margin: 0 }}>{rich(p.text, ctx, { color: p.color })}</div>
      </div>
    ),
    text: (p, ctx) => (
      <div style={{ ...cellPad(8, 8), textAlign: p.align }}>
        <div style={{ fontSize: Number(p.size), lineHeight: 1.6, color: p.color }}>{rich(p.content, ctx, { color: p.color })}</div>
      </div>
    ),
    button: (p, ctx) => (
      <div style={{ ...cellPad(16, 16), textAlign: p.align }}>
        <span style={{ display: p.full ? "block" : "inline-block", background: p.bg, color: p.color, fontWeight: 700, fontSize: 15, padding: "13px 28px", borderRadius: Number(p.radius), textAlign: "center" }}>{rich(p.label, ctx, { color: p.color })}</span>
      </div>
    ),
    list: (p, ctx) => {
      const items = String(p.items || "").split("\n").map((s) => s.trim()).filter(Boolean);
      return (
        <div style={{ ...cellPad(12, 12) }}>
          {p.title ? <div style={{ fontSize: 15, fontWeight: 700, color: ctx.settings.textColor, marginBottom: 8 }}>{p.title}</div> : null}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {items.map((it, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 15, lineHeight: 1.5, color: p.color }}>
                <span style={{ color: ctx.settings.brandColor, fontWeight: 700, flex: "none", minWidth: 16 }}>{p.marker === "number" ? i + 1 + "." : p.marker === "check" ? "\u2713" : "\u2022"}</span>
                <span>{rich(it, ctx, { color: p.color })}</span>
              </div>
            ))}
          </div>
        </div>
      );
    },
    image: (p) => (
      <div style={{ ...cellPad(12, 12), textAlign: p.align }}>
        {p.url ? <img src={p.url} alt={p.alt} style={{ width: p.width + "%", maxWidth: "100%", borderRadius: 6, display: "inline-block" }} /> : imgPlaceholder(180, p.alt || "Image")}
      </div>
    ),
    productCard: (p, ctx) => {
      const top = p.layout === "top";
      return (
        <div style={{ ...cellPad(16, 16) }}>
          <div style={{ background: p.bg, borderRadius: 10, padding: 16, display: "flex", flexDirection: top ? "column" : "row", gap: 16, alignItems: top ? "stretch" : "center" }}>
            <div style={{ flex: top ? "none" : "0 0 120px", width: top ? "100%" : 120 }}>{p.image ? <img src={p.image} alt={p.title} style={{ width: "100%", borderRadius: 6, display: "block" }} /> : imgPlaceholder(top ? 150 : 96)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: ctx.settings.textColor }}>{p.title}</div>
              {p.subtitle ? <div style={{ fontSize: 13, color: "#7f8baa", marginTop: 2 }}>{p.subtitle}</div> : null}
              {p.price ? <div style={{ fontSize: 18, fontWeight: 800, color: ctx.settings.brandColor, marginTop: 8 }}>{p.price}</div> : null}
              {p.buttonLabel ? <div style={{ marginTop: 12 }}><span style={{ display: "inline-block", background: ctx.settings.brandColor, color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 6 }}>{p.buttonLabel}</span></div> : null}
            </div>
          </div>
        </div>
      );
    },
    twoColumn: (p, ctx) => (
      <div style={{ ...cellPad(16, 16), display: "flex", gap: 24 }}>
        {[["col1Heading", "col1Text"], ["col2Heading", "col2Text"]].map(([h, t], i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: ctx.settings.textColor, marginBottom: 6 }}>{p[h]}</div>
            <div style={{ fontSize: 14, lineHeight: 1.55, color: p.color }}>{rich(p[t], ctx, { color: p.color })}</div>
          </div>
        ))}
      </div>
    ),
    divider: (p) => (
      <div style={{ padding: `${Number(p.pad)}px ${PADX}` }}><div style={{ borderTop: `${Number(p.thickness)}px solid ${p.color}` }} /></div>
    ),
    spacer: (p) => <div style={{ height: Number(p.height) }} />,
    social: (p) => (
      <div style={{ ...cellPad(16, 16), textAlign: p.align }}>
        <div style={{ display: "inline-flex", gap: 12 }}>
          {String(p.networks || "").split(",").map((s) => s.trim()).filter(Boolean).map((n, i) => (
            <span key={i} title={n} style={{ width: 34, height: 34, borderRadius: "50%", background: hexA(p.color, 0.12), color: p.color, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>{n[0]}</span>
          ))}
        </div>
      </div>
    ),
    footer: (p, ctx) => (
      <div style={{ background: p.bg, ...cellPad(28, 28), textAlign: "center", color: p.color, fontSize: 12.5, lineHeight: 1.7 }}>
        <div style={{ fontWeight: 700 }}>{p.company}</div>
        <div>{p.address}</div>
        <div style={{ marginTop: 8 }}>
          <a style={{ color: ctx.settings.brandColor, textDecoration: "underline" }}>{p.unsubscribe}</a>
          <span style={{ margin: "0 8px", opacity: 0.5 }}>|</span>
          <a style={{ color: ctx.settings.brandColor, textDecoration: "underline" }}>{p.manage}</a>
        </div>
      </div>
    ),
  };

  window.EMBRender = function (type, props, ctx) {
    const fn = R[type];
    return fn ? fn(props || {}, ctx || { settings: {} }) : <div style={{ padding: 12, color: "#9aa7bd" }}>Unknown: {type}</div>;
  };
  window.EMBRender.parseTokens = parse;
  window.EMBRender.emitToken = emit;
})();
