/* Approval (전자결재) Form Builder — block renderers (inline-styled to match export).
   window.APBRender(type, props, ctx) -> React element. ctx = { settings }. */
(function () {
  const splitC = (s) => String(s || "").split(",").map((x) => x.trim()).filter(Boolean);
  const splitL = (s) => String(s || "").split("\n").map((x) => x.trim()).filter(Boolean);

  const FONT = "inherit";
  const labelStyle = { fontWeight: 700, fontSize: 13.5, color: "#1c2430", minWidth: 108, flex: "none", paddingTop: 4 };
  const req = (on) => on ? <span style={{ color: "#c0392b", fontWeight: 700 }}> *</span> : null;

  function underInput(ph) {
    return <input type="text" placeholder={ph || ""} style={{ width: "100%", border: 0, borderBottom: "1px solid #b9c0cc", background: "transparent", font: FONT, fontSize: 13.5, padding: "3px 2px", outline: "none", color: "#222" }} />;
  }
  function fieldRow(label, control, required) {
    return (
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "7px 2px" }}>
        <div style={labelStyle}>{label}{req(required)}</div>
        <div style={{ flex: 1, minWidth: 0 }}>{control}</div>
      </div>
    );
  }

  const R = {
    approvalLine: (p, ctx) => {
      const acc = ctx.settings.accent;
      const roles = splitL(p.roles).map((r) => { const i = r.indexOf(":"); return i >= 0 ? { role: r.slice(0, i).trim(), name: r.slice(i + 1).trim() } : { role: r, name: "" }; });
      const just = p.align === "left" ? "flex-start" : p.align === "center" ? "center" : "flex-end";
      const cell = { border: "1px solid #6b7280", padding: 0, textAlign: "center", fontSize: 12 };
      return (
        <div style={{ display: "flex", justifyContent: just, margin: "0 0 10px" }}>
          <table style={{ borderCollapse: "collapse", fontFamily: FONT }}>
            <tbody>
              <tr>
                <td rowSpan={p.showDate ? 3 : 2} style={{ ...cell, width: 22, background: "#eef1f5", fontWeight: 700, color: "#1c2430", letterSpacing: 2, writingMode: "vertical-rl", textOrientation: "upright", padding: "8px 2px" }}>{p.label}</td>
                {roles.map((r, i) => <td key={i} style={{ ...cell, minWidth: 64, height: 22, background: "#f5f7fa", fontWeight: 600, color: "#3a4250", padding: "2px 6px" }}>{r.role}</td>)}
              </tr>
              <tr>
                {roles.map((r, i) => <td key={i} style={{ ...cell, height: 50, verticalAlign: "middle", color: "#9aa3b2" }}>{r.name ? <span style={{ color: "#1c2430", fontWeight: 600 }}>{r.name}</span> : ""}</td>)}
              </tr>
              {p.showDate && <tr>{roles.map((r, i) => <td key={i} style={{ ...cell, height: 20, fontSize: 10.5, color: "#9aa3b2" }}>. .</td>)}</tr>}
            </tbody>
          </table>
        </div>
      );
    },

    docTitle: (p, ctx) => (
      <div style={{ textAlign: "center", margin: "4px 0 14px" }}>
        <div style={{ fontSize: 27, fontWeight: 800, color: "#10151d", letterSpacing: p.spread ? "0.22em" : "0.02em", lineHeight: 1.2 }}>{p.title}</div>
        {p.subtitle ? <div style={{ fontSize: 12.5, color: "#7b8493", marginTop: 4, letterSpacing: "0.18em", textTransform: "uppercase" }}>{p.subtitle}</div> : null}
        <div style={{ height: 3, background: ctx.settings.accent, width: 64, margin: "10px auto 0", borderRadius: 2 }} />
      </div>
    ),

    docInfo: (p) => {
      const rows = splitL(p.rows).map((r) => { const i = r.indexOf(":"); return { label: i >= 0 ? r.slice(0, i).trim() : r, value: i >= 0 ? r.slice(i + 1).trim() : "" }; });
      const cols = Number(p.cols) || 2;
      const lab = { border: "1px solid #6b7280", background: "#eef1f5", fontWeight: 700, color: "#1c2430", fontSize: 12.5, textAlign: "center", padding: "7px 8px", width: cols === 2 ? "16%" : "20%", whiteSpace: "nowrap" };
      const val = { border: "1px solid #6b7280", fontSize: 12.5, color: "#222", padding: "7px 10px" };
      const pairs = [];
      for (let i = 0; i < rows.length; i += cols) pairs.push(rows.slice(i, i + cols));
      return (
        <table style={{ width: "100%", borderCollapse: "collapse", margin: "0 0 12px", fontFamily: FONT }}>
          <tbody>
            {pairs.map((row, ri) => (
              <tr key={ri}>{row.map((c, ci) => <React.Fragment key={ci}><td style={lab}>{c.label}</td><td style={val}>{c.value || "\u00a0"}</td></React.Fragment>)}
                {row.length < cols ? Array.from({ length: cols - row.length }).map((_, k) => <React.Fragment key={"e" + k}><td style={lab}></td><td style={val}></td></React.Fragment>) : null}
              </tr>
            ))}
          </tbody>
        </table>
      );
    },

    sectionHeader: (p, ctx) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: p.shade ? "#eef1f5" : "transparent", borderLeft: `3px solid ${ctx.settings.accent}`, padding: "7px 10px", margin: "12px 0 4px", fontWeight: 700, fontSize: 14, color: "#1c2430" }}>{p.text}</div>
    ),

    textField: (p) => fieldRow(p.label, underInput(p.placeholder), p.required),
    numberField: (p) => fieldRow(p.label, (
      <div style={{ display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid #b9c0cc" }}><input type="number" style={{ flex: 1, border: 0, background: "transparent", font: FONT, fontSize: 13.5, padding: "3px 2px", outline: "none" }} />{p.unit ? <span style={{ fontSize: 12.5, color: "#6b7280" }}>{p.unit}</span> : null}</div>
    ), p.required),
    dateField: (p) => fieldRow(p.label, <input type="date" style={{ border: 0, borderBottom: "1px solid #b9c0cc", background: "transparent", font: FONT, fontSize: 13.5, padding: "3px 2px", outline: "none", color: "#444" }} />, p.required),
    currencyField: (p) => fieldRow(p.label, (
      <div style={{ display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid #b9c0cc", maxWidth: 220 }}><span style={{ fontSize: 14, fontWeight: 700, color: "#1c2430" }}>{p.currency}</span><input type="text" placeholder="0" style={{ flex: 1, border: 0, background: "transparent", font: FONT, fontSize: 13.5, padding: "3px 2px", outline: "none", textAlign: "right" }} /></div>
    ), p.required),
    selectField: (p) => fieldRow(p.label, (
      <select style={{ width: "100%", maxWidth: 280, border: 0, borderBottom: "1px solid #b9c0cc", background: "transparent", font: FONT, fontSize: 13.5, padding: "3px 2px", outline: "none", color: "#444" }}><option value="">선택하세요</option>{splitC(p.options).map((o, i) => <option key={i}>{o}</option>)}</select>
    ), p.required),
    radioGroup: (p) => fieldRow(p.label, (
      <div style={{ display: "flex", flexDirection: p.inline ? "row" : "column", flexWrap: "wrap", gap: p.inline ? 18 : 6, paddingTop: 4 }}>{splitC(p.options).map((o, i) => <label key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, color: "#222" }}><input type="radio" name={p.label + "_r"} style={{ accentColor: "#1b3a6b" }} />{o}</label>)}</div>
    )),
    checkboxGroup: (p) => fieldRow(p.label, (
      <div style={{ display: "flex", flexDirection: p.inline ? "row" : "column", flexWrap: "wrap", gap: p.inline ? 18 : 6, paddingTop: 4 }}>{splitC(p.options).map((o, i) => <label key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, color: "#222" }}><input type="checkbox" style={{ accentColor: "#1b3a6b" }} />{o}</label>)}</div>
    )),
    textareaField: (p) => fieldRow(p.label, (
      <textarea rows={Number(p.rows) || 3} placeholder={p.placeholder} style={{ width: "100%", border: "1px solid #cdd3dd", borderRadius: 4, background: "#fff", font: FONT, fontSize: 13.5, padding: "6px 8px", outline: "none", resize: "vertical", color: "#222" }} />
    )),
    fileField: (p) => fieldRow(p.label, (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid #cdd3dd", borderRadius: 4, padding: "6px 12px", fontSize: 13, color: "#3a4250", background: "#f8fafc" }}>＋ 파일 선택{p.multiple ? " (여러 개)" : ""}</span>
        {p.hint ? <span style={{ fontSize: 12, color: "#8a93a3" }}>{p.hint}</span> : null}
      </div>
    )),

    lineItems: (p, ctx) => {
      const cols = splitC(p.columns); const n = Number(p.rows) || 4; const acc = ctx.settings.accent;
      const th = { border: "1px solid #6b7280", background: acc, color: "#fff", fontSize: 12.5, fontWeight: 700, padding: "7px 8px", textAlign: "center" };
      const td = { border: "1px solid #c2c8d2", height: 30, fontSize: 12.5, padding: "3px 8px" };
      return (
        <div style={{ margin: "6px 0 12px" }}>
          {p.title ? <div style={{ fontWeight: 700, fontSize: 13.5, color: "#1c2430", margin: "0 0 6px" }}>{p.title}</div> : null}
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT }}>
            <thead><tr>{cols.map((c, i) => <th key={i} style={th}>{c}</th>)}</tr></thead>
            <tbody>
              {Array.from({ length: n }).map((_, r) => <tr key={r}>{cols.map((c, i) => <td key={i} style={{ ...td, textAlign: c === p.amountCol || /금액|단가/.test(c) ? "right" : "left", color: "#9aa3b2" }}></td>)}</tr>)}
              {p.showTotal && <tr><td style={{ ...td, background: "#eef1f5", fontWeight: 700, textAlign: "center", color: "#1c2430" }} colSpan={Math.max(1, cols.length - 1)}>합 계</td><td style={{ ...td, background: "#eef1f5", fontWeight: 700, textAlign: "right", color: "#1c2430" }}>{p.currency} 0</td></tr>}
            </tbody>
          </table>
        </div>
      );
    },

    signatureArea: (p) => {
      const parties = splitC(p.parties);
      return (
        <div style={{ margin: "18px 0 4px", textAlign: "center" }}>
          {p.showDate && <div style={{ fontSize: 14, letterSpacing: "0.1em", color: "#1c2430", margin: "0 0 16px" }}>20&nbsp;&nbsp;&nbsp;&nbsp;년&nbsp;&nbsp;&nbsp;&nbsp;월&nbsp;&nbsp;&nbsp;&nbsp;일</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end", maxWidth: 360, marginLeft: "auto" }}>
            {parties.map((pt, i) => (
              <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 10, fontSize: 14, color: "#1c2430" }}>
                <span style={{ fontWeight: 700, minWidth: 56, textAlign: "right" }}>{pt}</span>
                <span style={{ display: "inline-block", width: 150, borderBottom: "1px solid #6b7280", height: 22 }} />
                <span style={{ color: "#6b7280" }}>{p.stampWord}</span>
              </div>
            ))}
          </div>
        </div>
      );
    },

    notice: (p) => (
      <div style={{ fontSize: 12.5, color: "#6b7280", lineHeight: 1.7, padding: "8px 2px", whiteSpace: "pre-wrap" }}>{p.text}</div>
    ),
  };

  window.APBRender = function (type, props, ctx) {
    const fn = R[type];
    return fn ? fn(props || {}, ctx || { settings: {} }) : <div style={{ padding: 12, color: "#9aa3b2" }}>Unknown: {type}</div>;
  };
})();
