/* CRM Page Builder — canvas renderers (props-aware).
   window.CRMBRender(type, props) -> React element, using real SLDS 2 components. */
(function () {
  const DS = window.SalesforceSLDS2DesignSystem_2eee88;
  const { Card, Datatable, Tabs, Accordion, Badge, Icon, Avatar, Button, ButtonIcon, ProgressIndicator, Pill, Input, Toggle } = DS;

  // ---- sample data ----
  const FIELDS = [
    { label: "Name", value: "Lando Voss" }, { label: "Mobile", value: "(415) 555-1300" },
    { label: "Title", value: "VP Sales" }, { label: "Email", value: "lvoss@globalmedia.com", link: true },
    { label: "Account Name", value: "Global Media", link: true }, { label: "Mailing Address", value: "San Francisco, CA" },
    { label: "Department", value: "Sales" }, { label: "Lead Source", value: "Web" },
  ];
  const OPP_COLS = [
    { key: "name", label: "Opportunity Name", link: true }, { key: "amount", label: "Amount", align: "right" },
    { key: "stage", label: "Stage" }, { key: "close", label: "Close Date" },
  ];
  const OPP_ROWS = [
    { id: "1", name: "Global Media — Renewal", amount: "$240,000", stage: "Negotiation", close: "8/30/2026" },
    { id: "2", name: "Global Media — Agentforce", amount: "$320,000", stage: "Closed Won", close: "6/10/2026" },
    { id: "3", name: "Global Media — Add-on", amount: "$45,000", stage: "Proposal", close: "9/15/2026" },
    { id: "4", name: "Global Media — Pilot", amount: "$18,000", stage: "Qualification", close: "10/2/2026" },
    { id: "5", name: "Global Media — Services", amount: "$96,000", stage: "Proposal", close: "9/28/2026" },
  ];
  const CONTACT_COLS = [
    { key: "name", label: "Name", link: true }, { key: "title", label: "Title" },
    { key: "account", label: "Account Name" }, { key: "email", label: "Email", link: true }, { key: "phone", label: "Phone" },
  ];
  const CONTACT_ROWS = [
    { id: "1", name: "Lando Voss", title: "VP Sales", account: "Global Media", email: "lvoss@globalmedia.com", phone: "(415) 555-1212" },
    { id: "2", name: "Carlos Piquet", title: "President and CEO", account: "Acme", email: "cpiquet@acme.com", phone: "(212) 555-5555" },
    { id: "3", name: "Lewis Mansell", title: "President", account: "Global Media", email: "lmansell@globalmedia.com", phone: "(415) 555-1212" },
    { id: "4", name: "Max Alonso", title: "Buyer", account: "Acme", email: "malonso@acme.com", phone: "(212) 555-5555" },
    { id: "5", name: "Ayrton Prost", title: "Executive Officer", account: "Pinnacle Corp", email: "aprost@pinnaclecorp.com", phone: "(415) 555-7000" },
  ];
  const ACTS = [
    { icon: "utility:call", title: "Logged a call", desc: "Discussed Q3 renewal scope and pricing.", date: "2h ago" },
    { icon: "utility:email", title: "Email: Proposal v2", desc: "Sent updated proposal with revised terms.", date: "Yesterday" },
    { icon: "utility:event", title: "Discovery meeting", desc: "Reviewed current platform usage.", date: "Jun 20" },
  ];
  const PATH = ["Qualification", "Needs Analysis", "Proposal", "Negotiation", "Closed Won"];
  const splitList = (s) => String(s || "").split(",").map((x) => x.trim()).filter(Boolean);

  const fieldGrid = (fields, cols) => (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols || 2}, 1fr)`, columnGap: "2rem", rowGap: "0.75rem" }}>
      {fields.map((f, i) => (
        <div key={i}>
          <div style={{ fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-3)" }}>{f.label}</div>
          <div style={{ fontSize: "var(--slds-g-text-body-regular)", color: f.link ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-on-surface-1)" }}>{f.value}</div>
        </div>
      ))}
    </div>
  );
  const oppCols = (cols) => cols.map((c) => ({ ...c, render: c.key === "stage" ? (v) => <Badge variant={v === "Closed Won" ? "success" : "brand"} label={v} /> : undefined }));

  const shell = (title, icon, children, actions) => (
    <Card title={title} iconName={icon} actions={actions}>{children}</Card>
  );
  const plain = (children) => (
    <div style={{ background: "var(--slds-g-color-surface-container-1)", border: "1px solid var(--slds-g-color-border-1)", borderRadius: "var(--slds-g-radius-border-4)", boxShadow: "var(--slds-g-shadow-1)", padding: "1rem 1.125rem" }}>{children}</div>
  );

  const R = {
    highlights: (p) => (
      <div style={{ background: "var(--slds-g-color-surface-container-1)", border: "1px solid var(--slds-g-color-border-1)", borderRadius: "var(--slds-g-radius-border-4)", boxShadow: "var(--slds-g-shadow-1)", padding: "1rem 1.125rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
          <Icon iconName="standard:contact" size="large" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-3)" }}>{p.object}</div>
            <h2 style={{ fontSize: "var(--slds-g-text-heading-large)", margin: "0.0625rem 0" }}>{p.recordName}</h2>
          </div>
          {p.showActions && <div style={{ display: "flex", gap: "0.5rem" }}><Button variant="neutral" iconName="utility:add" label="Follow" /><Button variant="neutral" label="Edit" /><ButtonIcon variant="border" iconName="utility:chevrondown" title="More" /></div>}
        </div>
        <div style={{ display: "flex", gap: "2.5rem", marginTop: "0.875rem", paddingTop: "0.875rem", borderTop: "1px solid var(--slds-g-color-border-1)" }}>
          {FIELDS.slice(2, 6).map((f, i) => (
            <div key={i}><div style={{ fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-3)" }}>{f.label}</div><div style={{ fontSize: "var(--slds-g-text-body-regular)", color: f.link ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-on-surface-1)" }}>{f.value}</div></div>
          ))}
        </div>
      </div>
    ),
    path: (p) => plain(<ProgressIndicator variant="path" current={Number(p.current) || 0} steps={PATH} />),
    recordDetail: (p) => shell("Details", "utility:record_lookup", fieldGrid(p.columns === "1" ? FIELDS.slice(0, 4) : FIELDS, Number(p.columns) || 2), <ButtonIcon variant="bare" iconName="utility:edit" title="Edit" size="small" />),
    relatedRecord: (p) => shell(p.title, "standard:account", fieldGrid([{ label: "Account Name", value: "Global Media", link: true }, { label: "Industry", value: "Media" }, { label: "Owner", value: "Austin Guevara" }, { label: "Phone", value: "(415) 555-1212" }], 1)),
    fieldSection: (p) => shell(p.title, "utility:layout", fieldGrid(FIELDS.slice(0, 6), Number(p.columns) || 2)),

    relatedList: (p) => shell(`${p.title} (${Math.min(Number(p.rows) || 3, OPP_ROWS.length)})`, "standard:related_list", <Datatable columns={oppCols(OPP_COLS)} rows={OPP_ROWS.slice(0, Number(p.rows) || 3)} />, <Button variant="neutral" size="small" label="New" />),
    relatedLists: (p) => <RelatedLists objects={splitList(p.objects)} />,

    activity: (p) => shell(p.title, "standard:timeline", (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {ACTS.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: "0.625rem" }}>
            <Icon iconName={a.icon} size="small" variant="brand" />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}><strong style={{ fontSize: "var(--slds-g-text-body-regular)" }}>{a.title}</strong><span style={{ fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-3)", whiteSpace: "nowrap" }}>{a.date}</span></div>
              <div style={{ fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-2)" }}>{a.desc}</div>
            </div>
          </div>
        ))}
      </div>
    ), <Button variant="neutral" size="small" label="Log a Call" />),
    activities: (p) => <TabBlock tabs={splitList(p.tabs)} kind="activities" />,
    chatterFeed: (p) => shell(p.title, "standard:feed", (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        <div style={{ display: "flex", gap: "0.625rem" }}><Avatar initials="AG" size="medium" /><div><strong style={{ fontSize: "var(--slds-g-text-body-regular)" }}>Austin Guevara</strong> <span style={{ fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-3)" }}>· 3h ago</span><div style={{ fontSize: "var(--slds-g-text-body-regular)", marginTop: 2 }}>Renewal call went well — sending updated proposal today.</div></div></div>
        <div style={{ display: "flex", gap: "0.625rem" }}><Avatar initials="LV" size="medium" /><div><strong style={{ fontSize: "var(--slds-g-text-body-regular)" }}>Lando Voss</strong> <span style={{ fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-3)" }}>· Yesterday</span><div style={{ fontSize: "var(--slds-g-text-body-regular)", marginTop: 2 }}>Looking forward to it. Let's align on terms.</div></div></div>
      </div>
    )),
    chatterPublisher: (p) => shell("Share", "standard:feed", (
      <div>
        <div style={{ padding: "0.625rem 0.75rem", border: "1px solid var(--slds-g-color-border-2)", borderRadius: "var(--slds-g-radius-border-3)", color: "var(--slds-g-color-on-surface-3)", fontSize: "var(--slds-g-text-body-regular)" }}>{p.placeholder}</div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.625rem" }}><Button variant="neutral" size="small" label="Poll" iconName="utility:chart" /><Button variant="brand" size="small" label="Share" /></div>
      </div>
    )),
    topics: (p) => shell("Topics", "standard:topic", <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>{splitList(p.topics).map((t, i) => <Pill key={i} label={t} />)}</div>),

    listView: (p) => <ListView p={p} />,
    dataTable: (p) => shell("Data Table", "standard:datatable", <Datatable selectable={!!p.selectable} columns={oppCols(OPP_COLS)} rows={OPP_ROWS.slice(0, Number(p.rows) || 3)} />),
    recentItems: (p) => shell(p.title, "standard:recent", (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {CONTACT_ROWS.slice(0, Number(p.rows) || 4).map((c) => (
          <div key={c.id} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Avatar initials={c.name.split(" ").map((x) => x[0]).join("")} size="small" /><div style={{ flex: 1 }}><a style={{ color: "var(--slds-g-color-accent-1)", fontSize: "var(--slds-g-text-body-regular)", fontWeight: "var(--slds-g-font-weight-medium)" }}>{c.name}</a><div style={{ fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-3)" }}>{c.title} · {c.account}</div></div></div>
        ))}
      </div>
    )),

    reportChart: (p) => shell(p.report, "standard:report", <Chart type={p.chartType} />),
    dashboard: (p) => shell(p.dashboard, "standard:dashboard", (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <Kpi label="Open Pipeline" value="$1.2M" /><Kpi label="Closed Won" value="$320K" tone="var(--slds-g-color-success-1)" />
        <div style={{ gridColumn: "1 / -1" }}><Chart type="column" /></div>
      </div>
    )),
    metrics: (p) => <Metrics text={p.kpis} />,

    tabs: (p) => <TabBlock tabs={splitList(p.tabs)} variant={p.variant} kind="record" />,
    accordion: (p) => plain(<Accordion allowMultiple={!!p.multiple} defaultActive={[0]} sections={splitList(p.sections).map((s, i) => ({ id: i, label: s, content: fieldGrid(FIELDS.slice(i % 2 ? 4 : 0, i % 2 ? 8 : 4), 2) }))} />),
    card: (p) => shell(p.title, p.icon || "standard:report", <p style={{ fontSize: "var(--slds-g-text-body-regular)", color: "var(--slds-g-color-on-surface-2)" }}>Drop any content here — fields, charts, or a custom component.</p>),
    richText: (p) => <div style={{ background: "var(--slds-g-color-surface-container-1)", border: "1px solid var(--slds-g-color-border-1)", borderRadius: "var(--slds-g-radius-border-4)", padding: "1rem 1.125rem", fontSize: "var(--slds-g-text-body-regular)", color: "var(--slds-g-color-on-surface-2)", lineHeight: 1.5 }}>{p.content}</div>,

    map: (p) => shell("Location", "standard:address", (
      <div>
        <div style={{ height: 120, borderRadius: "var(--slds-g-radius-border-3)", background: "linear-gradient(135deg,#e8eef6,#dbe7f5)", position: "relative", overflow: "hidden", border: "1px solid var(--slds-g-color-border-1)" }}>
          <div style={{ position: "absolute", left: "50%", top: "46%", transform: "translate(-50%,-50%)" }}><Icon iconName="utility:location" size="medium" variant="error" /></div>
        </div>
        <div style={{ marginTop: "0.5rem", fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-2)" }}>{p.address}</div>
      </div>
    )),
    customLwc: (p) => (
      <div style={{ border: "1px dashed var(--slds-g-color-accent-1)", borderRadius: "var(--slds-g-radius-border-4)", background: "var(--slds-g-color-accent-container-1)", padding: "1.25rem", textAlign: "center" }}>
        <Icon iconName="utility:apex" size="small" variant="brand" />
        <div style={{ marginTop: "0.5rem", fontFamily: "var(--slds-g-font-family-mono)", fontSize: "var(--slds-g-text-body-regular)", color: "var(--slds-g-color-accent-2)" }}>&lt;{p.tag}&gt;</div>
        <div style={{ fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-3)" }}>{p.label} — custom Lightning Web Component</div>
      </div>
    ),
    visualforce: (p) => shell(p.page, "utility:page", <div style={{ height: Math.min(Number(p.height) || 320, 200), display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--slds-g-color-border-2)", borderRadius: "var(--slds-g-radius-border-2)", background: "var(--slds-g-color-surface-2)", color: "var(--slds-g-color-on-surface-3)", fontSize: "var(--slds-g-text-body-small)" }}>Visualforce: {p.page} ({p.height}px)</div>),
  };

  function Chart({ type }) {
    const vals = [40, 70, 55, 90, 100];
    if (type === "donut") {
      return <div style={{ display: "flex", justifyContent: "center", padding: "0.5rem 0" }}><div style={{ width: 110, height: 110, borderRadius: "50%", background: "conic-gradient(var(--slds-g-color-accent-1) 0 45%, #57a3fd 45% 70%, #aacbff 70% 88%, var(--slds-g-color-surface-3) 88% 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--slds-g-color-surface-container-1)" }} /></div></div>;
    }
    return (
      <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", height: 120, padding: "0.5rem 0" }}>
        {vals.map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: "100%", height: `${h}%`, background: "var(--slds-g-color-accent-1)", borderRadius: "var(--slds-g-radius-border-2) var(--slds-g-radius-border-2) 0 0", opacity: 0.45 + i * 0.12 }} />
            <span style={{ fontSize: 10, color: "var(--slds-g-color-on-surface-3)" }}>{PATH[i].split(" ")[0]}</span>
          </div>
        ))}
      </div>
    );
  }
  function Kpi({ label, value, tone }) {
    return <div style={{ padding: "0.75rem 0.875rem", border: "1px solid var(--slds-g-color-border-1)", borderRadius: "var(--slds-g-radius-border-3)", background: "var(--slds-g-color-surface-container-1)" }}><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--slds-g-color-on-surface-3)" }}>{label}</div><div style={{ fontSize: "var(--slds-g-text-heading-large)", fontWeight: "var(--slds-g-font-weight-bold)", color: tone || "var(--slds-g-color-on-surface-1)" }}>{value}</div></div>;
  }
  function Metrics({ text }) {
    const kpis = String(text || "").split("\n").map((l) => l.split(":")).filter((a) => a.length >= 2).map((a) => ({ label: a[0].trim(), value: a.slice(1).join(":").trim() }));
    return <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>{kpis.map((k, i) => <div key={i} style={{ flex: 1, minWidth: 130 }}><Kpi label={k.label} value={k.value} /></div>)}</div>;
  }
  function RelatedLists({ objects }) {
    const [tab, setTab] = React.useState(0);
    return (
      <div style={{ background: "var(--slds-g-color-surface-container-1)", border: "1px solid var(--slds-g-color-border-1)", borderRadius: "var(--slds-g-radius-border-4)", boxShadow: "var(--slds-g-shadow-2)", overflow: "hidden" }}>
        <div style={{ padding: "0 1.25rem" }}><Tabs value={tab} onChange={setTab} tabs={objects.map((o, i) => ({ label: o, value: i }))} /></div>
        <div style={{ padding: "1.25rem" }}><Datatable columns={oppCols(OPP_COLS)} rows={OPP_ROWS.slice(0, 3)} /></div>
      </div>
    );
  }
  function ListView({ p }) {
    return (
      <div style={{ background: "var(--slds-g-color-surface-container-1)", border: "1px solid var(--slds-g-color-border-1)", borderRadius: "var(--slds-g-radius-border-4)", boxShadow: "var(--slds-g-shadow-2)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem 1rem", borderBottom: "1px solid var(--slds-g-color-border-1)" }}>
          <Icon iconName="standard:contact" size="medium" />
          <div style={{ flex: 1 }}><div style={{ fontSize: "var(--slds-g-text-body-small)", color: "var(--slds-g-color-on-surface-3)" }}>{p.object}</div><div style={{ fontWeight: "var(--slds-g-font-weight-bold)", fontSize: "var(--slds-g-text-heading-small)" }}>{p.view}</div></div>
          <Button variant="neutral" label="Import" /><Button variant="brand" iconName="utility:new" label="New" />
        </div>
        <Datatable selectable columns={CONTACT_COLS} rows={CONTACT_ROWS.slice(0, Number(p.rows) || 5)} style={{ border: 0, borderRadius: 0, boxShadow: "none" }} />
      </div>
    );
  }
  function TabBlock({ tabs, variant, kind }) {
    const list = (tabs && tabs.length ? tabs : ["Details", "Related", "News"]);
    const [tab, setTab] = React.useState(0);
    let body;
    if (kind === "activities") body = <div style={{ color: "var(--slds-g-color-on-surface-2)", fontSize: "var(--slds-g-text-body-regular)" }}>{list[tab]} composer — subject, date, related to…</div>;
    else if (tab === 0) body = fieldGrid(FIELDS.slice(0, 6), 2);
    else if (tab === 1) body = <Datatable columns={oppCols(OPP_COLS)} rows={OPP_ROWS.slice(0, 3)} />;
    else body = <div style={{ color: "var(--slds-g-color-on-surface-3)", fontSize: "var(--slds-g-text-body-regular)" }}>No recent {list[tab].toLowerCase()}.</div>;
    return (
      <div style={{ background: "var(--slds-g-color-surface-container-1)", border: "1px solid var(--slds-g-color-border-1)", borderRadius: "var(--slds-g-radius-border-4)", boxShadow: "var(--slds-g-shadow-2)", overflow: "hidden" }}>
        <div style={{ padding: "0 1.25rem" }}><Tabs value={tab} onChange={setTab} tabs={list.map((l, i) => ({ label: l, value: i }))} /></div>
        <div style={{ padding: "1.25rem" }}>{body}</div>
      </div>
    );
  }

  window.CRMBRender = function (type, props) {
    const fn = R[type];
    return fn ? fn(props || {}) : <div style={{ padding: 12, color: "var(--slds-g-color-on-surface-3)" }}>Unknown: {type}</div>;
  };
})();
