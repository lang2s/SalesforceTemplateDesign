/* Dashboard Builder — widget renderers (props-aware).
   window.DBBRender(type, props, ctx) -> React element body for a widget.
   ctx = { colors:[hex...], palettes }. Charts are SVG/CSS, SLDS-tokenized. */
(function () {
  const DS = window.SalesforceSLDS2DesignSystem_2eee88;
  const { Datatable, Icon, Badge, Pill } = DS;
  const { datasets, labelToKey, palettes } = window.DBB;

  // ---------- data + format helpers ----------
  function resolve(props) {
    const key = labelToKey[props.groupBy] || labelToKey[props.rowGroup] || "stage";
    return datasets[key] || datasets.stage;
  }
  function colorsFor(props, ctx) {
    if (props && props.palette && props.palette !== "inherit" && palettes[props.palette]) return palettes[props.palette];
    return (ctx && ctx.colors) || palettes.Salesforce;
  }
  function isCount(props) { return /count/i.test((props && props.measure) || ""); }
  function fmt(v, props) {
    if (isCount(props)) return Math.round(v).toLocaleString();
    const n = Number(v) || 0;
    return n >= 1000 ? "$" + (n / 1000).toFixed(1) + "M" : "$" + Math.round(n) + "K";
  }
  const tok = {
    label: { fontSize: 10.5, color: "var(--slds-g-color-on-surface-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
    val: { fontSize: 10.5, fontWeight: 600, color: "var(--slds-g-color-on-surface-2)" },
  };
  const wrap = (children, style) => <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", minHeight: 0, ...style }}>{children}</div>;

  function Legend({ items, colors, pos }) {
    if (pos === "None") return null;
    const row = pos === "Bottom";
    return (
      <div style={{ display: "flex", flexDirection: row ? "row" : "column", flexWrap: "wrap", gap: row ? "0.75rem" : "0.35rem", justifyContent: row ? "center" : "flex-start", padding: row ? "0.4rem 0 0" : "0 0 0 0.5rem", alignContent: "flex-start" }}>
        {items.map((it, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--slds-g-color-on-surface-2)" }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: colors[i % colors.length], flex: "none" }} />{it}
          </span>
        ))}
      </div>
    );
  }

  // ---------- primitive charts ----------
  function ColumnChart({ props, ctx, stacked }) {
    const d = resolve(props), colors = colorsFor(props, ctx);
    const series = stacked ? d.series : [d.series[0]];
    const totals = d.cats.map((_, i) => series.reduce((s, se) => s + (se.data[i] || 0), 0));
    const max = Math.max(...totals, ...d.series.flatMap((s) => s.data), 1);
    return wrap(
      <React.Fragment>
        <div style={{ flex: 1, display: "flex", alignItems: "stretch", gap: 8, minHeight: 0, padding: "4px 0" }}>
          {d.cats.map((c, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: 4, minWidth: 0 }}>
              {props.showValues && !stacked && <span style={tok.val}>{fmt(series[0].data[i], props)}</span>}
              <div style={{ width: "72%", maxWidth: 46, height: `${(totals[i] / max) * 100}%`, display: "flex", flexDirection: "column", justifyContent: "flex-end", borderRadius: "3px 3px 0 0", overflow: "hidden", minHeight: 2 }}>
                {series.map((se, si) => (
                  <div key={si} style={{ height: stacked ? `${(se.data[i] / totals[i]) * 100}%` : "100%", background: colors[si % colors.length], opacity: stacked ? 1 : 0.92 }} />
                ))}
              </div>
              <span style={{ ...tok.label, maxWidth: "100%" }}>{c}</span>
            </div>
          ))}
        </div>
        {stacked && <Legend items={d.series.map((s) => s.name)} colors={colors} pos={props.legend === "None" ? "None" : "Bottom"} />}
      </React.Fragment>
    );
  }

  function BarChart({ props, ctx }) {
    const d = resolve(props), colors = colorsFor(props, ctx);
    const data = d.series[0].data, max = Math.max(...data, 1);
    return wrap(
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 7, minHeight: 0 }}>
        {d.cats.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ ...tok.label, width: 64, textAlign: "right", flex: "none" }}>{c}</span>
            <div style={{ flex: 1, background: "var(--slds-g-color-surface-3)", borderRadius: 3, height: 16, overflow: "hidden" }}>
              <div style={{ width: `${(data[i] / max) * 100}%`, height: "100%", background: colors[i % colors.length], borderRadius: 3 }} />
            </div>
            {props.showValues && <span style={{ ...tok.val, width: 50, flex: "none" }}>{fmt(data[i], props)}</span>}
          </div>
        ))}
      </div>
    );
  }

  function StackedBar({ props, ctx }) {
    const d = resolve(props), colors = colorsFor(props, ctx);
    const totals = d.cats.map((_, i) => d.series.reduce((s, se) => s + (se.data[i] || 0), 0));
    const max = Math.max(...totals, 1);
    return wrap(
      <React.Fragment>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 7, minHeight: 0 }}>
          {d.cats.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ ...tok.label, width: 64, textAlign: "right", flex: "none" }}>{c}</span>
              <div style={{ flex: 1, display: "flex", height: 16, borderRadius: 3, overflow: "hidden", width: `${(totals[i] / max) * 100}%` }}>
                {d.series.map((se, si) => <div key={si} style={{ flex: se.data[i] || 0, background: colors[si % colors.length] }} />)}
              </div>
            </div>
          ))}
        </div>
        <Legend items={d.series.map((s) => s.name)} colors={colors} pos={props.legend === "None" ? "None" : "Bottom"} />
      </React.Fragment>
    );
  }

  function LineChart({ props, ctx, area, cumulative }) {
    const d = resolve(props), colors = colorsFor(props, ctx);
    let series = d.series.map((s) => s.data.slice());
    if (cumulative) series = series.map((arr) => arr.map(((sum) => (v) => (sum += v))(0)));
    const max = Math.max(...series.flat(), 1), n = d.cats.length;
    const px = (i) => (n === 1 ? 50 : (i / (n - 1)) * 100);
    const py = (v) => 100 - (v / max) * 92 - 4;
    return wrap(
      <React.Fragment>
        <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
            {[25, 50, 75].map((g) => <line key={g} x1="0" y1={g} x2="100" y2={g} stroke="var(--slds-g-color-border-1)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />)}
            {series.map((arr, si) => {
              const pts = arr.map((v, i) => `${px(i)},${py(v)}`).join(" ");
              return (
                <g key={si}>
                  {area && <polygon points={`0,100 ${pts} 100,100`} fill={colors[si % colors.length]} opacity="0.14" />}
                  <polyline points={pts} fill="none" stroke={colors[si % colors.length]} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
                  {arr.map((v, i) => <circle key={i} cx={px(i)} cy={py(v)} r="1.6" fill={colors[si % colors.length]} vectorEffect="non-scaling-stroke" />)}
                </g>
              );
            })}
          </svg>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 2px 0" }}>{d.cats.map((c, i) => <span key={i} style={tok.label}>{c}</span>)}</div>
        {props.legend && props.legend !== "None" && d.series.length > 1 && <Legend items={d.series.map((s) => s.name)} colors={colors} pos="Bottom" />}
      </React.Fragment>
    );
  }

  function ComboChart({ props, ctx }) {
    const d = resolve(props), colors = colorsFor(props, ctx);
    const bars = d.series[0].data, line = (d.series[1] || d.series[0]).data;
    const max = Math.max(...bars, ...line, 1), n = d.cats.length;
    const px = (i) => (n === 1 ? 50 : (i / (n - 1)) * 100), py = (v) => 100 - (v / max) * 92 - 4;
    return wrap(
      <React.Fragment>
        <div style={{ flex: 1, position: "relative", minHeight: 0, display: "flex", alignItems: "flex-end", gap: 8, padding: "4px 0" }}>
          {d.cats.map((c, i) => (
            <div key={i} style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-end", height: "100%" }}>
              <div style={{ width: "60%", maxWidth: 40, height: `${(bars[i] / max) * 100}%`, background: colors[0], opacity: 0.9, borderRadius: "3px 3px 0 0", minHeight: 2 }} />
            </div>
          ))}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <polyline points={line.map((v, i) => `${px(i)},${py(v)}`).join(" ")} fill="none" stroke={colors[2] || colors[1]} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            {line.map((v, i) => <circle key={i} cx={px(i)} cy={py(v)} r="1.6" fill={colors[2] || colors[1]} vectorEffect="non-scaling-stroke" />)}
          </svg>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 2px 0" }}>{d.cats.map((c, i) => <span key={i} style={tok.label}>{c}</span>)}</div>
      </React.Fragment>
    );
  }

  function DonutChart({ props, ctx, pie }) {
    const d = resolve(props), colors = colorsFor(props, ctx);
    const data = d.series[0].data, total = data.reduce((a, b) => a + b, 0) || 1;
    let acc = 0;
    const stops = data.map((v, i) => { const a = (acc / total) * 360, b = ((acc + v) / total) * 360; acc += v; return `${colors[i % colors.length]} ${a}deg ${b}deg`; }).join(", ");
    const legendPos = props.legend === "None" ? "None" : (props.legend || "Right");
    return wrap(
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, minHeight: 0, flexDirection: legendPos === "Bottom" ? "column" : "row" }}>
        <div style={{ position: "relative", aspectRatio: "1", height: legendPos === "Bottom" ? "auto" : "92%", width: legendPos === "Bottom" ? "auto" : undefined, maxHeight: 150, flex: "none", display: "grid", placeItems: "center" }}>
          <div style={{ width: "100%", aspectRatio: "1", borderRadius: "50%", background: `conic-gradient(${stops})` }} />
          {!pie && <div style={{ position: "absolute", width: "56%", aspectRatio: "1", borderRadius: "50%", background: "var(--slds-g-color-surface-container-1)", display: "grid", placeItems: "center" }}><span style={{ fontSize: 13, fontWeight: 700, color: "var(--slds-g-color-on-surface-1)" }}>{fmt(total, props)}</span></div>}
        </div>
        <Legend items={d.cats.map((c, i) => props.showValues ? `${c} · ${fmt(data[i], props)}` : c)} colors={colors} pos={legendPos} />
      </div>
    );
  }

  function Funnel({ props, ctx }) {
    const d = resolve(props), colors = colorsFor(props, ctx);
    const data = d.series[0].data, max = Math.max(...data, 1);
    return wrap(
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, justifyContent: "center", minHeight: 0 }}>
        {d.cats.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", height: `${100 / d.cats.length}%` }}>
            <div style={{ width: `${30 + (data[i] / max) * 70}%`, height: "82%", background: colors[i % colors.length], clipPath: "polygon(6% 0, 94% 0, 86% 100%, 14% 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {props.showValues && <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{fmt(data[i], props)}</span>}
            </div>
            <span style={{ position: "absolute", left: 8, fontSize: 10.5, color: "var(--slds-g-color-on-surface-2)" }}>{c}</span>
          </div>
        ))}
      </div>
    );
  }

  function Scatter({ props, ctx }) {
    const colors = colorsFor(props, ctx);
    const pts = [[18, 72], [30, 54], [42, 60], [38, 30], [56, 44], [64, 22], [70, 58], [82, 34], [48, 78], [26, 40], [74, 70], [88, 50]];
    return wrap(
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          {[25, 50, 75].map((g) => <line key={g} x1="0" y1={g} x2="100" y2={g} stroke="var(--slds-g-color-border-1)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />)}
          {[25, 50, 75].map((g) => <line key={"v" + g} x1={g} y1="0" x2={g} y2="100" stroke="var(--slds-g-color-border-1)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />)}
          {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2.4" fill={colors[i % colors.length]} opacity="0.85" vectorEffect="non-scaling-stroke" />)}
        </svg>
      </div>
    );
  }

  function HeatMap({ props, ctx }) {
    const d = resolve(props), colors = colorsFor(props, ctx);
    const base = colors[0];
    const cols = 6, rows = Math.min(d.cats.length, 5);
    return wrap(
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minHeight: 0 }}>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} style={{ flex: 1, display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ ...tok.label, width: 60, textAlign: "right", flex: "none" }}>{d.cats[r]}</span>
            <div style={{ flex: 1, display: "flex", gap: 4, height: "100%" }}>
              {Array.from({ length: cols }).map((__, c) => { const v = (Math.sin(r * 1.7 + c) + 1) / 2 * 0.85 + 0.12; return <div key={c} style={{ flex: 1, borderRadius: 3, background: base, opacity: v }} />; })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function Gauge({ props, ctx }) {
    const colors = colorsFor(props, ctx);
    const min = Number(props.min) || 0, max = Number(props.max) || 100, val = Number(props.value) || 0;
    const frac = Math.max(0, Math.min(1, (val - min) / (max - min || 1)));
    const lowF = Math.max(0, Math.min(1, ((Number(props.low) || 0) - min) / (max - min || 1)));
    const highF = Math.max(0, Math.min(1, ((Number(props.high) || 0) - min) / (max - min || 1)));
    const R = 42, CX = 50, CY = 50, C = Math.PI * R;
    const arc = (f) => { const a = Math.PI * (1 - f); return `${CX + R * Math.cos(a)},${CY - R * Math.sin(a)}`; };
    const seg = (f0, f1, color) => { const large = 0; const big = (f1 - f0) > 0.5 ? 1 : 0; return <path d={`M ${arc(f0)} A ${R} ${R} 0 ${big} 1 ${arc(f1)}`} fill="none" stroke={color} strokeWidth="10" strokeLinecap="butt" />; };
    return wrap(
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 0 }}>
        <svg viewBox="0 4 100 54" style={{ width: "100%", maxWidth: 220 }}>
          {seg(0, lowF || 0.001, "#ba0517")}
          {seg(lowF, highF, "#fe9339")}
          {seg(highF, 1, "#3ba755")}
          <path d={`M ${arc(0)} A ${R} ${R} 0 1 1 ${arc(1)}`} fill="none" stroke="var(--slds-g-color-surface-3)" strokeWidth="10" opacity="0.0" />
          {(() => { const a = Math.PI * (1 - frac); const nx = CX + (R - 2) * Math.cos(a), ny = CY - (R - 2) * Math.sin(a); return <line x1={CX} y1={CY} x2={nx} y2={ny} stroke="var(--slds-g-color-on-surface-1)" strokeWidth="2.5" strokeLinecap="round" />; })()}
          <circle cx={CX} cy={CY} r="3.4" fill="var(--slds-g-color-on-surface-1)" />
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 220, padding: "0 6px", marginTop: -4 }}><span style={tok.label}>{min}</span><span style={tok.label}>{max}</span></div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "var(--slds-g-color-on-surface-1)", lineHeight: 1.1 }}>{val}{/%/.test(props.units || "") ? "" : ""}<span style={{ fontSize: 13, color: "var(--slds-g-color-on-surface-3)" }}> / {max}</span></div>
      </div>
    );
  }

  function Metric({ props }) {
    const up = props.trend === "up", down = props.trend === "down";
    const tone = props.accent ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-on-surface-1)";
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, textAlign: "center" }}>
        <div style={{ fontSize: "clamp(22px, 7cqw, 38px)", fontWeight: 800, color: tone, lineHeight: 1.05, letterSpacing: "-0.01em" }}>{props.value}</div>
        {props.delta && <div style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 700, color: up ? "var(--slds-g-color-success-1)" : down ? "var(--slds-g-color-error-1)" : "var(--slds-g-color-on-surface-3)" }}>
          <Icon iconName={up ? "utility:arrowup" : down ? "utility:arrowdown" : "utility:dash"} size="xx-small" />{props.delta}
        </div>}
      </div>
    );
  }

  function SummaryTable({ props }) {
    const d = resolve(props), data = d.series[0].data;
    const rows = d.cats.map((c, i) => ({ id: String(i), grp: c, val: fmt(data[i], props) }));
    const total = data.reduce((a, b) => a + b, 0);
    const cols = [{ key: "grp", label: d.label }, { key: "val", label: props.measure || "Amount", align: "right" }];
    return (
      <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
        <Datatable columns={cols} rows={rows.slice(0, Number(props.maxRows) || 6)} style={{ border: 0, boxShadow: "none", borderRadius: 0 }} />
        {props.showTotal && <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0.75rem", borderTop: "2px solid var(--slds-g-color-border-2)", fontWeight: 700, fontSize: "var(--slds-g-text-body-small)" }}><span>Total</span><span>{fmt(total, props)}</span></div>}
      </div>
    );
  }

  const LT_ROWS = [
    { id: "1", c0: "Global Media — Renewal", c1: "$240K", c2: "Negotiation", c3: "8/30/2026" },
    { id: "2", c0: "Acme — Agentforce", c1: "$320K", c2: "Proposal", c3: "6/10/2026" },
    { id: "3", c0: "Pinnacle — Expansion", c1: "$185K", c2: "Discovery", c3: "9/15/2026" },
    { id: "4", c0: "Initech — Platform", c1: "$96K", c2: "Qualify", c3: "10/02/2026" },
    { id: "5", c0: "Umbrella — Services", c1: "$72K", c2: "Proposal", c3: "9/28/2026" },
  ];
  function LightningTable({ props }) {
    const labels = String(props.columns || "Opportunity, Amount, Stage, Close Date").split(",").map((s) => s.trim());
    const cols = labels.map((l, i) => ({ key: "c" + i, label: l, align: i === 1 ? "right" : undefined, render: i === 2 ? (v) => <Badge variant={v === "Negotiation" || v === "Proposal" ? "brand" : "inverse"} label={v} /> : undefined }));
    return <div style={{ width: "100%", height: "100%", overflow: "auto" }}><Datatable selectable={false} columns={cols} rows={LT_ROWS.slice(0, Number(props.maxRows) || 5)} style={{ border: 0, boxShadow: "none", borderRadius: 0 }} /></div>;
  }

  function Pivot({ props, ctx }) {
    const rowKey = labelToKey[props.rowGroup] || "stage", colKey = labelToKey[props.colGroup] || "type";
    const rd = datasets[rowKey], cd = datasets[colKey];
    const rows = rd.cats.slice(0, 5), cols = cd.cats.slice(0, 4);
    const colors = colorsFor(props, ctx);
    return (
      <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
          <thead><tr><th style={{ textAlign: "left", padding: "4px 8px", color: "var(--slds-g-color-on-surface-3)", fontWeight: 700, borderBottom: "1px solid var(--slds-g-color-border-2)" }}>{rd.label}</th>
            {cols.map((c, i) => <th key={i} style={{ textAlign: "right", padding: "4px 8px", color: "var(--slds-g-color-on-surface-3)", fontWeight: 700, borderBottom: "1px solid var(--slds-g-color-border-2)" }}>{c}</th>)}</tr></thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri}>
                <td style={{ padding: "4px 8px", borderBottom: "1px solid var(--slds-g-color-border-1)", fontWeight: 600 }}>{r}</td>
                {cols.map((c, ci) => { const v = Math.round((Math.sin(ri * 2 + ci) + 1.2) * 42); return <td key={ci} style={{ padding: "4px 8px", textAlign: "right", borderBottom: "1px solid var(--slds-g-color-border-1)", background: `color-mix(in srgb, ${colors[0]} ${v / 2}%, transparent)` }}>{fmt(v, props)}</td>; })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function TextWidget({ props }) {
    return <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: props.align || "left", gap: 6, padding: "0.25rem 0.25rem" }}>
      {props.heading && <div style={{ fontSize: "var(--slds-g-text-heading-small)", fontWeight: 700, color: "var(--slds-g-color-on-surface-1)" }}>{props.heading}</div>}
      <div style={{ fontSize: "var(--slds-g-text-body-regular)", color: "var(--slds-g-color-on-surface-2)", lineHeight: 1.5 }}>{props.content}</div>
    </div>;
  }
  function ImageWidget({ props }) {
    return <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
      {props.url ? <img src={props.url} alt={props.label} style={{ maxWidth: "100%", maxHeight: "78%", objectFit: "contain", borderRadius: 4 }} />
        : <div style={{ width: "70%", height: "62%", borderRadius: 6, border: "2px dashed var(--slds-g-color-border-2)", display: "grid", placeItems: "center", background: "var(--slds-g-color-surface-2)" }}><Icon iconName="utility:image" size="small" /></div>}
      {props.label && <div style={{ fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-3)" }}>{props.label}</div>}
    </div>;
  }
  function FilterBar({ props }) {
    const fields = String(props.fields || "").split(",").map((s) => s.trim()).filter(Boolean);
    return <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: "0 2px" }}>
      <Icon iconName="utility:filterList" size="x-small" />
      {fields.map((f, i) => <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "var(--slds-g-color-on-surface-2)", border: "1px solid var(--slds-g-color-border-2)", borderRadius: "var(--slds-g-radius-border-pill)", padding: "3px 10px", background: "var(--slds-g-color-surface-container-1)" }}>{f}<Icon iconName="utility:chevrondown" size="xx-small" /></span>)}
    </div>;
  }

  const R = {
    bar: (p, c) => <BarChart props={p} ctx={c} />,
    column: (p, c) => <ColumnChart props={p} ctx={c} />,
    stackedBar: (p, c) => <StackedBar props={p} ctx={c} />,
    stackedColumn: (p, c) => <ColumnChart props={p} ctx={c} stacked />,
    line: (p, c) => <LineChart props={p} ctx={c} />,
    cumulativeLine: (p, c) => <LineChart props={p} ctx={c} cumulative />,
    area: (p, c) => <LineChart props={p} ctx={c} area />,
    combo: (p, c) => <ComboChart props={p} ctx={c} />,
    donut: (p, c) => <DonutChart props={p} ctx={c} />,
    pie: (p, c) => <DonutChart props={p} ctx={c} pie />,
    funnel: (p, c) => <Funnel props={p} ctx={c} />,
    scatter: (p, c) => <Scatter props={p} ctx={c} />,
    heatMap: (p, c) => <HeatMap props={p} ctx={c} />,
    gauge: (p, c) => <Gauge props={p} ctx={c} />,
    metric: (p) => <Metric props={p} />,
    table: (p) => <SummaryTable props={p} />,
    lightningTable: (p) => <LightningTable props={p} />,
    pivot: (p, c) => <Pivot props={p} ctx={c} />,
    text: (p) => <TextWidget props={p} />,
    image: (p) => <ImageWidget props={p} />,
    filter: (p) => <FilterBar props={p} />,
  };

  window.DBBRender = function (type, props, ctx) {
    const fn = R[type];
    return fn ? fn(props || {}, ctx || {}) : <div style={{ padding: 12, color: "var(--slds-g-color-on-surface-3)" }}>Unknown: {type}</div>;
  };
})();
