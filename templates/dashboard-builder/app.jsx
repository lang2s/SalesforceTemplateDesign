/* Dashboard Builder — main app. 12-column grid canvas with drag-to-reorder,
   corner-resize, per-widget property editor, dashboard settings & export. */
(function () {
  const DS = window.SalesforceSLDS2DesignSystem_2eee88;
  const { catalog, byType, defaultProps, starter, palettes } = window.DBB;
  const { Icon, Button, ButtonMenu, Badge, Modal, Input, Select, Textarea, Toggle } = DS;
  const KEY = "dbb-state-v1";
  const GAP = 14, ROWPX = 72, MAXH = 8;

  let UID = 1; const uid = () => "w" + UID++;
  let DRAG = null;

  function mkWidget(type) { const c = byType[type]; return { id: uid(), type, w: c.w, h: c.h, props: defaultProps(type) }; }
  function freshSettings() { return { title: "Sales Performance", folder: "Sales Reports", runningUser: "Austin Guevara", description: "Pipeline, bookings and quota attainment for the current quarter.", columns: 12, palette: "Salesforce" }; }
  function seed() { return { settings: freshSettings(), widgets: starter().map((w) => ({ id: uid(), type: w.type, w: w.w, h: w.h, props: { ...w.props } })) }; }
  function loadState() { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && Array.isArray(s.widgets) && s.settings) return s; } catch (e) {} return seed(); }

  function download(filename, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  const copy = (t) => navigator.clipboard && navigator.clipboard.writeText(t).catch(() => {});
  function groupOrder() { const seen = []; catalog.forEach((c) => { if (!seen.includes(c.group)) seen.push(c.group); }); return seen; }

  function App() {
    const [state, setState] = React.useState(loadState);
    const [sel, setSel] = React.useState(null);
    const [preview, setPreview] = React.useState(false);
    const [overIdx, setOverIdx] = React.useState(null);
    const [exp, setExp] = React.useState(false);
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const gridRef = React.useRef(null);
    const resizing = React.useRef(null);

    React.useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)); }, [state]);

    const cols = state.settings.columns || 12;
    const ctx = { colors: palettes[state.settings.palette] || palettes.Salesforce, palettes };

    function update(fn) { setState((s) => fn({ ...s, widgets: s.widgets.map((w) => ({ ...w })) })); }
    function addWidget(type, index) { update((s) => { const nw = mkWidget(type); nw.w = Math.min(nw.w, cols); s.widgets.splice(index == null ? s.widgets.length : index, 0, nw); return s; }); }
    function moveWidget(id, index) { update((s) => { const i = s.widgets.findIndex((w) => w.id === id); if (i < 0) return s; const [w] = s.widgets.splice(i, 1); let ti = index == null ? s.widgets.length : index; if (i < ti) ti -= 1; s.widgets.splice(ti, 0, w); return s; }); }
    function removeWidget(id) { update((s) => { s.widgets = s.widgets.filter((w) => w.id !== id); return s; }); setSel(null); }
    function duplicateWidget(id) { update((s) => { const i = s.widgets.findIndex((w) => w.id === id); if (i < 0) return s; const o = s.widgets[i]; s.widgets.splice(i + 1, 0, { ...o, id: uid(), props: { ...o.props } }); return s; }); }
    function nudge(id, dir) { update((s) => { const i = s.widgets.findIndex((w) => w.id === id); const j = i + dir; if (i < 0 || j < 0 || j >= s.widgets.length) return s; const t = s.widgets[i]; s.widgets[i] = s.widgets[j]; s.widgets[j] = t; return s; }); }
    function setProp(id, key, val) { update((s) => { s.widgets = s.widgets.map((w) => w.id === id ? { ...w, props: { ...w.props, [key]: val } } : w); return s; }); }
    function setSize(id, key, val) { update((s) => { s.widgets = s.widgets.map((w) => w.id === id ? { ...w, [key]: val } : w); return s; }); }

    function onDropAt(index, e) { e.preventDefault(); e.stopPropagation(); setOverIdx(null); const d = DRAG; DRAG = null; if (!d) return; if (d.kind === "new") addWidget(d.type, index); else if (d.kind === "move") moveWidget(d.id, index); }

    // ----- pointer resize -----
    function startResize(e, w) {
      e.preventDefault(); e.stopPropagation();
      const grid = gridRef.current; if (!grid) return;
      const gr = grid.getBoundingClientRect();
      const cellW = (gr.width - GAP * (cols - 1)) / cols;
      const el = e.currentTarget.closest(".dbb-widget"); const wr = el.getBoundingClientRect();
      resizing.current = { id: w.id, left: wr.left, top: wr.top, cellW };
      window.addEventListener("pointermove", onResizeMove);
      window.addEventListener("pointerup", onResizeUp);
    }
    function onResizeMove(e) {
      const r = resizing.current; if (!r) return;
      const nw = Math.max(1, Math.min(cols, Math.round((e.clientX - r.left + GAP) / (r.cellW + GAP))));
      const nh = Math.max(1, Math.min(MAXH, Math.round((e.clientY - r.top + GAP) / (ROWPX + GAP))));
      setState((s) => ({ ...s, widgets: s.widgets.map((w) => w.id === r.id ? (w.w === nw && w.h === nh ? w : { ...w, w: nw, h: nh }) : w) }));
    }
    function onResizeUp() { resizing.current = null; window.removeEventListener("pointermove", onResizeMove); window.removeEventListener("pointerup", onResizeUp); }

    const selWidget = sel ? state.widgets.find((w) => w.id === sel) : null;

    return (
      <div className="dbb">
        <header className="dbb-bar">
          <div className="dbb-brand">
            <img src="../../assets/salesforce-cloud.svg" alt="" style={{ height: 22 }} />
            <div>
              <strong>{state.settings.title}</strong>
              <div className="dbb-sub">{state.settings.folder} · {cols}-col grid</div>
            </div>
            <span className="dbb-tag">Dashboard Builder</span>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <ButtonMenu label={state.settings.palette} iconName="utility:palette" items={Object.keys(palettes).map((pal) => ({ label: pal, checked: pal === state.settings.palette, onClick: () => setState((s) => ({ ...s, settings: { ...s.settings, palette: pal } })) }))} />
            <Button variant="neutral" iconName="utility:settings" label="Settings" onClick={() => setSettingsOpen(true)} />
            <Button variant={preview ? "brand" : "neutral"} iconName="utility:preview" label={preview ? "Editing off" : "Preview"} onClick={() => { setPreview((p) => !p); setSel(null); }} />
            <Button variant="neutral" iconName="utility:refresh" title="Reset" onClick={() => { setState(seed()); setSel(null); }} />
            <Button variant="brand" iconName="utility:download" label="Export" onClick={() => setExp(true)} />
          </div>
        </header>

        <div className="dbb-body">
          {!preview && (
            <aside className="dbb-palette">
              <div className="dbb-palette-h">Widgets</div>
              <p className="dbb-hint">Drag onto the grid, or click to add. Select a widget to edit its source, grouping &amp; size.</p>
              {groupOrder().map((g) => (
                <div key={g} className="dbb-group">
                  <div className="dbb-group-h">{g}</div>
                  {catalog.filter((c) => c.group === g).map((c) => (
                    <div key={c.type} className="dbb-pitem" draggable
                      onDragStart={() => (DRAG = { kind: "new", type: c.type })} onDragEnd={() => (DRAG = null)}
                      onClick={() => addWidget(c.type)} title={c.desc + "  ·  click to add"}>
                      <span className="dbb-pico"><Icon iconName={c.icon} size="small" /></span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="dbb-pitem-l">{c.label}</div>
                        <div className="dbb-pitem-d">{c.desc}</div>
                      </div>
                      <Icon iconName="utility:drag_and_drop" size="xx-small" />
                    </div>
                  ))}
                </div>
              ))}
            </aside>
          )}

          <main className="dbb-canvas" onClick={() => setSel(null)}>
            <div className="dbb-sheet" onClick={(e) => e.stopPropagation()}>
              <div ref={gridRef} className="dbb-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: GAP, gridAutoRows: `${ROWPX}px` }}
                onDragOver={(e) => { e.preventDefault(); }} onDrop={(e) => onDropAt(null, e)}>
                {state.widgets.map((w, i) => (
                  <Widget key={w.id} w={w} index={i} />
                ))}
                {state.widgets.length === 0 && (
                  <div className="dbb-blank" style={{ gridColumn: "1 / -1" }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDropAt(0, e)}>
                    <Icon iconName="utility:add" size="small" /><span>Drag a widget here to start your dashboard</span>
                  </div>
                )}
              </div>
            </div>
          </main>

          {!preview && (
            <aside className="dbb-inspect">
              <div className="dbb-palette-h">{selWidget ? "Properties" : "Dashboard"}</div>
              {selWidget ? (
                <div className="dbb-insp-body">
                  <div className="dbb-insp-title"><Icon iconName={byType[selWidget.type].icon} size="small" /><strong>{byType[selWidget.type].label}</strong></div>
                  <p className="dbb-insp-desc">{byType[selWidget.type].desc}</p>

                  <div className="dbb-size">
                    <SizeStepper label="Width" value={selWidget.w} min={1} max={cols} unit="cols" onChange={(v) => setSize(selWidget.id, "w", v)} />
                    <SizeStepper label="Height" value={selWidget.h} min={1} max={MAXH} unit="rows" onChange={(v) => setSize(selWidget.id, "h", v)} />
                  </div>

                  {(byType[selWidget.type].props || []).length > 0 && (
                    <div className="dbb-props">
                      {byType[selWidget.type].props.map((pr) => (
                        <PropEditor key={pr.k} pr={pr} value={selWidget.props[pr.k]} onChange={(v) => setProp(selWidget.id, pr.k, v)} />
                      ))}
                    </div>
                  )}

                  <dl className="dbb-meta">
                    <dt>SF type</dt><dd><code>{byType[selWidget.type].sfType}</code></dd>
                    <dt>Grid</dt><dd>{selWidget.w} × {selWidget.h}</dd>
                  </dl>
                  <div className="dbb-insp-actions">
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Button variant="neutral" size="small" iconName="utility:up" label="Up" onClick={() => nudge(selWidget.id, -1)} />
                      <Button variant="neutral" size="small" iconName="utility:down" label="Down" onClick={() => nudge(selWidget.id, 1)} />
                      <Button variant="neutral" size="small" iconName="utility:copy" title="Duplicate" onClick={() => duplicateWidget(selWidget.id)} />
                    </div>
                    <Button variant="destructive" size="small" iconName="utility:delete" label="Remove" onClick={() => removeWidget(selWidget.id)} />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="dbb-hint" style={{ padding: "0 0.875rem" }}>Select a widget to edit it. These dashboard settings flow into the export.</p>
                  <div className="dbb-pagecard">
                    <div className="dbb-pagecard-h"><Icon iconName="standard:dashboard" size="small" /><strong>{state.settings.title}</strong></div>
                    <dl className="dbb-meta" style={{ margin: "0.5rem 0 0" }}>
                      <dt>Folder</dt><dd>{state.settings.folder}</dd>
                      <dt>Running user</dt><dd>{state.settings.runningUser}</dd>
                      <dt>Columns</dt><dd>{cols}</dd>
                      <dt>Widgets</dt><dd>{state.widgets.length}</dd>
                    </dl>
                    <Button variant="neutral" size="small" iconName="utility:settings" label="Dashboard settings" onClick={() => setSettingsOpen(true)} style={{ marginTop: "0.625rem", width: "100%" }} />
                  </div>
                  <div className="dbb-palette" style={{ width: "auto", border: 0, padding: "0 0.5rem" }}>
                    <div className="dbb-group-h" style={{ padding: "0.5rem 0.375rem 0.25rem" }}>Palette</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, padding: "0 0.375rem" }}>
                      {(palettes[state.settings.palette] || []).map((c, i) => <span key={i} style={{ width: 20, height: 20, borderRadius: 4, background: c, border: "1px solid rgba(0,0,0,.08)" }} />)}
                    </div>
                  </div>
                </div>
              )}
              <div className="dbb-insp-foot"><Icon iconName="utility:info" size="xx-small" /><span>Source, grouping &amp; size flow into the export, so the generated dashboard metadata matches this design.</span></div>
            </aside>
          )}
        </div>

        {exp && <ExportModal state={state} onClose={() => setExp(false)} />}
        {settingsOpen && <SettingsModal state={state} setState={setState} onClose={() => setSettingsOpen(false)} />}
      </div>
    );

    function Widget({ w, index }) {
      const selected = sel === w.id;
      const c = byType[w.type];
      const bare = w.type === "filter";
      const headTitle = w.props.title || w.props.heading || (w.type === "image" ? "" : "");
      return (
        <div className={`dbb-widget ${selected ? "sel" : ""} ${preview ? "preview" : ""} ${bare ? "bare" : ""}`}
          style={{ gridColumn: `span ${Math.min(w.w, cols)}`, gridRow: `span ${w.h}` }}
          draggable={!preview}
          onDragStart={(e) => { if (preview) return; DRAG = { kind: "move", id: w.id }; e.stopPropagation(); }} onDragEnd={() => (DRAG = null)}
          onDragOver={(e) => { if (!preview) { e.preventDefault(); setOverIdx(index); } }}
          onDragLeave={(e) => { if (e.currentTarget === e.target) setOverIdx((o) => (o === index ? null : o)); }}
          onDrop={(e) => { if (!preview) onDropAt(index, e); }}
          onClick={(e) => { if (!preview) { e.stopPropagation(); setSel(w.id); } }}>
          {overIdx === index && !preview && <div className="dbb-insline" />}
          {!preview && (
            <div className="dbb-wbar">
              <span className="dbb-grip"><Icon iconName="utility:drag_and_drop" size="xx-small" /></span>
              <span className="dbb-wname">{c.label}</span>
              <button className="dbb-ic" title="Up" onClick={(e) => { e.stopPropagation(); nudge(w.id, -1); }}>▲</button>
              <button className="dbb-ic" title="Down" onClick={(e) => { e.stopPropagation(); nudge(w.id, 1); }}>▼</button>
              <button className="dbb-ic" title="Duplicate" onClick={(e) => { e.stopPropagation(); duplicateWidget(w.id); }}>⎘</button>
              <button className="dbb-ic del" title="Remove" onClick={(e) => { e.stopPropagation(); removeWidget(w.id); }}>✕</button>
            </div>
          )}
          {!bare && headTitle ? (
            <div className="dbb-whead"><span className="dbb-wtitle">{headTitle}</span><Icon iconName={c.icon} size="xx-small" /></div>
          ) : null}
          <div className="dbb-wbody" style={{ containerType: "inline-size" }}>{window.DBBRender(w.type, w.props, ctx)}</div>
          {!preview && <span className="dbb-resize" title="Resize" onPointerDown={(e) => startResize(e, w)} onClick={(e) => e.stopPropagation()} />}
        </div>
      );
    }
  }

  function SizeStepper({ label, value, min, max, unit, onChange }) {
    return (
      <div className="dbb-stepper">
        <span className="dbb-stepper-l">{label}</span>
        <div className="dbb-stepper-c">
          <button onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>−</button>
          <span>{value} <em>{unit}</em></span>
          <button onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}>+</button>
        </div>
      </div>
    );
  }

  function PropEditor({ pr, value, onChange }) {
    if (pr.t === "toggle") return <div style={{ marginBottom: "0.625rem" }}><Toggle label={pr.l} checked={!!value} onChange={(e) => onChange(e && e.target ? e.target.checked : !value)} /></div>;
    if (pr.t === "select") return <div style={{ marginBottom: "0.625rem" }}><Select label={pr.l} value={value} options={pr.o.map((o) => ({ label: o, value: o }))} onChange={(e) => onChange(e.target.value)} /></div>;
    if (pr.t === "textarea") return <div style={{ marginBottom: "0.625rem" }}><Textarea label={pr.l} value={value} rows={3} onChange={(e) => onChange(e.target.value)} /></div>;
    if (pr.t === "number") return <div style={{ marginBottom: "0.625rem" }}><Input label={pr.l} type="number" value={value} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} /></div>;
    return <div style={{ marginBottom: "0.625rem" }}><Input label={pr.l} value={value} onChange={(e) => onChange(e.target.value)} /></div>;
  }

  function SettingsModal({ state, setState, onClose }) {
    const [s, setS] = React.useState(state.settings);
    const save = () => { setState((st) => ({ ...st, settings: s })); onClose(); };
    return (
      <Modal isOpen onClose={onClose} size="small" title="Dashboard settings" tagline="These map to the dashboard title, folder, running user & grid."
        footer={<React.Fragment><Button variant="neutral" label="Cancel" onClick={onClose} /><Button variant="brand" label="Save" onClick={save} /></React.Fragment>}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <Input label="Dashboard title" value={s.title} onChange={(e) => setS({ ...s, title: e.target.value })} />
          <Input label="Folder" value={s.folder} onChange={(e) => setS({ ...s, folder: e.target.value })} />
          <Input label="Running user" value={s.runningUser} onChange={(e) => setS({ ...s, runningUser: e.target.value })} />
          <div style={{ display: "flex", gap: "0.875rem" }}>
            <Select label="Columns" value={String(s.columns)} options={[9, 12].map((n) => ({ label: n + " columns", value: String(n) }))} onChange={(e) => setS({ ...s, columns: Number(e.target.value) })} />
            <Select label="Palette" value={s.palette} options={Object.keys(palettes).map((p) => ({ label: p, value: p }))} onChange={(e) => setS({ ...s, palette: e.target.value })} />
          </div>
          <Textarea label="Description" rows={2} value={s.description} onChange={(e) => setS({ ...s, description: e.target.value })} />
        </div>
      </Modal>
    );
  }

  function ExportModal({ state, onClose }) {
    const E = window.DBBExport;
    const [fmt, setFmt] = React.useState("xml");
    const [copied, setCopied] = React.useState(false);
    let code = "", filename = "dashboard.txt", lang = "";
    if (fmt === "xml") { code = E.dashboardXml(state); filename = `${(state.settings.title || "Dashboard").replace(/[^A-Za-z0-9]+/g, "_")}.dashboard-meta.xml`; lang = "XML"; }
    else if (fmt === "json") { code = E.json(state); filename = "dashboard.json"; lang = "JSON"; }
    else { code = E.mock(state); filename = "dashboard-outline.html"; lang = "HTML"; }

    const formats = [
      { id: "xml", label: "Dashboard Metadata", sub: ".dashboard-meta.xml", icon: "utility:page" },
      { id: "json", label: "Dashboard JSON", sub: "portable descriptor", icon: "utility:json" },
      { id: "mock", label: "Mockup", sub: "outline for designers", icon: "utility:image" },
    ];
    const notes = {
      xml: "Native Salesforce format — a Dashboard metadata file. Deploy it (Metadata API / SFDX) and it opens in Lightning Dashboards. Each widget carries its component type, source report, grouping, measure & grid span.",
      json: "A portable description of the dashboard: settings plus every widget with its type, Salesforce component type, grid size and properties. Good for your own code generators.",
      mock: "A lightweight outline for designers — every widget with its size and settings. For a pixel view, use Preview and screenshot.",
    };
    return (
      <Modal isOpen onClose={onClose} size="large" title="Export dashboard" tagline="Hand off to an admin or developer — pick a format."
        footer={<React.Fragment>
          <Button variant="neutral" label="Close" onClick={onClose} />
          <Button variant="neutral" iconName="utility:copy" label={copied ? "Copied!" : "Copy"} onClick={() => { copy(code); setCopied(true); setTimeout(() => setCopied(false), 1200); }} />
          <Button variant="brand" iconName="utility:download" label="Download file" onClick={() => download(filename, code)} />
        </React.Fragment>}>
        <div className="dbb-export">
          <div className="dbb-export-rail">
            {formats.map((f) => (
              <button key={f.id} className={`dbb-fmt ${fmt === f.id ? "on" : ""}`} onClick={() => setFmt(f.id)}>
                <Icon iconName={f.icon} size="small" />
                <div><div className="dbb-fmt-l">{f.label}</div><div className="dbb-fmt-s">{f.sub}</div></div>
              </button>
            ))}
          </div>
          <div className="dbb-export-main">
            <div className="dbb-export-note">{notes[fmt]}</div>
            <div className="dbb-code-h"><span className="dbb-lang">{lang}</span><code>{filename}</code></div>
            <pre className="dbb-code"><code>{code}</code></pre>
          </div>
        </div>
      </Modal>
    );
  }

  ReactDOM.createRoot(document.getElementById("app")).render(<App />);
})();
