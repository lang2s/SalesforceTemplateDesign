/* CRM Page Builder — main app. Drag-drop canvas driven by layout rows,
   per-component property editors, page settings, and multi-format export. */
(function () {
  const DS = window.SalesforceSLDS2DesignSystem_2eee88;
  const { pageTypes, layouts, regionLabels, catalog, byType, defaultProps, starter, baseGroups, baseComponents, baseById, baseByTag } = window.CRMB;
  const { Icon, Button, ButtonGroup, ButtonMenu, Badge, Modal, Input, Select, Textarea, Toggle } = DS;
  const KEY = "crmb-state-v3";

  let UID = 1;
  const uid = () => "b" + UID++;
  let DRAG = null;

  function mkBlock(type) { return { id: uid(), type, props: defaultProps(type) }; }
  function freshSettings(pageType) {
    return pageType === "record"
      ? { label: "Contact Record Page", apiName: "Contact_Record_Page", object: "Contact", description: "" }
      : { label: "Sales Home", apiName: "Sales_Home", object: "", description: "" };
  }
  function seed() {
    const regions = {};
    layouts["header-right"].rows.forEach((row) => row.forEach((c) => (regions[c.region] = regions[c.region] || [])));
    Object.keys(starter).forEach((rn) => { regions[rn] = starter[rn].map((b) => ({ id: uid(), type: b.type, props: { ...b.props } })); });
    return { pageType: "record", layout: "header-right", settings: freshSettings("record"), regions };
  }
  function loadState() {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.regions && s.layout) return s; } catch (e) {}
    return seed();
  }

  function download(filename, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  const copy = (t) => navigator.clipboard && navigator.clipboard.writeText(t).catch(() => {});

  function App() {
    const [state, setState] = React.useState(loadState);
    const [sel, setSel] = React.useState(null);
    const [preview, setPreview] = React.useState(false);
    const [over, setOver] = React.useState(null);
    const [exp, setExp] = React.useState(false);
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [addBody, setAddBody] = React.useState(null);

    React.useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)); }, [state]);

    const lay = layouts[state.layout];
    const regionOrder = lay.rows.flatMap((r) => r.map((c) => c.region));

    function setPageType(pt) {
      if (pt === state.pageType) return;
      setState((s) => ({ ...s, pageType: pt, settings: freshSettings(pt) }));
      setSel(null);
    }
    function setLayout(lid) {
      if (lid === state.layout) return;
      setState((s) => {
        const newRegions = layouts[lid].rows.flatMap((r) => r.map((c) => c.region));
        const primary = layouts[lid].primary;
        const regions = {};
        newRegions.forEach((rn) => (regions[rn] = []));
        // migrate: keep blocks whose region still exists; else move to primary
        Object.keys(s.regions).forEach((rn) => {
          const target = newRegions.includes(rn) ? rn : primary;
          regions[target] = regions[target].concat(s.regions[rn] || []);
        });
        return { ...s, layout: lid, regions };
      });
      setSel(null);
    }

    function update(fn) { setState((s) => { const regions = {}; Object.keys(s.regions).forEach((k) => (regions[k] = [...s.regions[k]])); return fn({ ...s, regions }); }); }
    function addBlock(region, type, index) { update((s) => { const arr = s.regions[region] || (s.regions[region] = []); const nb = mkBlock(type); arr.splice(index == null ? arr.length : index, 0, nb); return s; }); }
    function moveBlock(id, from, to, index) {
      update((s) => {
        const fa = s.regions[from]; const i = fa.findIndex((b) => b.id === id); if (i < 0) return s;
        const [blk] = fa.splice(i, 1); const ta = s.regions[to] || (s.regions[to] = []);
        let ti = index == null ? ta.length : index; if (from === to && i < ti) ti -= 1; ta.splice(ti, 0, blk); return s;
      });
    }
    function removeBlock(id, region) { update((s) => { s.regions[region] = s.regions[region].filter((b) => b.id !== id); return s; }); setSel(null); }
    function nudge(id, region, dir) { update((s) => { const a = s.regions[region]; const i = a.findIndex((b) => b.id === id); const j = i + dir; if (i < 0 || j < 0 || j >= a.length) return s; [a[i], a[j]] = [a[j], a[i]]; return s; }); }
    function setProp(id, region, key, val) { update((s) => { s.regions[region] = s.regions[region].map((b) => b.id === id ? { ...b, props: { ...b.props, [key]: val } } : b); return s; }); }
    function setBody(id, region, fn) { update((s) => { s.regions[region] = s.regions[region].map((b) => b.id === id ? { ...b, props: { ...b.props, body: fn(Array.isArray(b.props.body) ? b.props.body : []) } } : b); return s; }); }
    function addBodyComp(id, region, key) { setBody(id, region, (arr) => [...arr, { id: uid(), key }]); }
    function removeBodyComp(id, region, cid) { setBody(id, region, (arr) => arr.filter((x) => x.id !== cid)); }
    function moveBodyComp(id, region, cid, dir) { setBody(id, region, (arr) => { const i = arr.findIndex((x) => x.id === cid); const j = i + dir; if (i < 0 || j < 0 || j >= arr.length) return arr; const n = arr.slice(); [n[i], n[j]] = [n[j], n[i]]; return n; }); }

    function onDropRegion(region, index, e) {
      e.preventDefault(); e.stopPropagation(); setOver(null);
      const d = DRAG; DRAG = null; if (!d) return;
      if (d.kind === "new") addBlock(region, d.type, index);
      else if (d.kind === "move") moveBlock(d.id, d.region, region, index);
    }

    const selBlock = (() => { if (!sel) return null; for (const rn of regionOrder) { const b = (state.regions[rn] || []).find((x) => x.id === sel); if (b) return { ...b, region: rn }; } return null; })();

    return (
      <div className="crmb">
        <header className="crmb-bar">
          <div className="crmb-brand">
            <img src="../../assets/salesforce-cloud.svg" alt="" style={{ height: 22 }} />
            <strong>CRM Page Builder</strong>
            <span className="crmb-tag">Prototype</span>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: "0.625rem", alignItems: "center" }}>
            <ButtonGroup value={state.pageType} onChange={setPageType} items={[
              { label: "Record Page", value: "record", iconName: "utility:record_lookup" },
              { label: "App / Home", value: "app", iconName: "utility:home" },
            ]} />
            <ButtonMenu label={lay.label} iconName="utility:chevrondown" items={Object.keys(layouts).map((lid) => ({
              label: layouts[lid].label, iconName: layouts[lid].icon, checked: lid === state.layout, onClick: () => setLayout(lid),
            }))} />
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <Button variant="neutral" iconName="utility:settings" label="Settings" onClick={() => setSettingsOpen(true)} />
            <Button variant={preview ? "brand" : "neutral"} iconName="utility:preview" label={preview ? "Editing off" : "Preview"} onClick={() => { setPreview((p) => !p); setSel(null); }} />
            <Button variant="neutral" iconName="utility:refresh" title="Reset" onClick={() => { setState(seed()); setSel(null); }} />
            <Button variant="brand" iconName="utility:download" label="Export" onClick={() => setExp(true)} />
          </div>
        </header>

        <div className="crmb-body">
          {!preview && (
            <aside className="crmb-palette">
              <div className="crmb-palette-h">Components</div>
              <p className="crmb-hint">Drag onto the page, or click to add. Select a block to edit its properties.</p>
              {groupOrder().map((g) => (
                <div key={g} className="crmb-group">
                  <div className="crmb-group-h">{g}</div>
                  {catalog.filter((c) => c.group === g).map((c) => (
                    <div key={c.type} className="crmb-pitem" draggable
                      onDragStart={() => (DRAG = { kind: "new", type: c.type })} onDragEnd={() => (DRAG = null)}
                      onClick={() => addBlock(regionOrder.includes(c.region) ? c.region : lay.primary, c.type)}
                      title={c.desc + "  ·  click to add"}>
                      <Icon iconName={c.icon} size="small" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="crmb-pitem-l">{c.label}</div>
                        <div className="crmb-pitem-d">{c.desc}</div>
                      </div>
                      <Icon iconName="utility:drag_and_drop" size="xx-small" />
                    </div>
                  ))}
                </div>
              ))}
            </aside>
          )}

          <main className="crmb-canvas" onClick={() => setSel(null)}>
            <div className="crmb-page" onClick={(e) => e.stopPropagation()}>
              {lay.rows.map((row, ri) => (
                <div key={ri} className="crmb-row" style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  {row.map((cell) => (
                    <div key={cell.region} style={{ flex: cell.flex, minWidth: 0 }}><Region name={cell.region} /></div>
                  ))}
                </div>
              ))}
            </div>
          </main>

          {!preview && (
            <aside className="crmb-inspect">
              <div className="crmb-palette-h">{selBlock ? "Properties" : "Inspector"}</div>
              {selBlock ? (
                <div className="crmb-insp-body">
                  <div className="crmb-insp-title"><Icon iconName={byType[selBlock.type].icon} size="small" /><strong>{byType[selBlock.type].label}</strong></div>
                  <p className="crmb-insp-desc">{byType[selBlock.type].desc}</p>

                  {(byType[selBlock.type].props || []).length > 0 && (
                    <div className="crmb-props">
                      {byType[selBlock.type].props.map((pr) => (
                        <PropEditor key={pr.k} pr={pr} value={selBlock.props[pr.k]}
                          onChange={(v) => setProp(selBlock.id, selBlock.region, pr.k, v)} />
                      ))}
                    </div>
                  )}

                  {selBlock.type === "customLwc" && (
                    <div className="crmb-body-sec">
                      <div className="crmb-body-h"><span>Component body</span><span className="crmb-count">{(selBlock.props.body || []).length}</span></div>
                      <p className="crmb-hint" style={{ margin: "0 0 0.5rem" }}>Add base components from the LWC reference to define what this component renders.</p>
                      <Button variant="brand" iconName="utility:add" label="Add component" onClick={() => setAddBody({ id: selBlock.id, region: selBlock.region })} style={{ width: "100%" }} />
                      {(selBlock.props.body || []).length > 0 && (
                        <div className="crmb-body-list">
                          {(selBlock.props.body || []).map((c) => { const item = baseById[c.key] || baseByTag[c.base] || {}; return (
                            <div key={c.id} className="crmb-body-item">
                              <Icon iconName={item.icon || "utility:apex"} size="x-small" />
                              <span className="crmb-body-item-l">{item.label || c.key || c.base}</span>
                              <button className="crmb-ic" title="Up" onClick={() => moveBodyComp(selBlock.id, selBlock.region, c.id, -1)}>▲</button>
                              <button className="crmb-ic" title="Down" onClick={() => moveBodyComp(selBlock.id, selBlock.region, c.id, 1)}>▼</button>
                              <button className="crmb-ic del" title="Remove" onClick={() => removeBodyComp(selBlock.id, selBlock.region, c.id)}>✕</button>
                            </div>
                          ); })}
                        </div>
                      )}
                    </div>
                  )}

                  <dl className="crmb-meta">
                    <dt>Region</dt><dd>{regionLabels[selBlock.region] || selBlock.region}</dd>
                    <dt>App Builder</dt><dd><code>{byType[selBlock.type].flexipage}</code></dd>
                    <dt>LWC base</dt><dd><code>{byType[selBlock.type].lwc}</code></dd>
                  </dl>
                  <div className="crmb-insp-actions">
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Button variant="neutral" size="small" iconName="utility:up" label="Up" onClick={() => nudge(selBlock.id, selBlock.region, -1)} />
                      <Button variant="neutral" size="small" iconName="utility:down" label="Down" onClick={() => nudge(selBlock.id, selBlock.region, 1)} />
                    </div>
                    <Button variant="destructive" size="small" iconName="utility:delete" label="Remove" onClick={() => removeBlock(selBlock.id, selBlock.region)} />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="crmb-hint" style={{ padding: "0 0.875rem" }}>Select a component to edit its properties and see its App Builder &amp; LWC mapping.</p>
                  <div className="crmb-pagecard">
                    <div className="crmb-pagecard-h"><Icon iconName={pageTypes[state.pageType].objectIcon} size="small" /><strong>{state.settings.label}</strong></div>
                    <dl className="crmb-meta" style={{ margin: "0.5rem 0 0" }}>
                      <dt>Type</dt><dd>{pageTypes[state.pageType].label}</dd>
                      <dt>Layout</dt><dd>{lay.label}</dd>
                      {state.settings.object ? <React.Fragment><dt>Object</dt><dd>{state.settings.object}</dd></React.Fragment> : null}
                    </dl>
                    <Button variant="neutral" size="small" iconName="utility:settings" label="Page settings" onClick={() => setSettingsOpen(true)} style={{ marginTop: "0.625rem", width: "100%" }} />
                  </div>
                </div>
              )}
              <div className="crmb-insp-foot"><Icon iconName="utility:info" size="xx-small" /><span>Properties flow into the export, so the generated FlexiPage &amp; LWC match this design.</span></div>
            </aside>
          )}
        </div>

        {exp && <ExportModal state={state} onClose={() => setExp(false)} />}
        {settingsOpen && <SettingsModal state={state} setState={setState} onClose={() => setSettingsOpen(false)} />}
        {addBody && <AddComponentModal onClose={() => setAddBody(null)} onAdd={(key) => addBodyComp(addBody.id, addBody.region, key)} />}
      </div>
    );

    function Region({ name }) {
      const blocks = state.regions[name] || [];
      const isOver = over === name;
      return (
        <section className={`crmb-region ${isOver ? "over" : ""} ${blocks.length ? "" : "empty"}`}
          onDragOver={(e) => { e.preventDefault(); setOver(name); }}
          onDragLeave={(e) => { if (e.currentTarget === e.target) setOver(null); }}
          onDrop={(e) => onDropRegion(name, null, e)}>
          {blocks.length === 0 && !preview && (
            <div className="crmb-empty"><Icon iconName="utility:add" size="small" /><span>Drag here</span><em>{regionLabels[name] || name}</em></div>
          )}
          {blocks.map((blk, i) => <PlacedBlock key={blk.id} blk={blk} region={name} index={i} />)}
        </section>
      );
    }

    function PlacedBlock({ blk, region, index }) {
      const selected = sel === blk.id;
      return (
        <div className={`crmb-block ${selected ? "sel" : ""} ${preview ? "preview" : ""}`} draggable={!preview}
          onDragStart={(e) => { DRAG = { kind: "move", id: blk.id, region }; e.stopPropagation(); }} onDragEnd={() => (DRAG = null)}
          onDragOver={(e) => { if (!preview) e.preventDefault(); }} onDrop={(e) => { if (!preview) onDropRegion(region, index, e); }}
          onClick={(e) => { if (!preview) { e.stopPropagation(); setSel(blk.id); } }}>
          {!preview && (
            <div className="crmb-block-bar">
              <span className="crmb-grip"><Icon iconName="utility:drag_and_drop" size="xx-small" /></span>
              <span className="crmb-block-name">{byType[blk.type].label}</span>
              <button className="crmb-ic" title="Up" onClick={(e) => { e.stopPropagation(); nudge(blk.id, region, -1); }}>▲</button>
              <button className="crmb-ic" title="Down" onClick={(e) => { e.stopPropagation(); nudge(blk.id, region, 1); }}>▼</button>
              <button className="crmb-ic del" title="Remove" onClick={(e) => { e.stopPropagation(); removeBlock(blk.id, region); }}>✕</button>
            </div>
          )}
          <div className="crmb-block-body">{window.CRMBRender(blk.type, blk.props)}</div>
        </div>
      );
    }
  }

  function PropEditor({ pr, value, onChange }) {
    if (pr.t === "toggle") return <div style={{ marginBottom: "0.625rem" }}><Toggle label={pr.l} checked={!!value} onChange={(e) => onChange(e && e.target ? e.target.checked : !value)} /></div>;
    if (pr.t === "select") return <div style={{ marginBottom: "0.625rem" }}><Select label={pr.l} value={value} options={pr.o.map((o) => ({ label: o, value: o }))} onChange={(e) => onChange(e.target.value)} /></div>;
    if (pr.t === "textarea") return <div style={{ marginBottom: "0.625rem" }}><Textarea label={pr.l} value={value} rows={3} onChange={(e) => onChange(e.target.value)} /></div>;
    if (pr.t === "number") return <div style={{ marginBottom: "0.625rem" }}><Input label={pr.l} type="number" value={value} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} /></div>;
    return <div style={{ marginBottom: "0.625rem" }}><Input label={pr.l} value={value} onChange={(e) => onChange(e.target.value)} /></div>;
  }

  function groupOrder() { const seen = []; catalog.forEach((c) => { if (!seen.includes(c.group)) seen.push(c.group); }); return seen; }

  function AddComponentModal({ onClose, onAdd }) {
    const [q, setQ] = React.useState("");
    const ql = q.trim().toLowerCase();
    const groups = baseGroups
      .map((g) => ({ title: g.title, items: baseComponents.filter((b) => b.group === g.title && (!ql || b.label.toLowerCase().includes(ql) || b.base.includes(ql))) }))
      .filter((g) => g.items.length);
    const total = groups.reduce((n, g) => n + g.items.length, 0);
    return (
      <Modal isOpen onClose={onClose} size="large" title="Add base component"
        tagline="From the LWC reference — pick any base component to add to the body."
        footer={<Button variant="brand" label="Done" onClick={onClose} />}>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${baseComponents.length} components…`} iconName="utility:search" />
        <div className="crmb-addscroll">
          {groups.map((g) => (
            <div key={g.title} className="crmb-addgroup">
              <div className="crmb-addgroup-h">{g.title}</div>
              <div className="crmb-addgrid">
                {g.items.map((b) => (
                  <button key={b.id} className="crmb-addcard" onClick={() => onAdd(b.id)}>
                    <Icon iconName={b.icon} size="small" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="crmb-addcard-l">{b.label}</div>
                      <code className="crmb-addcard-c">{b.base}</code>
                    </div>
                    <Icon iconName="utility:add" size="xx-small" variant="brand" />
                  </button>
                ))}
              </div>
            </div>
          ))}
          {total === 0 && <div className="crmb-hint" style={{ textAlign: "center", padding: "1.5rem 0" }}>No components match “{q}”.</div>}
        </div>
      </Modal>
    );
  }

  function SettingsModal({ state, setState, onClose }) {
    const [s, setS] = React.useState(state.settings);
    return (
      <Modal isOpen onClose={onClose} size="small" title="Page settings"
        tagline="These map to the FlexiPage masterLabel, API name & object."
        footer={<React.Fragment><Button variant="neutral" label="Cancel" onClick={onClose} /><Button variant="brand" label="Save" onClick={save} /></React.Fragment>}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <Input label="Page label" value={s.label} onChange={(e) => setS({ ...s, label: e.target.value })} />
          <Input label="Developer / API name" value={s.apiName} onChange={(e) => setS({ ...s, apiName: e.target.value })} />
          {state.pageType === "record" && <Input label="Object API name" value={s.object} onChange={(e) => setS({ ...s, object: e.target.value })} />}
          <Textarea label="Description" rows={2} value={s.description} onChange={(e) => setS({ ...s, description: e.target.value })} />
        </div>
      </Modal>
    );
  }

  function ExportModal({ state, onClose }) {
    const E = window.CRMBExport;
    const [fmt, setFmt] = React.useState("flexi");
    const [lwcFile, setLwcFile] = React.useState("html");
    const [copied, setCopied] = React.useState(false);
    const lwcOut = E.lwc(state);
    let code = "", filename = "page.txt", lang = "";
    if (fmt === "flexi") { code = E.flexipage(state); filename = `${state.settings.apiName || "Page"}.flexipage-meta.xml`; lang = "XML"; }
    else if (fmt === "json") { code = E.json(state); filename = "layout.json"; lang = "JSON"; }
    else if (fmt === "mock") { code = E.htmlMock(state); filename = "mockup-outline.html"; lang = "HTML"; }
    else { if (lwcFile === "html") { code = lwcOut.html; filename = lwcOut.htmlName; lang = "HTML"; } else if (lwcFile === "js") { code = lwcOut.js; filename = lwcOut.jsName; lang = "JS"; } else { code = lwcOut.meta; filename = lwcOut.metaName; lang = "XML"; } }

    const formats = [
      { id: "flexi", label: "Lightning Page", sub: ".flexipage-meta.xml", icon: "utility:page" },
      { id: "lwc", label: "LWC Component", sub: ".html / .js / meta", icon: "utility:apex" },
      { id: "json", label: "Layout JSON", sub: "portable descriptor", icon: "utility:json" },
      { id: "mock", label: "Mockup", sub: "outline for designers", icon: "utility:image" },
    ];
    return (
      <Modal isOpen onClose={onClose} size="large" title="Export page" tagline="Hand off to a designer or developer — pick a format."
        footer={<React.Fragment>
          <Button variant="neutral" label="Close" onClick={onClose} />
          <Button variant="neutral" iconName="utility:copy" label={copied ? "Copied!" : "Copy"} onClick={() => { copy(code); setCopied(true); setTimeout(() => setCopied(false), 1200); }} />
          <Button variant="brand" iconName="utility:download" label="Download file" onClick={() => download(filename, code)} />
        </React.Fragment>}>
        <div className="crmb-export">
          <div className="crmb-export-rail">
            {formats.map((f) => (
              <button key={f.id} className={`crmb-fmt ${fmt === f.id ? "on" : ""}`} onClick={() => setFmt(f.id)}>
                <Icon iconName={f.icon} size="small" />
                <div><div className="crmb-fmt-l">{f.label}</div><div className="crmb-fmt-s">{f.sub}</div></div>
              </button>
            ))}
          </div>
          <div className="crmb-export-main">
            <div className="crmb-export-note">{noteFor(fmt)}</div>
            {fmt === "lwc" && (
              <div className="crmb-lwc-tabs">
                {[["html", lwcOut.htmlName], ["js", lwcOut.jsName], ["meta", lwcOut.metaName]].map(([k, nm]) => (
                  <button key={k} className={lwcFile === k ? "on" : ""} onClick={() => setLwcFile(k)}>{nm}</button>
                ))}
              </div>
            )}
            <div className="crmb-code-h"><span className="crmb-lang">{lang}</span><code>{filename}</code></div>
            <pre className="crmb-code"><code>{code}</code></pre>
          </div>
        </div>
      </Modal>
    );
  }

  function noteFor(fmt) {
    if (fmt === "flexi") return "Native Salesforce format — exactly what Lightning App Builder saves. Deploy it as a FlexiPage and it opens in App Builder. Each component instance carries the properties you set here.";
    if (fmt === "lwc") return "A parent Lightning Web Component composing lightning base components to match your layout & properties. A developer scaffold: correct structure, tags & attributes — finish wiring data with wire adapters (getRecord / getListUi / GraphQL).";
    if (fmt === "json") return "A portable description of the page: settings, layout, and every region's components with their properties, App Builder name & LWC tag. Good for your own code generators.";
    return "A lightweight outline for designers — blocks per region with their settings. For a pixel view, use Preview and screenshot.";
  }

  ReactDOM.createRoot(document.getElementById("app")).render(<App />);
})();
