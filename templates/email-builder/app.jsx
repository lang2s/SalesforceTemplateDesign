/* Email Template Builder — main app. Single-column email canvas with
   drag-to-reorder blocks, per-block property editor, merge-field syntax toggle,
   starter templates, settings & multi-format export. */
(function () {
  const DS = window.SalesforceSLDS2DesignSystem_2eee88;
  const { catalog, byType, defaultProps, templates, baseSettings, starter, tokens } = window.EMB;
  const { Icon, Button, ButtonGroup, ButtonMenu, Modal, Input, Select, Textarea, Toggle } = DS;
  const KEY = "emb-state-v1";

  let UID = 1; const uid = () => "e" + UID++;
  let DRAG = null;
  const SWATCHES = ["#0176D3", "#1B96FF", "#5867E8", "#06A59A", "#3BA755", "#FE9339", "#E16032", "#BA0517", "#16325c", "#4a5874", "#7f8baa", "#ffffff", "#f4f6f9", "#eef2f7"];

  function mkBlock(type) { return { id: uid(), type, props: defaultProps(type) }; }
  function seed() { return { settings: { ...baseSettings }, blocks: starter().map((b) => ({ id: uid(), type: b.type, props: { ...b.props } })) }; }
  function loadState() { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && Array.isArray(s.blocks) && s.settings) return s; } catch (e) {} return seed(); }
  function loadTemplate(key) { const t = templates[key]; return { settings: { ...t.settings }, blocks: t.blocks.map((b) => ({ id: uid(), type: b.type, props: { ...b.props } })) }; }

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

    React.useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)); }, [state]);
    const ctx = { settings: state.settings };

    function update(fn) { setState((s) => fn({ ...s, blocks: s.blocks.map((b) => ({ ...b })) })); }
    function addBlock(type, index) { update((s) => { const nb = mkBlock(type); s.blocks.splice(index == null ? s.blocks.length : index, 0, nb); return s; }); }
    function moveBlock(id, index) { update((s) => { const i = s.blocks.findIndex((b) => b.id === id); if (i < 0) return s; const [b] = s.blocks.splice(i, 1); let ti = index == null ? s.blocks.length : index; if (i < ti) ti -= 1; s.blocks.splice(ti, 0, b); return s; }); }
    function removeBlock(id) { update((s) => { s.blocks = s.blocks.filter((b) => b.id !== id); return s; }); setSel(null); }
    function duplicateBlock(id) { update((s) => { const i = s.blocks.findIndex((b) => b.id === id); if (i < 0) return s; const o = s.blocks[i]; s.blocks.splice(i + 1, 0, { ...o, id: uid(), props: { ...o.props } }); return s; }); }
    function nudge(id, dir) { update((s) => { const i = s.blocks.findIndex((b) => b.id === id); const j = i + dir; if (i < 0 || j < 0 || j >= s.blocks.length) return s; const t = s.blocks[i]; s.blocks[i] = s.blocks[j]; s.blocks[j] = t; return s; }); }
    function setProp(id, key, val) { update((s) => { s.blocks = s.blocks.map((b) => b.id === id ? { ...b, props: { ...b.props, [key]: val } } : b); return s; }); }
    function setSetting(key, val) { setState((s) => ({ ...s, settings: { ...s.settings, [key]: val } })); }

    function onDropAt(index, e) { e.preventDefault(); e.stopPropagation(); setOverIdx(null); const d = DRAG; DRAG = null; if (!d) return; if (d.kind === "new") addBlock(d.type, index); else if (d.kind === "move") moveBlock(d.id, index); }

    const selBlock = sel ? state.blocks.find((b) => b.id === sel) : null;
    const s = state.settings;

    return (
      <div className="emb">
        <header className="emb-bar">
          <div className="emb-brand">
            <img src="../../assets/salesforce-cloud.svg" alt="" style={{ height: 22 }} />
            <div style={{ minWidth: 0 }}>
              <strong>Email Builder</strong>
              <div className="emb-sub" title={s.subject}>{s.subject}</div>
            </div>
            <span className="emb-tag">Template</span>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <ButtonMenu label="Templates" iconName="utility:copy" items={Object.keys(templates).map((k) => ({ label: templates[k].label, iconName: templates[k].icon, onClick: () => { setState(loadTemplate(k)); setSel(null); } }))} />
            <div className="emb-merge" title="Merge-field syntax">
              <ButtonGroup value={s.mergeSyntax} onChange={(v) => setSetting("mergeSyntax", v)} items={[{ label: "{{ }}", value: "handlebars" }, { label: "{! }", value: "salesforce" }]} />
            </div>
            <Button variant="neutral" iconName="utility:settings" label="Settings" onClick={() => setSettingsOpen(true)} />
            <Button variant={preview ? "brand" : "neutral"} iconName="utility:preview" label={preview ? "Editing off" : "Preview"} onClick={() => { setPreview((p) => !p); setSel(null); }} />
            <Button variant="neutral" iconName="utility:refresh" title="Reset" onClick={() => { setState(seed()); setSel(null); }} />
            <Button variant="brand" iconName="utility:download" label="Export" onClick={() => setExp(true)} />
          </div>
        </header>

        <div className="emb-body">
          {!preview && (
            <aside className="emb-palette">
              <div className="emb-palette-h">Blocks</div>
              <p className="emb-hint">Drag into the email, or click to add. Select a block to edit its content &amp; style.</p>
              {groupOrder().map((g) => (
                <div key={g} className="emb-group">
                  <div className="emb-group-h">{g}</div>
                  {catalog.filter((c) => c.group === g).map((c) => (
                    <div key={c.type} className="emb-pitem" draggable
                      onDragStart={() => (DRAG = { kind: "new", type: c.type })} onDragEnd={() => (DRAG = null)}
                      onClick={() => addBlock(c.type)} title={c.desc + "  ·  click to add"}>
                      <span className="emb-pico"><Icon iconName={c.icon} size="small" /></span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="emb-pitem-l">{c.label}</div>
                        <div className="emb-pitem-d">{c.desc}</div>
                      </div>
                      <Icon iconName="utility:drag_and_drop" size="xx-small" />
                    </div>
                  ))}
                </div>
              ))}
            </aside>
          )}

          <main className="emb-canvas" style={{ background: s.pageBg }} onClick={() => setSel(null)}>
            <div className="emb-stage">
              <div className="emb-email" style={{ width: s.width, maxWidth: "100%", background: s.contentBg, fontFamily: s.fontFamily }} onClick={(e) => e.stopPropagation()}
                onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDropAt(null, e)}>
                {state.blocks.map((b, i) => <Block key={b.id} b={b} index={i} />)}
                {state.blocks.length === 0 && (
                  <div className="emb-blank" onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDropAt(0, e)}>
                    <Icon iconName="utility:add" size="small" /><span>Drag a block here to start your email</span>
                  </div>
                )}
              </div>
              {!preview && <div className="emb-widthtag">{s.width}px · {s.mergeSyntax === "salesforce" ? "{! } merge" : "{{ }} merge"}</div>}
            </div>
          </main>

          {!preview && (
            <aside className="emb-inspect">
              <div className="emb-palette-h">{selBlock ? "Properties" : "Email"}</div>
              {selBlock ? (
                <div className="emb-insp-body">
                  <div className="emb-insp-title"><Icon iconName={byType[selBlock.type].icon} size="small" /><strong>{byType[selBlock.type].label}</strong></div>
                  <p className="emb-insp-desc">{byType[selBlock.type].desc}</p>
                  {(byType[selBlock.type].props || []).length > 0 && (
                    <div className="emb-props">
                      {byType[selBlock.type].props.map((pr) => (
                        <PropEditor key={pr.k} pr={pr} value={selBlock.props[pr.k]} onChange={(v) => setProp(selBlock.id, pr.k, v)} />
                      ))}
                    </div>
                  )}
                  <div className="emb-insp-actions">
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Button variant="neutral" size="small" iconName="utility:up" label="Up" onClick={() => nudge(selBlock.id, -1)} />
                      <Button variant="neutral" size="small" iconName="utility:down" label="Down" onClick={() => nudge(selBlock.id, 1)} />
                      <Button variant="neutral" size="small" iconName="utility:copy" title="Duplicate" onClick={() => duplicateBlock(selBlock.id)} />
                    </div>
                    <Button variant="destructive" size="small" iconName="utility:delete" label="Remove" onClick={() => removeBlock(selBlock.id)} />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="emb-hint" style={{ padding: "0 0.875rem" }}>Select a block to edit it. These settings apply to the whole email and flow into the export.</p>
                  <div className="emb-pagecard">
                    <div className="emb-pagecard-h"><Icon iconName="utility:email" size="small" /><strong>Email settings</strong></div>
                    <dl className="emb-meta" style={{ margin: "0.5rem 0 0" }}>
                      <dt>Subject</dt><dd>{s.subject}</dd>
                      <dt>Width</dt><dd>{s.width}px</dd>
                      <dt>Merge</dt><dd>{s.mergeSyntax === "salesforce" ? "{!Object.Field}" : "{{Object.Field}}"}</dd>
                      <dt>Blocks</dt><dd>{state.blocks.length}</dd>
                    </dl>
                    <Button variant="neutral" size="small" iconName="utility:settings" label="Email settings" onClick={() => setSettingsOpen(true)} style={{ marginTop: "0.625rem", width: "100%" }} />
                  </div>
                  <div className="emb-group-h" style={{ padding: "0.75rem 0.875rem 0.25rem" }}>Merge fields</div>
                  <p className="emb-hint">Type any of these into a text block — they render as chips and export in your chosen syntax.</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, padding: "0 0.875rem 0.5rem" }}>
                    {tokens.slice(0, 8).map((t) => <span key={t} className="emb-chip" onClick={() => copy(s.mergeSyntax === "salesforce" ? "{!" + t + "}" : "{{" + t + "}}")} title="Copy">{t}</span>)}
                  </div>
                </div>
              )}
              <div className="emb-insp-foot"><Icon iconName="utility:info" size="xx-small" /><span>Blocks render with inline styles, so the canvas matches the exported HTML email.</span></div>
            </aside>
          )}
        </div>

        {exp && <ExportModal state={state} onClose={() => setExp(false)} />}
        {settingsOpen && <SettingsModal state={state} setState={setState} onClose={() => setSettingsOpen(false)} />}
      </div>
    );

    function Block({ b, index }) {
      const selected = sel === b.id;
      return (
        <div className={`emb-block ${selected ? "sel" : ""} ${preview ? "preview" : ""}`} draggable={!preview}
          onDragStart={(e) => { if (preview) return; DRAG = { kind: "move", id: b.id }; e.stopPropagation(); }} onDragEnd={() => (DRAG = null)}
          onDragOver={(e) => { if (!preview) { e.preventDefault(); setOverIdx(index); } }}
          onDragLeave={(e) => { if (e.currentTarget === e.target) setOverIdx((o) => (o === index ? null : o)); }}
          onDrop={(e) => { if (!preview) onDropAt(index, e); }}
          onClick={(e) => { if (!preview) { e.stopPropagation(); setSel(b.id); } }}>
          {overIdx === index && !preview && <div className="emb-insline" />}
          {!preview && (
            <div className="emb-wbar">
              <span className="emb-grip"><Icon iconName="utility:drag_and_drop" size="xx-small" /></span>
              <span className="emb-wname">{byType[b.type].label}</span>
              <button className="emb-ic" title="Up" onClick={(e) => { e.stopPropagation(); nudge(b.id, -1); }}>▲</button>
              <button className="emb-ic" title="Down" onClick={(e) => { e.stopPropagation(); nudge(b.id, 1); }}>▼</button>
              <button className="emb-ic" title="Duplicate" onClick={(e) => { e.stopPropagation(); duplicateBlock(b.id); }}>⎘</button>
              <button className="emb-ic del" title="Remove" onClick={(e) => { e.stopPropagation(); removeBlock(b.id); }}>✕</button>
            </div>
          )}
          <div className="emb-block-body">{window.EMBRender(b.type, b.props, ctx)}</div>
        </div>
      );
    }
  }

  function PropEditor({ pr, value, onChange }) {
    if (pr.t === "toggle") return <div style={{ marginBottom: "0.625rem" }}><Toggle label={pr.l} checked={!!value} onChange={(e) => onChange(e && e.target ? e.target.checked : !value)} /></div>;
    if (pr.t === "select") return <div style={{ marginBottom: "0.625rem" }}><Select label={pr.l} value={value} options={pr.o.map((o) => ({ label: o, value: o }))} onChange={(e) => onChange(e.target.value)} /></div>;
    if (pr.t === "textarea") return <div style={{ marginBottom: "0.625rem" }}><Textarea label={pr.l} value={value} rows={3} onChange={(e) => onChange(e.target.value)} /></div>;
    if (pr.t === "number") return <div style={{ marginBottom: "0.625rem" }}><Input label={pr.l} type="number" value={value} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} /></div>;
    if (pr.t === "color") return <ColorEditor pr={pr} value={value} onChange={onChange} />;
    return <div style={{ marginBottom: "0.625rem" }}><Input label={pr.l} value={value} onChange={(e) => onChange(e.target.value)} /></div>;
  }

  function ColorEditor({ pr, value, onChange }) {
    return (
      <div style={{ marginBottom: "0.75rem" }}>
        <div className="emb-lbl">{pr.l}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <label style={{ position: "relative", width: 26, height: 26, borderRadius: 5, border: "1px solid var(--slds-g-color-border-2)", background: value, cursor: "pointer", flex: "none", overflow: "hidden" }}>
            <input type="color" value={/^#([0-9a-f]{6})$/i.test(value) ? value : "#ffffff"} onChange={(e) => onChange(e.target.value)} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }} />
          </label>
          <input className="emb-hex" value={value} onChange={(e) => onChange(e.target.value)} />
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {SWATCHES.map((c) => <button key={c} title={c} onClick={() => onChange(c)} style={{ width: 16, height: 16, borderRadius: 4, border: value && value.toLowerCase() === c.toLowerCase() ? "2px solid var(--slds-g-color-accent-1)" : "1px solid rgba(0,0,0,.12)", background: c, cursor: "pointer", padding: 0 }} />)}
          </div>
        </div>
      </div>
    );
  }

  function SettingsModal({ state, setState, onClose }) {
    const [s, setS] = React.useState(state.settings);
    const save = () => { setState((st) => ({ ...st, settings: s })); onClose(); };
    const set = (k, v) => setS((o) => ({ ...o, [k]: v }));
    const fonts = ["Arial, Helvetica, sans-serif", "Georgia, 'Times New Roman', serif", "'Helvetica Neue', Helvetica, Arial, sans-serif", "Tahoma, Verdana, sans-serif", "'Trebuchet MS', sans-serif"];
    return (
      <Modal isOpen onClose={onClose} size="small" title="Email settings" tagline="Subject, preheader, brand colors, type & merge syntax."
        footer={<React.Fragment><Button variant="neutral" label="Cancel" onClick={onClose} /><Button variant="brand" label="Save" onClick={save} /></React.Fragment>}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <Input label="Subject line" value={s.subject} onChange={(e) => set("subject", e.target.value)} />
          <Input label="Preheader (preview text)" value={s.preheader} onChange={(e) => set("preheader", e.target.value)} />
          <div style={{ display: "flex", gap: "0.875rem" }}>
            <Select label="Body font" value={s.fontFamily} options={fonts.map((f) => ({ label: f.split(",")[0].replace(/'/g, ""), value: f }))} onChange={(e) => set("fontFamily", e.target.value)} />
            <Select label="Width" value={String(s.width)} options={[600, 640, 480].map((n) => ({ label: n + "px", value: String(n) }))} onChange={(e) => set("width", Number(e.target.value))} />
          </div>
          <Select label="Merge-field syntax" value={s.mergeSyntax} options={[{ label: "Handlebars  {{Object.Field}}", value: "handlebars" }, { label: "Salesforce  {!Object.Field}", value: "salesforce" }]} onChange={(e) => set("mergeSyntax", e.target.value)} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
            {[["brandColor", "Brand"], ["pageBg", "Page bg"], ["contentBg", "Content bg"], ["textColor", "Heading text"]].map(([k, l]) => (
              <div key={k}><div className="emb-lbl">{l}</div><label style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 26, height: 26, borderRadius: 5, border: "1px solid var(--slds-g-color-border-2)", background: s[k], position: "relative", overflow: "hidden", flex: "none" }}><input type="color" value={/^#([0-9a-f]{6})$/i.test(s[k]) ? s[k] : "#ffffff"} onChange={(e) => set(k, e.target.value)} style={{ position: "absolute", inset: 0, opacity: 0 }} /></span><input className="emb-hex" value={s[k]} onChange={(e) => set(k, e.target.value)} /></label></div>
            ))}
          </div>
        </div>
      </Modal>
    );
  }

  function ExportModal({ state, onClose }) {
    const E = window.EMBExport;
    const [fmt, setFmt] = React.useState("html");
    const [copied, setCopied] = React.useState(false);
    let code = "", filename = "email.html", lang = "HTML";
    if (fmt === "html") { code = E.html(state); filename = "email.html"; lang = "HTML"; }
    else if (fmt === "lightning") { code = E.lightning(state); filename = "EmailTemplate.html"; lang = "HTML"; }
    else { code = E.json(state); filename = "email.json"; lang = "JSON"; }

    const formats = [
      { id: "html", label: "Inline HTML Email", sub: "table-based, universal", icon: "utility:email" },
      { id: "lightning", label: "Lightning Email Template", sub: "EmailTemplate body", icon: "utility:salesforce1" },
      { id: "json", label: "Email JSON", sub: "portable descriptor", icon: "utility:json" },
    ];
    const notes = {
      html: "A complete, table-based HTML email with all styles inlined — pastes into any ESP or Salesforce HTML email. The preheader is hidden for inbox preview text; merge fields use your chosen syntax.",
      lightning: "The HTML body for a Salesforce Lightning Email Template. Paste into the Email Template Builder's HTML/source view, or set it as an EmailTemplate body. Merge fields use your chosen syntax; set relatedEntityType for record-based templates.",
      json: "A portable description of the email: settings plus every block with its properties. Good for your own code generators or storing the design.",
    };
    return (
      <Modal isOpen onClose={onClose} size="large" title="Export email" tagline="Hand off to marketing or a developer — pick a format."
        footer={<React.Fragment>
          <Button variant="neutral" label="Close" onClick={onClose} />
          <Button variant="neutral" iconName="utility:copy" label={copied ? "Copied!" : "Copy"} onClick={() => { copy(code); setCopied(true); setTimeout(() => setCopied(false), 1200); }} />
          <Button variant="brand" iconName="utility:download" label="Download file" onClick={() => download(filename, code)} />
        </React.Fragment>}>
        <div className="emb-export">
          <div className="emb-export-rail">
            {formats.map((f) => (
              <button key={f.id} className={`emb-fmt ${fmt === f.id ? "on" : ""}`} onClick={() => setFmt(f.id)}>
                <Icon iconName={f.icon} size="small" />
                <div><div className="emb-fmt-l">{f.label}</div><div className="emb-fmt-s">{f.sub}</div></div>
              </button>
            ))}
          </div>
          <div className="emb-export-main">
            <div className="emb-export-note">{notes[fmt]}</div>
            <div className="emb-code-h"><span className="emb-lang">{lang}</span><code>{filename}</code></div>
            <pre className="emb-code"><code>{code}</code></pre>
          </div>
        </div>
      </Modal>
    );
  }

  ReactDOM.createRoot(document.getElementById("app")).render(<App />);
})();
