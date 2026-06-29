/* LWC Detail Screen Builder — renderers. window.DSBRender(block, ctx) -> element.
   ctx = { openModal(id), preview }. Uses real SLDS 2 components with the block's
   editable props so the canvas reflects the chosen variants. */
(function () {
  const DS = window.SalesforceSLDS2DesignSystem_2eee88;
  const { Button, ButtonGroup, Input, Select, Combobox, Textarea, Checkbox, CheckboxGroup, RadioGroup, Toggle, Slider, DualListbox, FileUpload, Badge, Avatar, Pill, Icon, ProgressBar, Card, Tabs, Accordion, Datatable } = DS;
  const opts = (s) => String(s || "").split(",").map((x) => x.trim()).filter(Boolean);
  const optObjs = (s) => opts(s).map((o) => ({ label: o, value: o.toLowerCase().replace(/[^a-z0-9]+/g, "_") }));

  const OPP_ROWS = [
    { id: "1", c0: "Global Media — Renewal", c1: "$240,000", c2: "Negotiation", c3: "8/30/2026" },
    { id: "2", c0: "Acme — Expansion", c1: "$185,000", c2: "Proposal", c3: "9/15/2026" },
    { id: "3", c0: "Initech — Platform", c1: "$96,000", c2: "Qualify", c3: "10/02/2026" },
    { id: "4", c0: "Umbrella — Services", c1: "$72,000", c2: "Discovery", c3: "9/28/2026" },
  ];

  function leaf(b) {
    const p = b.props || {};
    switch (b.type) {
      case "input":
        return <Input label={p.label} type={p.type} placeholder={p.placeholder} iconName={p.iconName || undefined} required={!!p.required} readOnly={!!p.readOnly} disabled={!!p.disabled} defaultValue={p.value || ""} />;
      case "select":
        return <Select label={p.label} options={optObjs(p.options)} required={!!p.required} disabled={!!p.disabled} />;
      case "combobox":
        return <Combobox label={p.label} placeholder={p.placeholder} options={optObjs(p.options)} disabled={!!p.disabled} />;
      case "textarea":
        return <Textarea label={p.label} placeholder={p.placeholder} rows={Number(p.rows) || 3} required={!!p.required} disabled={!!p.disabled} />;
      case "checkbox":
        return <Checkbox label={p.label} defaultChecked={!!p.checked} disabled={!!p.disabled} />;
      case "checkboxGroup":
        return <CheckboxGroup label={p.label} options={optObjs(p.options)} disabled={!!p.disabled} />;
      case "radioGroup":
        return <RadioGroup label={p.label} options={optObjs(p.options)} disabled={!!p.disabled} />;
      case "toggle":
        return <Toggle label={p.label} defaultChecked={!!p.checked} disabled={!!p.disabled} />;
      case "slider":
        return <Slider label={p.label} min={Number(p.min)} max={Number(p.max)} step={Number(p.step) || 1} defaultValue={Number(p.value)} unit={p.unit} showValue={!!p.showValue} disabled={!!p.disabled} />;
      case "dualListbox":
        return <DualListbox label={p.label} sourceLabel={p.sourceLabel} selectedLabel={p.selectedLabel} options={optObjs(p.options)} defaultValue={[optObjs(p.options)[0] ? optObjs(p.options)[0].value : ""]} />;
      case "fileUpload":
        return <FileUpload label={p.label} accept={p.accept || undefined} multiple={!!p.multiple} />;
      case "badge":
        return <Badge variant={p.variant} label={p.label} />;
      case "avatar":
        return <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}><Avatar initials={p.initials} iconName={p.iconName || undefined} size={p.size} variant={p.variant} /><span style={{ fontSize: "var(--slds-g-text-body-regular)" }}>{p.initials ? "Lando Voss" : ""}</span></div>;
      case "pill":
        return <Pill iconName={p.iconName || undefined} label={p.label} />;
      case "icon":
        return <Icon iconName={p.iconName || "standard:contact"} size={p.size} />;
      case "progressBar":
        return <ProgressBar value={Number(p.value) || 0} variant={p.variant} size={p.size} showValue={!!p.showValue} label={p.label} />;
      case "formattedText":
        return <div style={{ fontSize: "var(--slds-g-text-body-regular)", color: "var(--slds-g-color-on-surface-2)", lineHeight: 1.55 }}>{p.content}</div>;
      case "button":
        return <Button label={p.label} variant={p.variant} size={p.size} iconName={p.iconName || undefined} iconPosition={p.iconPosition} stretch={!!p.stretch} disabled={!!p.disabled} />;
      case "buttonGroup": {
        const items = opts(p.items).map((l) => ({ label: l, value: l.toLowerCase() }));
        return <ButtonGroup value={items[0] ? items[0].value : ""} items={items} />;
      }
      case "tabset":
        return <TabsetView tabs={opts(p.tabs)} variant={p.variant} />;
      case "accordion":
        return <Accordion allowMultiple={!!p.allowMultiple} defaultActive={[0]} sections={opts(p.sections).map((s, i) => ({ id: i, label: s, content: <div style={{ fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-2)" }}>{s} content…</div> }))} />;
      case "datatable": {
        const cols = opts(p.columns).map((l, i) => ({ key: "c" + i, label: l, align: i === 1 ? "right" : undefined }));
        return <Datatable selectable={!!p.selectable} columns={cols} rows={OPP_ROWS.slice(0, Number(p.rows) || 3)} />;
      }
      case "divider":
        return <div style={{ padding: `${Number(p.pad) || 12}px 0` }}><div style={{ borderTop: "1px solid var(--slds-g-color-border-2)" }} /></div>;
      case "spacer":
        return <div style={{ height: Number(p.height) || 24 }} />;
      default:
        return <div style={{ padding: 8, color: "var(--slds-g-color-on-surface-3)" }}>{b.type}</div>;
    }
  }

  function childGrid(children, cols, ctx) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: "0.875rem 1.25rem", alignItems: "start" }}>
        {(children || []).map((c) => <div key={c.id}>{ctx.renderChild ? ctx.renderChild(c) : leaf(c)}</div>)}
        {(!children || !children.length) && <div style={{ gridColumn: "1 / -1", padding: "0.75rem", border: "1.5px dashed var(--slds-g-color-border-2)", borderRadius: "var(--slds-g-radius-border-3)", textAlign: "center", color: "var(--slds-g-color-on-surface-3)", fontSize: "var(--slds-g-text-body-small)" }}>Empty — select &amp; add components</div>}
      </div>
    );
  }

  // Tabset honoring variant: standard (underline) · scoped (boxed) · vertical (left rail)
  function TabsetView({ tabs, variant }) {
    const list = (tabs && tabs.length) ? tabs : ["Details", "Related"];
    const [active, setActive] = React.useState(0);
    const v = variant || "standard";
    const act = Math.min(active, list.length - 1);
    const content = <div style={{ padding: "1rem 0.25rem", fontSize: "var(--slds-g-text-body-regular)", color: "var(--slds-g-color-on-surface-2)" }}>{list[act]} content…</div>;
    const tabBtn = (l, i, style) => <button key={i} type="button" onClick={(e) => { e.stopPropagation(); setActive(i); }} style={style}>{l}</button>;
    if (v === "vertical") {
      return (
        <div style={{ display: "flex", gap: "1rem" }}>
          <div role="tablist" style={{ display: "flex", flexDirection: "column", minWidth: 132 }}>
            {list.map((l, i) => tabBtn(l, i, { textAlign: "left", padding: "0.5rem 0.75rem", border: 0, background: "transparent", cursor: "pointer", fontSize: "var(--slds-g-text-body-regular)", fontWeight: i === act ? 700 : 400, color: i === act ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-on-surface-2)", borderLeft: "2px solid " + (i === act ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-2)") }))}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>{content}</div>
        </div>
      );
    }
    if (v === "scoped") {
      return (
        <div>
          <div role="tablist" style={{ display: "flex", gap: 2, background: "var(--slds-g-color-surface-2)", padding: "4px 4px 0", border: "1px solid var(--slds-g-color-border-2)", borderBottom: 0, borderRadius: "var(--slds-g-radius-border-2) var(--slds-g-radius-border-2) 0 0" }}>
            {list.map((l, i) => tabBtn(l, i, { padding: "0.4rem 0.875rem", border: "1px solid " + (i === act ? "var(--slds-g-color-border-2)" : "transparent"), borderBottom: 0, background: i === act ? "var(--slds-g-color-surface-1)" : "transparent", borderRadius: "var(--slds-g-radius-border-2) var(--slds-g-radius-border-2) 0 0", cursor: "pointer", fontSize: "var(--slds-g-text-body-regular)", fontWeight: i === act ? 700 : 400, color: i === act ? "var(--slds-g-color-on-surface-1)" : "var(--slds-g-color-on-surface-2)", position: "relative", top: 1 }))}
          </div>
          <div style={{ border: "1px solid var(--slds-g-color-border-2)", borderRadius: "0 0 var(--slds-g-radius-border-2) var(--slds-g-radius-border-2)", padding: "0.25rem 0.75rem 0.5rem" }}>{content}</div>
        </div>
      );
    }
    return (
      <div>
        <div role="tablist" style={{ display: "flex", gap: "1.25rem", borderBottom: "1px solid var(--slds-g-color-border-2)" }}>
          {list.map((l, i) => tabBtn(l, i, { padding: "0.5rem 0", border: 0, borderBottom: "2px solid " + (i === act ? "var(--slds-g-color-accent-1)" : "transparent"), background: "transparent", cursor: "pointer", fontSize: "var(--slds-g-text-body-regular)", fontWeight: i === act ? 700 : 400, color: i === act ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-on-surface-2)", marginBottom: -1 }))}
        </div>
        {content}
      </div>
    );
  }

  // Section honoring collapsible: chevron actually toggles the body
  function SectionView({ block, ctx }) {
    const p = block.props || {};
    const collapsible = !!p.collapsible;
    const [open, setOpen] = React.useState(true);
    const shown = !collapsible || open;
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: "1px solid var(--slds-g-color-border-2)", padding: "0 0 0.5rem", marginBottom: shown ? "0.875rem" : 0 }}>
          {collapsible && <button type="button" onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }} style={{ border: 0, background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex" }}><Icon iconName={shown ? "utility:chevrondown" : "utility:chevronright"} size="x-small" /></button>}
          <h3 style={{ margin: 0, fontSize: "var(--slds-g-text-title-medium, 0.8125rem)", fontWeight: "var(--slds-g-font-weight-bold)", textTransform: "uppercase", letterSpacing: ".04em", color: "var(--slds-g-color-on-surface-2)" }}>{p.title}</h3>
        </div>
        {shown && childGrid(block.children, Number(p.columns) || 1, ctx)}
      </div>
    );
  }

  function block(b, ctx) {
    const p = b.props || {};
    ctx = ctx || {};
    if (b.type === "section") {
      return <SectionView block={b} ctx={ctx} />;
    }
    if (b.type === "card") {
      return <Card title={p.title} iconName={p.iconName || undefined}>{childGrid(b.children, Number(p.columns) || 1, ctx)}</Card>;
    }
    if (b.type === "modal") {
      const n = (b.children || []).length;
      return (
        <div style={{ border: "1px dashed var(--slds-g-color-accent-1)", borderRadius: "var(--slds-g-radius-border-4)", background: "var(--slds-g-color-accent-container-1)", padding: "1rem", display: "flex", alignItems: "center", gap: "0.875rem" }}>
          <Icon iconName="utility:expand" size="small" variant="brand" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: "var(--slds-g-font-weight-bold)", fontSize: "var(--slds-g-text-body-regular)" }}>{p.title} <span style={{ fontWeight: 400, color: "var(--slds-g-color-on-surface-3)" }}>· modal</span></div>
            <div style={{ fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-3)" }}>{n} component{n === 1 ? "" : "s"} in body · size {p.size}</div>
          </div>
          <Button variant={p.triggerVariant} label={p.trigger} iconName="utility:expand" onClick={(e) => { if (e && e.stopPropagation) e.stopPropagation(); ctx.openModal && ctx.openModal(b.id); }} />
        </div>
      );
    }
    return leaf(b);
  }

  // render the composed body of a modal (used by the live Modal overlay)
  function modalBody(b, cols) { return childGrid(b.children, Number(cols) || 1, {}); }

  window.DSBRender = block;
  window.DSBRender.leaf = leaf;
  window.DSBRender.modalBody = modalBody;
})();
