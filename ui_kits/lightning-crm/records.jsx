/* Record screens — Contacts list, Contact detail, Opportunity board. */
const DSR = window.SalesforceSLDS2DesignSystem_2eee88;
function money2(n) { return '$' + n.toLocaleString(); }

/* ---------------- Contacts list view ---------------- */
function ContactsList({ onOpen, query }) {
  const { Button, ButtonIcon, Avatar, Icon, Checkbox } = DSR;
  let rows = window.CRM.contacts;
  if (query) {
    const q = query.toLowerCase();
    rows = rows.filter(c => (c.name + c.company + c.title + c.email).toLowerCase().includes(q));
  }
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '1.5rem' }}>
      {/* List header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem' }}>
        <Icon iconName="standard:contact" size="large" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-3)' }}>Contacts</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.375rem' }}>
            <h1 style={{ fontSize: 'var(--slds-g-text-heading-large)', margin: 0 }}>Recently Viewed</h1>
            <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--slds-g-color-on-surface-3)' }}>expand_more</span>
          </div>
        </div>
        <Button variant="neutral" label="Import" />
        <Button variant="brand" label="New" iconName="utility:new" />
      </div>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.5rem' }}>
        <span style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-3)', flex: 1 }}>{rows.length} items · sorted by Name · updated a few seconds ago</span>
        <ButtonIcon variant="border" iconName="utility:filterList" title="Filters" />
        <ButtonIcon variant="border" iconName="utility:settings" title="List settings" />
        <ButtonIcon variant="border" iconName="utility:refresh" title="Refresh" />
      </div>
      {/* Table */}
      <div style={{ background: 'var(--slds-g-color-surface-container-1)', border: '1px solid var(--slds-g-color-border-1)', borderRadius: 'var(--slds-g-radius-border-4)', boxShadow: 'var(--slds-g-shadow-2)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '36px 1.6fr 1.4fr 1.2fr 1.6fr 1.1fr 40px', gap: '.5rem', alignItems: 'center', padding: '.625rem 1rem', borderBottom: '1px solid var(--slds-g-color-border-1)', background: 'var(--slds-g-color-surface-1)', fontSize: 'var(--slds-g-text-body-small)', fontWeight: 'var(--slds-g-font-weight-bold)', textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--slds-g-color-on-surface-3)' }}>
          <Checkbox />
          <span>Name</span><span>Title</span><span>Company</span><span>Email</span><span>Phone</span><span></span>
        </div>
        {rows.map((c, i) => (
          <div key={c.id} onClick={() => onOpen(c.id)} style={{
            display: 'grid', gridTemplateColumns: '36px 1.6fr 1.4fr 1.2fr 1.6fr 1.1fr 40px', gap: '.5rem', alignItems: 'center',
            padding: '.625rem 1rem', cursor: 'pointer',
            borderBottom: i < rows.length - 1 ? '1px solid var(--slds-g-color-border-1)' : 0,
            fontSize: 'var(--slds-g-text-body-regular)',
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--slds-g-color-surface-1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            <Checkbox onClick={(e) => e.stopPropagation()} />
            <span style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <Avatar initials={c.initials} size="small" />
              <a style={{ color: 'var(--slds-g-color-accent-1)', fontWeight: 'var(--slds-g-font-weight-medium)' }}>{c.name}</a>
            </span>
            <span style={{ color: 'var(--slds-g-color-on-surface-2)' }}>{c.title}</span>
            <span>{c.company}</span>
            <span style={{ color: 'var(--slds-g-color-accent-1)' }}>{c.email}</span>
            <span style={{ color: 'var(--slds-g-color-on-surface-2)' }}>{c.phone}</span>
            <span onClick={(e) => e.stopPropagation()}><ButtonIcon variant="bare" iconName="utility:threedots_vertical" title="Actions" size="small" /></span>
          </div>
        ))}
        {rows.length === 0 && <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--slds-g-color-on-surface-3)' }}>No contacts match your search.</div>}
      </div>
    </div>
  );
}

/* ---------------- Contact detail (record home) ---------------- */
function ContactDetail({ id, onBack, onToast }) {
  const { Button, ButtonIcon, Avatar, Icon, Badge, Tabs, Card, Input } = DSR;
  const c = window.CRM.contacts.find(x => x.id === id) || window.CRM.contacts[0];
  const [tab, setTab] = React.useState('details');
  const [following, setFollowing] = React.useState(false);

  const field = (label, value, opts = {}) => (
    <div style={{ marginBottom: '.875rem' }}>
      <div style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-3)', marginBottom: '.125rem' }}>{label}</div>
      <div style={{ fontSize: 'var(--slds-g-text-body-regular)', color: opts.link ? 'var(--slds-g-color-accent-1)' : 'var(--slds-g-color-on-surface-1)' }}>{value}</div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '1.5rem' }}>
      {/* breadcrumb */}
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '.25rem', background: 'transparent', border: 0, cursor: 'pointer', color: 'var(--slds-g-color-accent-1)', fontSize: 'var(--slds-g-text-body-small)', padding: 0, marginBottom: '.75rem' }}>
        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>chevron_left</span> Contacts
      </button>

      {/* Page header */}
      <div style={{ background: 'var(--slds-g-color-surface-container-1)', border: '1px solid var(--slds-g-color-border-1)', borderRadius: 'var(--slds-g-radius-border-4)', boxShadow: 'var(--slds-g-shadow-2)', padding: '1.125rem 1.25rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.875rem' }}>
          <Icon iconName="standard:contact" size="large" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-3)' }}>Contact</div>
            <h1 style={{ fontSize: 'var(--slds-g-text-heading-large)', margin: '.0625rem 0' }}>{c.name}</h1>
            <div style={{ color: 'var(--slds-g-color-on-surface-2)' }}>{c.title} · {c.company}</div>
          </div>
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <Button variant="neutral" iconName={following ? 'utility:check' : 'utility:add'} label={following ? 'Following' : 'Follow'} onClick={() => setFollowing(f => !f)} />
            <Button variant="neutral" label="Edit" onClick={onToast} />
            <Button variant="neutral" label="Delete" />
            <ButtonIcon variant="border" iconName="utility:chevrondown" title="More actions" />
          </div>
        </div>
        {/* highlights */}
        <div style={{ display: 'flex', gap: '2.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--slds-g-color-border-1)' }}>
          {field('Title', c.title)}{field('Phone', c.phone)}{field('Email', c.email, { link: true })}{field('Company', c.company, { link: true })}
        </div>
      </div>

      {/* Body: tabs + details / activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '1.25rem', alignItems: 'start' }}>
        <div>
          <div style={{ background: 'var(--slds-g-color-surface-container-1)', border: '1px solid var(--slds-g-color-border-1)', borderRadius: 'var(--slds-g-radius-border-4)', boxShadow: 'var(--slds-g-shadow-2)', overflow: 'hidden' }}>
            <div style={{ padding: '0 1.25rem' }}>
              <Tabs value={tab} onChange={setTab} tabs={[
                { label: 'Details', value: 'details' }, { label: 'Related', value: 'related' }, { label: 'News', value: 'news' },
              ]} />
            </div>
            <div style={{ padding: '1.25rem' }}>
              {tab === 'details' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '2rem' }}>
                  {field('Name', c.name)}{field('Mobile', c.mobile)}
                  {field('Title', c.title)}{field('Email', c.email, { link: true })}
                  {field('Account Name', c.company, { link: true })}{field('Mailing Address', c.city)}
                  {field('Department', 'Sales')}{field('Lead Source', 'Web')}
                </div>
              )}
              {tab === 'related' && (
                <div style={{ color: 'var(--slds-g-color-on-surface-2)', fontSize: 'var(--slds-g-text-body-regular)' }}>
                  <strong>Opportunities (2)</strong> · Cases (1) · Files (4) · Notes (3)
                </div>
              )}
              {tab === 'news' && <div style={{ color: 'var(--slds-g-color-on-surface-3)' }}>No recent news for {c.company}.</div>}
            </div>
          </div>
        </div>

        {/* Activity timeline */}
        <Card title="Activity" iconName="standard:task"
          actions={<Button variant="neutral" size="small" label="Log a Call" onClick={onToast} />}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {window.CRM.activity.map((a) => (
              <div key={a.id} style={{ display: 'flex', gap: '.625rem' }}>
                <Icon iconName={a.icon} size="small" variant="brand" />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '.5rem' }}>
                    <strong style={{ fontSize: 'var(--slds-g-text-body-regular)' }}>{a.subject}</strong>
                    <span style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-3)', whiteSpace: 'nowrap' }}>{a.date}</span>
                  </div>
                  <div style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-2)' }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- Opportunity board (kanban) ---------------- */
function OpportunityBoard({ onToast }) {
  const { Badge, Avatar, ButtonIcon, Button, Icon } = DSR;
  const C = window.CRM;
  return (
    <div style={{ maxWidth: 1320, margin: '0 auto', padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem' }}>
        <Icon iconName="standard:opportunity" size="large" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-3)' }}>Opportunities</div>
          <h1 style={{ fontSize: 'var(--slds-g-text-heading-large)', margin: 0 }}>All Opportunities</h1>
        </div>
        <Button variant="neutral" iconName="utility:list" label="Table" />
        <Button variant="brand" iconName="utility:new" label="New" onClick={onToast} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${C.stages.length}, minmax(200px, 1fr))`, gap: '.75rem', overflowX: 'auto' }}>
        {C.stages.map((stage) => {
          const cards = C.opportunities.filter(o => o.stage === stage);
          const total = cards.reduce((s, o) => s + o.amount, 0);
          return (
            <div key={stage} style={{ background: 'var(--slds-g-color-surface-1)', borderRadius: 'var(--slds-g-radius-border-4)', padding: '.625rem', minHeight: 200 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '.625rem', padding: '0 .25rem' }}>
                <span style={{ fontSize: 'var(--slds-g-text-body-small)', fontWeight: 'var(--slds-g-font-weight-bold)', textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--slds-g-color-on-surface-2)' }}>{stage}</span>
                <span style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-3)' }}>{money2(total)}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                {cards.map((o) => (
                  <div key={o.id} style={{ background: 'var(--slds-g-color-surface-container-1)', border: '1px solid var(--slds-g-color-border-1)', borderRadius: 'var(--slds-g-radius-border-3)', boxShadow: 'var(--slds-g-shadow-1)', padding: '.75rem' }}>
                    <div style={{ fontSize: 'var(--slds-g-text-body-regular)', fontWeight: 'var(--slds-g-font-weight-semibold)', color: 'var(--slds-g-color-accent-1)', marginBottom: '.25rem' }}>{o.name}</div>
                    <div style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-3)', marginBottom: '.5rem' }}>{o.account}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'var(--slds-g-font-weight-bold)' }}>{money2(o.amount)}</span>
                      <Avatar initials={o.owner} size="x-small" />
                    </div>
                    <div style={{ marginTop: '.5rem' }}>
                      {o.stage === 'Closed Won'
                        ? <Badge variant="success" label="Won" />
                        : <Badge variant="brand" label={o.prob + '%'} />}
                      <span style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-3)', marginLeft: '.5rem' }}>{o.close}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { ContactsList, ContactDetail, OpportunityBoard });
