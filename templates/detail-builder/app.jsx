/* LWC Detail Screen Builder — main app. Compose a record detail screen from the
   full component set; edit each component's variants; nest components into
   Section / Card / Modal containers; open the live Modal; export LWC + JSON. */
(function () {
  const DS = window.SalesforceSLDS2DesignSystem_2eee88;
  const { catalog, byType, isContainer, defaultProps, leafCatalog, groupOrder, mk, baseSettings, starter } = window.DSB;
  const { Icon, Button, ButtonMenu, Modal, Input, Select, Textarea, Toggle } = DS;
  const KEY = "dsb-state-v1";
  let UID = 100; const uid = () => "u" + UID++;
  let DRAG = null;
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const JUSTIFY = { left: "flex-start", center: "center", right: "flex-end" };
  function J_STYLE(block) { const a = block.props && block.props._align; return a && a !== "left" ? { display: "flex", justifyContent: JUSTIFY[a] || "flex-start" } : undefined; }

  function AlignControl({ value, onChange }) {
    const opts = [["left", "utility:left_align_text", "Left"], ["center", "utility:center_align_text", "Center"], ["right", "utility:right_align_text", "Right"]];
    return (
      <div className="dsb-align">
        <span className="dsb-align-l">Alignment</span>
        <div className="dsb-align-seg">
          {opts.map(([v, ic, t]) => (
            <button key={v} type="button" title={t} className={value === v ? "on" : ""} onClick={() => onChange(v)}><Icon iconName={ic} size="x-small" variant={value === v ? "inverse" : "default"} /></button>
          ))}
        </div>
      </div>
    );
  }

  function seed() { return { settings: { ...baseSettings }, blocks: starter() }; }
  function loadState() { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && Array.isArray(s.blocks) && s.settings) return s; } catch (e) {} return seed(); }
  function newBlock(type) { const b = { id: uid(), type, props: defaultProps(type) }; if (isContainer(type)) b.children = []; return b; }

  // tree helpers — find a block (and its sibling array) anywhere in the tree
  function locate(blocks, id) {
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].id === id) return { arr: blocks, i, block: blocks[i] };
      if (blocks[i].children) { const r = locate(blocks[i].children, id); if (r) return r; }
    }
    return null;
  }
  function download(filename, text) { const b = new Blob([text], { type: "text/plain;charset=utf-8" }); const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = filename; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); }
  const copy = (t) => navigator.clipboard && navigator.clipboard.writeText(t).catch(() => {});

  function App() {
    const [state, setState] = React.useState(loadState);
    const [sel, setSel] = React.useState(null);
    const [preview, setPreview] = React.useState(false);
    const [overIdx, setOverIdx] = React.useState(null);
    const [exp, setExp] = React.useState(false);
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [addTo, setAddTo] = React.useState(null);   // container id awaiting a child
    const [openModalId, setOpenModalId] = React.useState(null);

    React.useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)); }, [state]);

    function mutate(fn) { setState((s) => { const n = clone(s); fn(n); return n; }); }
    function addTop(type, index) { mutate((s) => { const b = newBlock(type); if (type === "section") b.props.columns = String(s.settings.columns || 2); s.blocks.splice(index == null ? s.blocks.length : index, 0, b); }); }
    function moveTop(id, index) { mutate((s) => { const r = locate(s.blocks, id); if (!r || r.arr !== s.blocks) return; const [b] = s.blocks.splice(r.i, 1); let t = index == null ? s.blocks.length : index; if (r.i < t) t -= 1; s.blocks.splice(t, 0, b); }); }
    function addChild(parentId, type) { mutate((s) => { const r = locate(s.blocks, parentId); if (!r) return; r.block.children = r.block.children || []; r.block.children.push({ id: uid(), type, props: defaultProps(type) }); }); }
    function remove(id) { mutate((s) => { const r = locate(s.blocks, id); if (r) r.arr.splice(r.i, 1); }); setSel((x) => (x === id ? null : x)); }
    function duplicate(id) { mutate((s) => { const r = locate(s.blocks, id); if (!r) return; const c = clone(r.block); const reid = (b) => { b.id = uid(); (b.children || []).forEach(reid); }; reid(c); r.arr.splice(r.i + 1, 0, c); }); }
    function nudge(id, dir) { mutate((s) => { const r = locate(s.blocks, id); if (!r) return; const j = r.i + dir; if (j < 0 || j >= r.arr.length) return; const t = r.arr[r.i]; r.arr[r.i] = r.arr[j]; r.arr[j] = t; }); }
    function setProp(id, key, val) { mutate((s) => { const r = locate(s.blocks, id); if (r) r.block.props[key] = val; }); }
    function setSetting(key, val) { setState((s) => ({ ...s, settings: { ...s.settings, [key]: val } })); }
    function addHeaderAction() { setState((s) => ({ ...s, settings: { ...s.settings, headerActions: [...(s.settings.headerActions || []), { id: uid(), label: "Action", variant: "neutral", iconName: "" }] } })); }
    function setHeaderAction(id, key, val) { setState((s) => ({ ...s, settings: { ...s.settings, headerActions: (s.settings.headerActions || []).map((a) => a.id === id ? { ...a, [key]: val } : a) } })); }
    function removeHeaderAction(id) { setState((s) => ({ ...s, settings: { ...s.settings, headerActions: (s.settings.headerActions || []).filter((a) => a.id !== id) } })); }
    function moveHeaderAction(id, dir) { setState((s) => { const arr = [...(s.settings.headerActions || [])]; const i = arr.findIndex((a) => a.id === id); const j = i + dir; if (i < 0 || j < 0 || j >= arr.length) return s; const t = arr[i]; arr[i] = arr[j]; arr[j] = t; return { ...s, settings: { ...s.settings, headerActions: arr } }; }); }

    function onDrop(index, e) { e.preventDefault(); e.stopPropagation(); setOverIdx(null); const d = DRAG; DRAG = null; if (!d) return; if (d.kind === "new") addTop(d.type, index); else if (d.kind === "move") moveTop(d.id, index); }

    const selBlock = sel ? (locate(state.blocks, sel) || {}).block : null;
    const ctx = { preview, openModal: (id) => setOpenModalId(id), renderChild: (c) => <Child key={c.id} block={c} /> };
    const openModalBlock = openModalId ? (locate(state.blocks, openModalId) || {}).block : null;

    return (
      <div className="dsb">
        <header className="dsb-bar">
          <div className="dsb-brand">
            <img src="../../assets/salesforce-cloud.svg" alt="" style={{ height: 22 }} />
            <div style={{ minWidth: 0 }}>
              <strong>Detail Screen Builder</strong>
              <div className="dsb-sub">{state.settings.title} · {state.settings.object}</div>
            </div>
            <span className="dsb-tag">LWC</span>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <Button variant="neutral" iconName="utility:settings" label="Screen settings" onClick={() => setSettingsOpen(true)} />
            <Button variant={preview ? "brand" : "neutral"} iconName="utility:preview" label={preview ? "Editing off" : "Preview"} onClick={() => { setPreview((p) => !p); setSel(null); }} />
            <Button variant="neutral" iconName="utility:refresh" title="Reset" onClick={() => { setState(seed()); setSel(null); }} />
            <Button variant="brand" iconName="utility:download" label="Export" onClick={() => setExp(true)} />
          </div>
        </header>

        <div className="dsb-body">
          {!preview && (
            <aside className="dsb-palette">
              <div className="dsb-palette-h">Components</div>
              <p className="dsb-hint">Drag onto the screen, or click to add. Select any component to edit its variants. Sections, Cards &amp; Modals hold nested components.</p>
              {groupOrder().map((g) => (
                <div key={g} className="dsb-group">
                  <div className="dsb-group-h">{g}</div>
                  {catalog.filter((c) => c.group === g).map((c) => (
                    <div key={c.type} className="dsb-pitem" draggable
                      onDragStart={() => (DRAG = { kind: "new", type: c.type })} onDragEnd={() => (DRAG = null)}
                      onClick={() => addTop(c.type)} title={c.desc + "  ·  click to add"}>
                      <span className="dsb-pico"><Icon iconName={c.icon} size="small" /></span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="dsb-pitem-l">{c.label}{c.container ? " ▸" : ""}</div>
                        <div className="dsb-pitem-d">{c.desc}</div>
                      </div>
                      <Icon iconName="utility:drag_and_drop" size="xx-small" />
                    </div>
                  ))}
                </div>
              ))}
            </aside>
          )}

          <main className="dsb-canvas" onClick={() => setSel(null)}>
            <div className="dsb-sheet" onClick={(e) => e.stopPropagation()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(null, e)}>
              <div className={`dsb-rec-head ${sel === "__header__" ? "sel" : ""} ${preview ? "preview" : ""}`} onClick={(e) => { if (!preview) { e.stopPropagation(); setSel("__header__"); } }}>
                <Icon iconName="standard:contact" size="medium" />
                <div style={{ flex: 1, minWidth: 0 }}><div className="dsb-rec-obj">{state.settings.object}</div><div className="dsb-rec-name">{state.settings.title}</div></div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {(state.settings.headerActions || []).map((a) => <Button key={a.id} variant={a.variant} iconName={a.iconName || undefined} label={a.label} />)}
                </div>
              </div>
              {state.blocks.map((b, i) => <Placed key={b.id} block={b} index={i} />)}
              {state.blocks.length === 0 && <div className="dsb-blank" onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(0, e)}><Icon iconName="utility:add" size="small" /><span>Drag a component here to start</span></div>}
            </div>
          </main>

          {!preview && (
            <aside className="dsb-inspect">
              <div className="dsb-palette-h">{sel === "__header__" ? "Header" : selBlock ? "Properties" : "Screen"}</div>
              {sel === "__header__" ? (
                <div className="dsb-insp-body">
                  <div className="dsb-insp-title"><Icon iconName="standard:contact" size="small" /><strong>Header actions</strong></div>
                  <p className="dsb-insp-desc">Buttons shown in the record header (like the highlights-panel actions). They export into the card&rsquo;s <code>actions</code> slot.</p>
                  <Button variant="brand" iconName="utility:add" label="Add action" onClick={addHeaderAction} style={{ width: "100%" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginTop: "0.75rem" }}>
                    {(state.settings.headerActions || []).map((a) => (
                      <div key={a.id} className="dsb-props">
                        <div className="dsb-actrow" style={{ display: "flex", justifyContent: "flex-end", gap: 3, marginBottom: 6 }}>
                          <button className="dsb-ic" title="Up" onClick={() => moveHeaderAction(a.id, -1)}>▲</button>
                          <button className="dsb-ic" title="Down" onClick={() => moveHeaderAction(a.id, 1)}>▼</button>
                          <button className="dsb-ic del" title="Remove" onClick={() => removeHeaderAction(a.id)}>✕</button>
                        </div>
                        <div style={{ marginBottom: "0.5rem" }}><Input label="Label" value={a.label} onChange={(e) => setHeaderAction(a.id, "label", e.target.value)} /></div>
                        <div style={{ marginBottom: "0.5rem" }}><Select label="Variant" value={a.variant} options={["neutral", "brand", "outline-brand", "destructive", "success", "text"].map((o) => ({ label: o, value: o }))} onChange={(e) => setHeaderAction(a.id, "variant", e.target.value)} /></div>
                        <Input label="Icon (e.g. utility:edit)" value={a.iconName} placeholder="utility:…" onChange={(e) => setHeaderAction(a.id, "iconName", e.target.value)} />
                      </div>
                    ))}
                    {(!state.settings.headerActions || !state.settings.headerActions.length) && <p className="dsb-hint" style={{ margin: 0 }}>No header actions yet — add one above.</p>}
                  </div>
                </div>
              ) : selBlock ? (
                <div className="dsb-insp-body">
                  <div className="dsb-insp-title"><Icon iconName={byType[selBlock.type].icon} size="small" /><strong>{byType[selBlock.type].label}</strong></div>
                  <p className="dsb-insp-desc">{byType[selBlock.type].desc}</p>
                  {!isContainer(selBlock.type) && <AlignControl value={selBlock.props._align || "left"} onChange={(v) => setProp(selBlock.id, "_align", v)} />}
                  {(byType[selBlock.type].props || []).length > 0 && (
                    <div className="dsb-props">
                      {byType[selBlock.type].props.map((pr) => <PropEditor key={pr.k} pr={pr} value={selBlock.props[pr.k]} onChange={(v) => setProp(selBlock.id, pr.k, v)} />)}
                    </div>
                  )}
                  {isContainer(selBlock.type) && (
                    <div className="dsb-body-sec">
                      <div className="dsb-body-h"><span>{selBlock.type === "modal" ? "Modal body" : "Contents"}</span><span className="dsb-count">{(selBlock.children || []).length}</span></div>
                      <Button variant="brand" iconName="utility:add" label="Add component" onClick={() => setAddTo(selBlock.id)} style={{ width: "100%" }} />
                      {(selBlock.children || []).length > 0 && (
                        <div className="dsb-body-list">
                          {selBlock.children.map((c) => (
                            <div key={c.id} className={`dsb-body-item ${sel === c.id ? "on" : ""}`} onClick={() => setSel(c.id)}>
                              <Icon iconName={byType[c.type].icon} size="x-small" />
                              <span className="dsb-body-item-l">{c.props.label || c.props.title || byType[c.type].label}</span>
                              <button className="dsb-ic" title="Up" onClick={(e) => { e.stopPropagation(); nudge(c.id, -1); }}>▲</button>
                              <button className="dsb-ic" title="Down" onClick={(e) => { e.stopPropagation(); nudge(c.id, 1); }}>▼</button>
                              <button className="dsb-ic del" title="Remove" onClick={(e) => { e.stopPropagation(); remove(c.id); }}>✕</button>
                            </div>
                          ))}
                        </div>
                      )}
                      {selBlock.type === "modal" && <Button variant="neutral" size="small" iconName="utility:expand" label="Open modal preview" onClick={() => setOpenModalId(selBlock.id)} style={{ width: "100%", marginTop: "0.5rem" }} />}
                    </div>
                  )}
                  <dl className="dsb-meta"><dt>LWC</dt><dd><code>{byType[selBlock.type].lwc}</code></dd></dl>
                  <div className="dsb-insp-actions">
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Button variant="neutral" size="small" iconName="utility:up" label="Up" onClick={() => nudge(selBlock.id, -1)} />
                      <Button variant="neutral" size="small" iconName="utility:down" label="Down" onClick={() => nudge(selBlock.id, 1)} />
                      <Button variant="neutral" size="small" iconName="utility:copy" title="Duplicate" onClick={() => duplicate(selBlock.id)} />
                    </div>
                    <Button variant="destructive" size="small" iconName="utility:delete" label="Remove" onClick={() => remove(selBlock.id)} />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="dsb-hint" style={{ padding: "0 0.875rem" }}>Select a component to edit its variants. These settings apply to the whole screen &amp; flow into the export.</p>
                  <div className="dsb-pagecard">
                    <div className="dsb-pagecard-h"><Icon iconName="standard:contact" size="small" /><strong>{state.settings.title}</strong></div>
                    <dl className="dsb-meta" style={{ margin: "0.5rem 0 0" }}><dt>Object</dt><dd>{state.settings.object}</dd><dt>Component</dt><dd><code>{state.settings.componentName}</code></dd><dt>Blocks</dt><dd>{state.blocks.length}</dd></dl>
                    <Button variant="neutral" size="small" iconName="utility:settings" label="Screen settings" onClick={() => setSettingsOpen(true)} style={{ marginTop: "0.625rem", width: "100%" }} />
                  </div>
                </div>
              )}
              <div className="dsb-insp-foot"><Icon iconName="utility:info" size="xx-small" /><span>Each component renders with its real SLDS variants, so the canvas matches the exported LWC.</span></div>
            </aside>
          )}
        </div>

        {openModalBlock && (
          <Modal isOpen onClose={() => setOpenModalId(null)} size={openModalBlock.props.size} title={openModalBlock.props.title} tagline={openModalBlock.props.tagline}
            footer={<React.Fragment><Button variant="neutral" label={openModalBlock.props.footerCancel} onClick={() => setOpenModalId(null)} /><Button variant="brand" label={openModalBlock.props.footerSave} onClick={() => setOpenModalId(null)} /></React.Fragment>}>
            {window.DSBRender.modalBody(openModalBlock, openModalBlock.props.columns)}
          </Modal>
        )}
        {addTo && <AddComponentModal onClose={() => setAddTo(null)} onAdd={(type) => addChild(addTo, type)} />}
        {exp && <ExportModal state={state} onClose={() => setExp(false)} />}
        {settingsOpen && <SettingsModal state={state} setState={setState} onClose={() => setSettingsOpen(false)} />}
      </div>
    );

    function Placed({ block, index }) {
      const selected = sel === block.id;
      return (
        <div className={`dsb-block ${selected ? "sel" : ""} ${preview ? "preview" : ""}`} draggable={!preview}
          onDragStart={(e) => { if (preview) return; DRAG = { kind: "move", id: block.id }; e.stopPropagation(); }} onDragEnd={() => (DRAG = null)}
          onDragOver={(e) => { if (!preview) { e.preventDefault(); setOverIdx(index); } }}
          onDragLeave={(e) => { if (e.currentTarget === e.target) setOverIdx((o) => (o === index ? null : o)); }}
          onDrop={(e) => { if (!preview) onDrop(index, e); }}
          onClick={(e) => { if (!preview) { e.stopPropagation(); setSel(block.id); } }}>
          {overIdx === index && !preview && <div className="dsb-insline" />}
          {!preview && (
            <div className="dsb-wbar">
              <span className="dsb-grip"><Icon iconName="utility:drag_and_drop" size="xx-small" /></span>
              <span className="dsb-wname">{byType[block.type].label}</span>
              <button className="dsb-ic" title="Up" onClick={(e) => { e.stopPropagation(); nudge(block.id, -1); }}>▲</button>
              <button className="dsb-ic" title="Down" onClick={(e) => { e.stopPropagation(); nudge(block.id, 1); }}>▼</button>
              <button className="dsb-ic" title="Duplicate" onClick={(e) => { e.stopPropagation(); duplicate(block.id); }}>⎘</button>
              <button className="dsb-ic del" title="Remove" onClick={(e) => { e.stopPropagation(); remove(block.id); }}>✕</button>
            </div>
          )}
          <div className="dsb-block-body" style={J_STYLE(block)}>{window.DSBRender(block, ctx)}</div>
        </div>
      );
    }

    function Child({ block }) {
      const selected = sel === block.id;
      return (
        <div className={`dsb-child ${selected ? "sel" : ""} ${preview ? "preview" : ""}`} onClick={(e) => { if (!preview) { e.stopPropagation(); setSel(block.id); } }}>
          {!preview && selected && (
            <div className="dsb-cbar">
              <button className="dsb-ic" title="Up" onClick={(e) => { e.stopPropagation(); nudge(block.id, -1); }}>▲</button>
              <button className="dsb-ic" title="Down" onClick={(e) => { e.stopPropagation(); nudge(block.id, 1); }}>▼</button>
              <button className="dsb-ic del" title="Remove" onClick={(e) => { e.stopPropagation(); remove(block.id); }}>✕</button>
            </div>
          )}
          <div style={J_STYLE(block)}>{window.DSBRender.leaf(block)}</div>
        </div>
      );
    }
  }

  function PropEditor({ pr, value, onChange }) {
    if (pr.t === "toggle") return <div style={{ marginBottom: "0.625rem" }}><Toggle label={pr.l} checked={!!value} onChange={(e) => onChange(e && e.target ? e.target.checked : !value)} /></div>;
    if (pr.t === "select") return <div style={{ marginBottom: "0.625rem" }}><Select label={pr.l} value={value} options={pr.o.map((o) => ({ label: o, value: o }))} onChange={(e) => onChange(e.target.value)} /></div>;
    if (pr.t === "textarea" || pr.t === "options") return <div style={{ marginBottom: "0.625rem" }}><Textarea label={pr.l + (pr.t === "options" ? "" : "")} value={value} rows={pr.t === "options" ? 2 : 3} onChange={(e) => onChange(e.target.value)} /></div>;
    if (pr.t === "number") return <div style={{ marginBottom: "0.625rem" }}><Input label={pr.l} type="number" value={value} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} /></div>;
    if (pr.t === "icon") return <div style={{ marginBottom: "0.625rem" }}><Input label={pr.l + " (e.g. utility:email)"} value={value} placeholder="utility:…" onChange={(e) => onChange(e.target.value)} /></div>;
    return <div style={{ marginBottom: "0.625rem" }}><Input label={pr.l} value={value} onChange={(e) => onChange(e.target.value)} /></div>;
  }

  function AddComponentModal({ onClose, onAdd }) {
    const [q, setQ] = React.useState("");
    const ql = q.trim().toLowerCase();
    const grps = groupOrder().map((g) => ({ title: g, items: leafCatalog.filter((c) => c.group === g && (!ql || c.label.toLowerCase().includes(ql) || c.type.includes(ql))) })).filter((g) => g.items.length);
    const total = grps.reduce((n, g) => n + g.items.length, 0);
    return (
      <Modal isOpen onClose={onClose} size="medium" title="Add component" tagline="Pick a component to add to this container's body."
        footer={<Button variant="brand" label="Done" onClick={onClose} />}>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${leafCatalog.length} components…`} iconName="utility:search" />
        <div className="dsb-addscroll">
          {grps.map((g) => (
            <div key={g.title} className="dsb-addgroup">
              <div className="dsb-addgroup-h">{g.title}</div>
              <div className="dsb-addgrid">
                {g.items.map((c) => (
                  <button key={c.type} className="dsb-addcard" onClick={() => onAdd(c.type)}>
                    <Icon iconName={c.icon} size="small" />
                    <div style={{ flex: 1, minWidth: 0 }}><div className="dsb-addcard-l">{c.label}</div><div className="dsb-addcard-c">{c.desc}</div></div>
                    <Icon iconName="utility:add" size="xx-small" variant="brand" />
                  </button>
                ))}
              </div>
            </div>
          ))}
          {total === 0 && <div className="dsb-hint" style={{ textAlign: "center", padding: "1.5rem 0" }}>No components match “{q}”.</div>}
        </div>
      </Modal>
    );
  }

  function SettingsModal({ state, setState, onClose }) {
    const [s, setS] = React.useState(state.settings);
    const save = () => {
      setState((st) => {
        const cols = String(s.columns || 2);
        const apply = (arr) => arr.map((b) => b.type === "section" ? { ...b, props: { ...b.props, columns: cols } } : b);
        return { ...st, settings: s, blocks: apply(st.blocks) };
      });
      onClose();
    };
    const set = (k, v) => setS((o) => ({ ...o, [k]: v }));
    return (
      <Modal isOpen onClose={onClose} size="small" title="Screen settings" tagline="These map to the LWC master label, component name & target object."
        footer={<React.Fragment><Button variant="neutral" label="Cancel" onClick={onClose} /><Button variant="brand" label="Save" onClick={save} /></React.Fragment>}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <Input label="Screen title" value={s.title} onChange={(e) => set("title", e.target.value)} />
          <Input label="Object API name" value={s.object} onChange={(e) => set("object", e.target.value)} />
          <Input label="Component name (LWC)" value={s.componentName} onChange={(e) => set("componentName", e.target.value.replace(/[^A-Za-z0-9]/g, ""))} />
          <Select label="Default layout (columns for new sections)" value={String(s.columns || 2)} options={[{ label: "1 column", value: "1" }, { label: "2 columns", value: "2" }]} onChange={(e) => set("columns", Number(e.target.value))} />
        </div>
      </Modal>
    );
  }

  function ExportModal({ state, onClose }) {
    const E = window.DSBExport;
    const [fmt, setFmt] = React.useState("lwc");
    const [lwcFile, setLwcFile] = React.useState("html");
    const [copied, setCopied] = React.useState(false);
    const out = E.lwc(state);
    let code = "", filename = "", lang = "";
    if (fmt === "json") { code = E.json(state); filename = "detail-screen.json"; lang = "JSON"; }
    else { if (lwcFile === "html") { code = out.html; filename = out.htmlName; lang = "HTML"; } else if (lwcFile === "js") { code = out.js; filename = out.jsName; lang = "JS"; } else { code = out.meta; filename = out.metaName; lang = "XML"; } }
    const formats = [{ id: "lwc", label: "Lightning (LWC)", sub: ".html / .js / meta", icon: "utility:apex" }, { id: "json", label: "Screen JSON", sub: "portable descriptor", icon: "utility:json" }];
    const notes = { lwc: "A Lightning Web Component scaffold for this detail screen. Each field maps to its lightning base component with the chosen variants; Sections become layout grids, Cards become lightning-card, and Modals are wired to open a LightningModal. Options become getters in the .js.", json: "A portable description of the screen: settings plus every block (and nested children) with its component type and properties." };
    return (
      <Modal isOpen onClose={onClose} size="large" title="Export detail screen" tagline="Hand off to a developer — pick a format."
        footer={<React.Fragment><Button variant="neutral" label="Close" onClick={onClose} /><Button variant="neutral" iconName="utility:copy" label={copied ? "Copied!" : "Copy"} onClick={() => { copy(code); setCopied(true); setTimeout(() => setCopied(false), 1200); }} /><Button variant="brand" iconName="utility:download" label="Download file" onClick={() => download(filename, code)} /></React.Fragment>}>
        <div className="dsb-export">
          <div className="dsb-export-rail">
            {formats.map((f) => <button key={f.id} className={`dsb-fmt ${fmt === f.id ? "on" : ""}`} onClick={() => setFmt(f.id)}><Icon iconName={f.icon} size="small" /><div><div className="dsb-fmt-l">{f.label}</div><div className="dsb-fmt-s">{f.sub}</div></div></button>)}
          </div>
          <div className="dsb-export-main">
            <div className="dsb-export-note">{notes[fmt]}</div>
            {fmt === "lwc" && <div className="dsb-lwc-tabs">{[["html", out.htmlName], ["js", out.jsName], ["meta", out.metaName]].map(([k, nm]) => <button key={k} className={lwcFile === k ? "on" : ""} onClick={() => setLwcFile(k)}>{nm}</button>)}</div>}
            <div className="dsb-code-h"><span className="dsb-lang">{lang}</span><code>{filename}</code></div>
            <pre className="dsb-code"><code>{code}</code></pre>
          </div>
        </div>
      </Modal>
    );
  }

  ReactDOM.createRoot(document.getElementById("app")).render(<App />);
})();
