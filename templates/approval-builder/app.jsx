/* Approval (전자결재) Form Builder — main app. Document canvas with
   drag-to-reorder blocks, per-block property editor, starter templates,
   settings & multi-format export (HTML form / LWC scaffold / JSON). */
(function () {
  const DS = window.SalesforceSLDS2DesignSystem_2eee88;
  const { catalog, byType, defaultProps, templates, baseSettings, starter } = window.APB;
  const { Icon, Button, ButtonMenu, Modal, Input, Select, Textarea, Toggle } = DS;
  const KEY = "apb-state-v1";

  let UID = 1; const uid = () => "a" + UID++;
  let DRAG = null;
  const SWATCHES = ["#1b3a6b", "#0b6b4f", "#7a3da3", "#b5621b", "#1c2430", "#0176D3", "#06A59A", "#b00020"];

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

    function onDropAt(index, e) { e.preventDefault(); e.stopPropagation(); setOverIdx(null); const d = DRAG; DRAG = null; if (!d) return; if (d.kind === "new") addBlock(d.type, index); else if (d.kind === "move") moveBlock(d.id, index); }

    const selBlock = sel ? state.blocks.find((b) => b.id === sel) : null;
    const s = state.settings;

    return (
      <div className="apb">
        <header className="apb-bar">
          <div className="apb-brand">
            <img src="../../assets/salesforce-cloud.svg" alt="" style={{ height: 22 }} />
            <div style={{ minWidth: 0 }}>
              <strong>전자결재 폼 빌더</strong>
              <div className="apb-sub" title={s.company}>{s.docTitle} · {s.company}</div>
            </div>
            <span className="apb-tag">Approval Form</span>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <ButtonMenu label="양식" iconName="utility:copy" items={Object.keys(templates).map((k) => ({ label: templates[k].label, iconName: templates[k].icon, onClick: () => { setState(loadTemplate(k)); setSel(null); } }))} />
            <Button variant="neutral" iconName="utility:settings" label="문서 설정" onClick={() => setSettingsOpen(true)} />
            <Button variant={preview ? "brand" : "neutral"} iconName="utility:preview" label={preview ? "편집" : "미리보기"} onClick={() => { setPreview((p) => !p); setSel(null); }} />
            <Button variant="neutral" iconName="utility:refresh" title="초기화" onClick={() => { setState(seed()); setSel(null); }} />
            <Button variant="brand" iconName="utility:download" label="내보내기" onClick={() => setExp(true)} />
          </div>
        </header>

        <div className="apb-body">
          {!preview && (
            <aside className="apb-palette">
              <div className="apb-palette-h">구성 요소</div>
              <p className="apb-hint">문서로 끌어다 놓거나 클릭해 추가하세요. 블록을 선택하면 속성을 편집합니다.</p>
              {groupOrder().map((g) => (
                <div key={g} className="apb-group">
                  <div className="apb-group-h">{g}</div>
                  {catalog.filter((c) => c.group === g).map((c) => (
                    <div key={c.type} className="apb-pitem" draggable
                      onDragStart={() => (DRAG = { kind: "new", type: c.type })} onDragEnd={() => (DRAG = null)}
                      onClick={() => addBlock(c.type)} title={c.desc + "  ·  클릭하여 추가"}>
                      <span className="apb-pico"><Icon iconName={c.icon} size="small" /></span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="apb-pitem-l">{c.label}</div>
                        <div className="apb-pitem-d">{c.desc}</div>
                      </div>
                      <Icon iconName="utility:drag_and_drop" size="xx-small" />
                    </div>
                  ))}
                </div>
              ))}
            </aside>
          )}

          <main className="apb-canvas" onClick={() => setSel(null)}>
            <div className="apb-stage">
              <div className="apb-doc" style={{ width: s.width, maxWidth: "100%", fontFamily: s.fontFamily }} onClick={(e) => e.stopPropagation()}
                onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDropAt(null, e)}>
                {state.blocks.map((b, i) => <Block key={b.id} b={b} index={i} />)}
                {state.blocks.length === 0 && (
                  <div className="apb-blank" onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDropAt(0, e)}>
                    <Icon iconName="utility:add" size="small" /><span>구성 요소를 끌어다 놓아 문서를 시작하세요</span>
                  </div>
                )}
              </div>
            </div>
          </main>

          {!preview && (
            <aside className="apb-inspect">
              <div className="apb-palette-h">{selBlock ? "속성" : "문서"}</div>
              {selBlock ? (
                <div className="apb-insp-body">
                  <div className="apb-insp-title"><Icon iconName={byType[selBlock.type].icon} size="small" /><strong>{byType[selBlock.type].label}</strong></div>
                  <p className="apb-insp-desc">{byType[selBlock.type].desc}</p>
                  {(byType[selBlock.type].props || []).length > 0 && (
                    <div className="apb-props">
                      {byType[selBlock.type].props.map((pr) => (
                        <PropEditor key={pr.k} pr={pr} value={selBlock.props[pr.k]} onChange={(v) => setProp(selBlock.id, pr.k, v)} />
                      ))}
                    </div>
                  )}
                  <div className="apb-insp-actions">
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Button variant="neutral" size="small" iconName="utility:up" label="위로" onClick={() => nudge(selBlock.id, -1)} />
                      <Button variant="neutral" size="small" iconName="utility:down" label="아래로" onClick={() => nudge(selBlock.id, 1)} />
                      <Button variant="neutral" size="small" iconName="utility:copy" title="복제" onClick={() => duplicateBlock(selBlock.id)} />
                    </div>
                    <Button variant="destructive" size="small" iconName="utility:delete" label="삭제" onClick={() => removeBlock(selBlock.id)} />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="apb-hint" style={{ padding: "0 0.875rem" }}>블록을 선택해 편집하세요. 아래 설정은 문서 전체에 적용되며 내보내기에 반영됩니다.</p>
                  <div className="apb-pagecard">
                    <div className="apb-pagecard-h"><Icon iconName="standard:approval" size="small" /><strong>문서 설정</strong></div>
                    <dl className="apb-meta" style={{ margin: "0.5rem 0 0" }}>
                      <dt>제목</dt><dd>{s.docTitle}</dd>
                      <dt>회사</dt><dd>{s.company}</dd>
                      <dt>객체(API)</dt><dd><code>{s.objectApiName}</code></dd>
                      <dt>블록</dt><dd>{state.blocks.length}</dd>
                    </dl>
                    <Button variant="neutral" size="small" iconName="utility:settings" label="문서 설정 열기" onClick={() => setSettingsOpen(true)} style={{ marginTop: "0.625rem", width: "100%" }} />
                  </div>
                </div>
              )}
              <div className="apb-insp-foot"><Icon iconName="utility:info" size="xx-small" /><span>블록은 인라인 스타일로 렌더되어 캔버스가 내보낸 HTML 폼과 일치합니다.</span></div>
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
        <div className={`apb-block ${selected ? "sel" : ""} ${preview ? "preview" : ""}`} draggable={!preview}
          onDragStart={(e) => { if (preview) return; DRAG = { kind: "move", id: b.id }; e.stopPropagation(); }} onDragEnd={() => (DRAG = null)}
          onDragOver={(e) => { if (!preview) { e.preventDefault(); setOverIdx(index); } }}
          onDragLeave={(e) => { if (e.currentTarget === e.target) setOverIdx((o) => (o === index ? null : o)); }}
          onDrop={(e) => { if (!preview) onDropAt(index, e); }}
          onClick={(e) => { if (!preview) { e.stopPropagation(); setSel(b.id); } }}>
          {overIdx === index && !preview && <div className="apb-insline" />}
          {!preview && (
            <div className="apb-wbar">
              <span className="apb-grip"><Icon iconName="utility:drag_and_drop" size="xx-small" /></span>
              <span className="apb-wname">{byType[b.type].label}</span>
              <button className="apb-ic" title="위로" onClick={(e) => { e.stopPropagation(); nudge(b.id, -1); }}>▲</button>
              <button className="apb-ic" title="아래로" onClick={(e) => { e.stopPropagation(); nudge(b.id, 1); }}>▼</button>
              <button className="apb-ic" title="복제" onClick={(e) => { e.stopPropagation(); duplicateBlock(b.id); }}>⎘</button>
              <button className="apb-ic del" title="삭제" onClick={(e) => { e.stopPropagation(); removeBlock(b.id); }}>✕</button>
            </div>
          )}
          <div className="apb-block-body" style={{ pointerEvents: preview ? "auto" : "none" }}>{window.APBRender(b.type, b.props, ctx)}</div>
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
        <div className="apb-lbl">{pr.l}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <label style={{ position: "relative", width: 26, height: 26, borderRadius: 5, border: "1px solid var(--slds-g-color-border-2)", background: value, cursor: "pointer", flex: "none", overflow: "hidden" }}>
            <input type="color" value={/^#([0-9a-f]{6})$/i.test(value) ? value : "#1b3a6b"} onChange={(e) => onChange(e.target.value)} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }} />
          </label>
          <input className="apb-hex" value={value} onChange={(e) => onChange(e.target.value)} />
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
    const fonts = ["'Malgun Gothic', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", "'Noto Serif KR', 'Batang', serif", "'Nanum Gothic', sans-serif", "'Apple SD Gothic Neo', sans-serif"];
    return (
      <Modal isOpen onClose={onClose} size="small" title="문서 설정" tagline="제목, 회사, 객체 API, 강조색, 서체, 용지 폭."
        footer={<React.Fragment><Button variant="neutral" label="취소" onClick={onClose} /><Button variant="brand" label="저장" onClick={save} /></React.Fragment>}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <Input label="문서 제목" value={s.docTitle} onChange={(e) => set("docTitle", e.target.value)} />
          <Input label="회사명" value={s.company} onChange={(e) => set("company", e.target.value)} />
          <Input label="객체 API 이름 (LWC 대상)" value={s.objectApiName} onChange={(e) => set("objectApiName", e.target.value)} />
          <div style={{ display: "flex", gap: "0.875rem" }}>
            <Select label="서체" value={s.fontFamily} options={fonts.map((f) => ({ label: f.split(",")[0].replace(/'/g, ""), value: f }))} onChange={(e) => set("fontFamily", e.target.value)} />
            <Select label="용지 폭" value={String(s.width)} options={[760, 794, 680].map((n) => ({ label: n === 794 ? "A4 (794)" : n + "px", value: String(n) }))} onChange={(e) => set("width", Number(e.target.value))} />
          </div>
          <div><div className="apb-lbl">강조색</div><div style={{ display: "flex", alignItems: "center", gap: 8 }}><label style={{ position: "relative", width: 26, height: 26, borderRadius: 5, border: "1px solid var(--slds-g-color-border-2)", background: s.accent, overflow: "hidden", flex: "none" }}><input type="color" value={/^#([0-9a-f]{6})$/i.test(s.accent) ? s.accent : "#1b3a6b"} onChange={(e) => set("accent", e.target.value)} style={{ position: "absolute", inset: 0, opacity: 0 }} /></label><input className="apb-hex" value={s.accent} onChange={(e) => set("accent", e.target.value)} /><div style={{ display: "flex", gap: 4 }}>{SWATCHES.slice(0, 4).map((c) => <button key={c} onClick={() => set("accent", c)} style={{ width: 18, height: 18, borderRadius: 4, border: "1px solid rgba(0,0,0,.12)", background: c, cursor: "pointer", padding: 0 }} />)}</div></div></div>
        </div>
      </Modal>
    );
  }

  function ExportModal({ state, onClose }) {
    const E = window.APBExport;
    const [fmt, setFmt] = React.useState("html");
    const [lwcFile, setLwcFile] = React.useState("html");
    const [copied, setCopied] = React.useState(false);
    const lwcOut = E.lwc(state);
    let code = "", filename = "form.html", lang = "HTML";
    if (fmt === "html") { code = E.html(state); filename = "approval-form.html"; lang = "HTML"; }
    else if (fmt === "json") { code = E.json(state); filename = "approval-form.json"; lang = "JSON"; }
    else { if (lwcFile === "html") { code = lwcOut.html; filename = lwcOut.htmlName; lang = "HTML"; } else if (lwcFile === "js") { code = lwcOut.js; filename = lwcOut.jsName; lang = "JS"; } else { code = lwcOut.meta; filename = lwcOut.metaName; lang = "XML"; } }

    const formats = [
      { id: "html", label: "인라인 HTML 폼", sub: "인쇄 가능 양식", icon: "utility:page" },
      { id: "lwc", label: "Lightning(LWC) 스캐폴드", sub: ".html / .js / meta", icon: "utility:apex" },
      { id: "json", label: "양식 JSON", sub: "이식 가능 설명자", icon: "utility:json" },
    ];
    const notes = {
      html: "모든 스타일이 인라인된 완성형 HTML 결재 양식입니다. 그대로 인쇄하거나 사내 시스템·Visualforce·이메일에 붙여 넣을 수 있습니다. 입력 필드는 실제 폼 컨트롤로 출력됩니다.",
      lwc: "각 필드를 lightning 베이스 컴포넌트로 매핑한 Lightning Web Component 스캐폴드입니다. 결재선/서명은 주석으로 표시되며, Salesforce 승인 프로세스(Approval Process)에 연결해 상신하도록 구조만 제공합니다.",
      json: "양식의 이식 가능한 설명: 설정과 모든 블록·속성입니다. 자체 코드 생성기나 디자인 저장에 사용하세요.",
    };
    return (
      <Modal isOpen onClose={onClose} size="large" title="결재 양식 내보내기" tagline="담당자/개발자에게 전달 — 형식을 선택하세요."
        footer={<React.Fragment>
          <Button variant="neutral" label="닫기" onClick={onClose} />
          <Button variant="neutral" iconName="utility:copy" label={copied ? "복사됨!" : "복사"} onClick={() => { copy(code); setCopied(true); setTimeout(() => setCopied(false), 1200); }} />
          <Button variant="brand" iconName="utility:download" label="파일 다운로드" onClick={() => download(filename, code)} />
        </React.Fragment>}>
        <div className="apb-export">
          <div className="apb-export-rail">
            {formats.map((f) => (
              <button key={f.id} className={`apb-fmt ${fmt === f.id ? "on" : ""}`} onClick={() => setFmt(f.id)}>
                <Icon iconName={f.icon} size="small" />
                <div><div className="apb-fmt-l">{f.label}</div><div className="apb-fmt-s">{f.sub}</div></div>
              </button>
            ))}
          </div>
          <div className="apb-export-main">
            <div className="apb-export-note">{notes[fmt]}</div>
            {fmt === "lwc" && (
              <div className="apb-lwc-tabs">
                {[["html", lwcOut.htmlName], ["js", lwcOut.jsName], ["meta", lwcOut.metaName]].map(([k, nm]) => (
                  <button key={k} className={lwcFile === k ? "on" : ""} onClick={() => setLwcFile(k)}>{nm}</button>
                ))}
              </div>
            )}
            <div className="apb-code-h"><span className="apb-lang">{lang}</span><code>{filename}</code></div>
            <pre className="apb-code"><code>{code}</code></pre>
          </div>
        </div>
      </Modal>
    );
  }

  ReactDOM.createRoot(document.getElementById("app")).render(<App />);
})();
