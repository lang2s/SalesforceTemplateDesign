/* Lightning CRM (Sales Cloud) — self-contained template app.
   Single-file React component mounted by LightningCrm.dc.html via
   <x-import from="./LightningCrmApp.jsx">. Uses this design system's
   components from window.<Namespace> and the global tokens. */
const NS = 'SalesforceSLDS2DesignSystem_2eee88';
const money = (n) => '$' + n.toLocaleString();

/* ---------------- sample data ---------------- */
const CRM = (() => {
  const contacts = [
    { id: '1', name: 'Lando Voss', title: 'VP Sales', company: 'Global Media', email: 'lvoss@globalmedia.com', phone: '(415) 555-1212', mobile: '(415) 555-1300', city: 'San Francisco, CA', initials: 'LV' },
    { id: '2', name: 'Carlos Piquet', title: 'President and CEO', company: 'Acme', email: 'cpiquet@acme.com', phone: '(212) 555-5555', mobile: '(212) 555-5600', city: 'New York, NY', initials: 'CP' },
    { id: '3', name: 'Lewis Mansell', title: 'President', company: 'Global Media', email: 'lmansell@globalmedia.com', phone: '(415) 555-1212', mobile: '(415) 555-1400', city: 'San Francisco, CA', initials: 'LM' },
    { id: '4', name: 'Max Alonso', title: 'Buyer', company: 'Acme', email: 'malonso@acme.com', phone: '(212) 555-5555', mobile: '(212) 555-5700', city: 'New York, NY', initials: 'MA' },
    { id: '5', name: 'Oscar Lauda', title: 'Sales Manager', company: 'Global Media', email: 'olauda@globalmedia.com', phone: '(905) 555-1212', mobile: '(905) 555-1300', city: 'Toronto, ON', initials: 'OL' },
    { id: '6', name: 'Kimi Leclerc', title: 'VP Customer Support', company: 'Acme', email: 'kleclerc@acme.com', phone: '(212) 555-5555', mobile: '(212) 555-5800', city: 'New York, NY', initials: 'KL' },
    { id: '7', name: 'Ayrton Prost', title: 'Executive Officer', company: 'Pinnacle Corp', email: 'aprost@pinnaclecorp.com', phone: '(415) 555-7000', mobile: '(415) 555-7100', city: 'San Francisco, CA', initials: 'AP' },
  ];
  const stages = ['Qualification', 'Needs Analysis', 'Proposal', 'Negotiation', 'Closed Won'];
  const opportunities = [
    { id: 'o1', name: 'Global Media — Platform Renewal', account: 'Global Media', amount: 240000, stage: 'Negotiation', close: 'Aug 30, 2026', owner: 'AG', prob: 75 },
    { id: 'o2', name: 'Acme — Enterprise Expansion', account: 'Acme', amount: 410000, stage: 'Proposal', close: 'Sep 15, 2026', owner: 'AG', prob: 60 },
    { id: 'o3', name: 'Pinnacle — Service Cloud', account: 'Pinnacle Corp', amount: 88000, stage: 'Qualification', close: 'Oct 02, 2026', owner: 'OL', prob: 20 },
    { id: 'o4', name: 'Acme — Data Cloud Pilot', account: 'Acme', amount: 125000, stage: 'Needs Analysis', close: 'Sep 28, 2026', owner: 'KL', prob: 35 },
    { id: 'o5', name: 'Global Media — Agentforce', account: 'Global Media', amount: 320000, stage: 'Closed Won', close: 'Jun 10, 2026', owner: 'AG', prob: 100 },
    { id: 'o6', name: 'Pinnacle — Marketing Cloud', account: 'Pinnacle Corp', amount: 156000, stage: 'Negotiation', close: 'Aug 12, 2026', owner: 'OL', prob: 80 },
  ];
  const tasks = [
    { id: 't1', subject: 'Call Lando about renewal terms', due: 'Today', who: 'Lando Voss', done: false, priority: 'High' },
    { id: 't2', subject: 'Send proposal to Acme procurement', due: 'Today', who: 'Max Alonso', done: false, priority: 'High' },
    { id: 't3', subject: 'Schedule Agentforce demo', due: 'Tomorrow', who: 'Lewis Mansell', done: false, priority: 'Medium' },
    { id: 't4', subject: 'Follow up on Pinnacle pilot', due: 'Jun 27', who: 'Ayrton Prost', done: true, priority: 'Low' },
  ];
  const activity = [
    { id: 'a1', icon: 'utility:call', subject: 'Logged a call', desc: 'Discussed Q3 renewal scope and pricing.', date: '2h ago' },
    { id: 'a2', icon: 'utility:email', subject: 'Email: Proposal v2', desc: 'Sent updated proposal with revised terms.', date: 'Yesterday' },
    { id: 'a3', icon: 'utility:event', subject: 'Discovery meeting', desc: 'Reviewed current platform usage and goals.', date: 'Jun 20' },
    { id: 'a4', icon: 'utility:task', subject: 'Created task', desc: 'Prepare ROI summary for exec review.', date: 'Jun 18' },
  ];
  return { contacts, opportunities, tasks, activity, stages };
})();

/* ---------------- app shell ---------------- */
function GlobalHeader({ onSearch, onToast }) {
  const { ButtonIcon, Avatar } = window[NS];
  return (
    <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '3.25rem', padding: '0 1rem', background: 'var(--slds-g-color-surface-container-1)', borderBottom: '1px solid var(--slds-g-color-border-1)', flex: 'none' }}>
      <img src="../../assets/salesforce-cloud.svg" alt="Salesforce" style={{ height: 26 }} />
      <div style={{ flex: 1, maxWidth: 520, margin: '0 auto', position: 'relative' }}>
        <span className="material-symbols-rounded" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: 'var(--slds-g-color-on-surface-3)', pointerEvents: 'none' }}>search</span>
        <input placeholder="Search Salesforce..." onChange={(e) => onSearch && onSearch(e.target.value)}
          style={{ width: '100%', height: '2rem', padding: '0 0.75rem 0 2.25rem', font: 'inherit', fontSize: 'var(--slds-g-text-body-regular)', color: 'var(--slds-g-color-on-surface-1)', background: 'var(--slds-g-color-surface-1)', border: '1px solid var(--slds-g-color-border-2)', borderRadius: 'var(--slds-g-radius-border-pill)', outline: 'none' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ButtonIcon variant="bare" iconName="utility:agent_astro" title="Agentforce" size="large" onClick={() => onToast && onToast()} />
        <ButtonIcon variant="bare" iconName="utility:favorite" title="Favorites" size="large" />
        <ButtonIcon variant="bare" iconName="utility:new" title="Global Actions" size="large" />
        <ButtonIcon variant="bare" iconName="utility:help" title="Help" size="large" />
        <ButtonIcon variant="bare" iconName="utility:settings" title="Setup" size="large" />
        <ButtonIcon variant="bare" iconName="utility:notification" title="Notifications" size="large" />
        <Avatar initials="AG" size="medium" alt="Austin Guevara" />
      </div>
    </header>
  );
}

function AppNav({ current, onNavigate }) {
  const tabs = [
    { id: 'home', label: 'Home' }, { id: 'opportunities', label: 'Opportunities' }, { id: 'contacts', label: 'Contacts' },
    { id: 'accounts', label: 'Accounts' }, { id: 'reports', label: 'Reports' }, { id: 'dashboards', label: 'Dashboards' },
  ];
  return (
    <nav style={{ display: 'flex', alignItems: 'stretch', gap: '0.25rem', padding: '0 1rem', height: '2.75rem', background: 'var(--slds-g-color-surface-container-1)', borderBottom: '1px solid var(--slds-g-color-border-1)', boxShadow: 'var(--slds-g-shadow-1)', flex: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingRight: '1rem', marginRight: '0.5rem', borderRight: '1px solid var(--slds-g-color-border-1)' }}>
        <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--slds-g-color-on-surface-2)' }}>apps</span>
        <span style={{ fontWeight: 'var(--slds-g-font-weight-bold)', fontSize: 'var(--slds-g-text-heading-small)' }}>Sales</span>
        <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--slds-g-color-on-surface-3)' }}>expand_more</span>
      </div>
      {tabs.map((t) => {
        const on = current === t.id || (current === 'contactDetail' && t.id === 'contacts');
        return (
          <button key={t.id} onClick={() => onNavigate(t.id)} style={{ position: 'relative', padding: '0 0.875rem', font: 'inherit', fontSize: 'var(--slds-g-text-body-regular)', fontWeight: on ? 'var(--slds-g-font-weight-bold)' : 'var(--slds-g-font-weight-regular)', color: on ? 'var(--slds-g-color-accent-1)' : 'var(--slds-g-color-on-surface-1)', background: 'transparent', border: 0, borderBottom: `3px solid ${on ? 'var(--slds-g-color-accent-1)' : 'transparent'}`, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color var(--slds-g-duration-quickly) var(--slds-g-ease-out)' }}>
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}

/* ---------------- home ---------------- */
function KpiTile({ label, value, sub, tone }) {
  return (
    <div style={{ flex: 1, minWidth: 150, padding: '1rem 1.125rem', background: 'var(--slds-g-color-surface-container-1)', border: '1px solid var(--slds-g-color-border-1)', borderRadius: 'var(--slds-g-radius-border-4)', boxShadow: 'var(--slds-g-shadow-1)' }}>
      <div style={{ fontSize: 'var(--slds-g-text-body-small)', fontWeight: 'var(--slds-g-font-weight-bold)', letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--slds-g-color-on-surface-3)' }}>{label}</div>
      <div style={{ fontSize: 'var(--slds-g-text-display-medium)', fontWeight: 'var(--slds-g-font-weight-bold)', letterSpacing: '-.01em', margin: '.25rem 0 .125rem', color: tone || 'var(--slds-g-color-on-surface-1)' }}>{value}</div>
      <div style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-3)' }}>{sub}</div>
    </div>
  );
}

function HomeDashboard({ onNavigate }) {
  const { Card, Badge, Button, Avatar, Checkbox } = window[NS];
  const open = CRM.opportunities.filter(o => o.stage !== 'Closed Won');
  const pipeline = open.reduce((s, o) => s + o.amount, 0);
  const won = CRM.opportunities.filter(o => o.stage === 'Closed Won').reduce((s, o) => s + o.amount, 0);
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
        <Avatar initials="AG" size="x-large" />
        <div>
          <div style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-3)' }}>Tuesday, June 25, 2026</div>
          <h1 style={{ fontSize: 'var(--slds-g-text-heading-x-large)', margin: 0 }}>Good morning, Austin</h1>
        </div>
        <div style={{ flex: 1 }} />
        <Button variant="outline-brand" iconName="utility:event" label="Calendar" />
        <Button variant="brand" iconName="utility:new" label="New Opportunity" />
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <KpiTile label="Open Pipeline" value={money(pipeline)} sub={open.length + ' open opportunities'} />
        <KpiTile label="Closed Won (QTD)" value={money(won)} sub="+18% vs. last quarter" tone="var(--slds-g-color-success-1)" />
        <KpiTile label="Quota Attainment" value="68%" sub="$1.36M of $2.0M" tone="var(--slds-g-color-accent-1)" />
        <KpiTile label="Win Rate" value="42%" sub="Trailing 90 days" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.25rem', alignItems: 'start' }}>
        <Card title="My Open Opportunities" iconName="standard:opportunity"
          actions={<Button variant="text" size="small" label="View All" onClick={() => onNavigate('opportunities')} />}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2.4fr 1fr 1.1fr 0.8fr', gap: '.5rem', padding: '.5rem 0', borderBottom: '1px solid var(--slds-g-color-border-1)', fontSize: 'var(--slds-g-text-body-small)', fontWeight: 'var(--slds-g-font-weight-bold)', color: 'var(--slds-g-color-on-surface-3)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
              <span>Opportunity</span><span>Amount</span><span>Stage</span><span style={{ textAlign: 'right' }}>Close</span>
            </div>
            {open.slice(0, 5).map((o) => (
              <div key={o.id} style={{ display: 'grid', gridTemplateColumns: '2.4fr 1fr 1.1fr 0.8fr', gap: '.5rem', padding: '.625rem 0', borderBottom: '1px solid var(--slds-g-color-border-1)', alignItems: 'center', fontSize: 'var(--slds-g-text-body-regular)' }}>
                <a style={{ color: 'var(--slds-g-color-accent-1)', fontWeight: 'var(--slds-g-font-weight-medium)', cursor: 'pointer' }}>{o.name}</a>
                <span style={{ fontWeight: 'var(--slds-g-font-weight-semibold)' }}>{money(o.amount)}</span>
                <span><Badge variant="brand" label={o.stage} /></span>
                <span style={{ textAlign: 'right', color: 'var(--slds-g-color-on-surface-2)' }}>{o.close}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Today's Tasks" iconName="standard:task"
          actions={<Badge variant="brand" label={CRM.tasks.filter(t => !t.done).length + ' open'} />}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
            {CRM.tasks.map((t) => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '.625rem' }}>
                <Checkbox defaultChecked={t.done} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--slds-g-text-body-regular)', textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'var(--slds-g-color-on-surface-3)' : 'var(--slds-g-color-on-surface-1)' }}>{t.subject}</div>
                  <div style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-3)' }}>{t.who} · Due {t.due}</div>
                </div>
                {t.priority === 'High' && !t.done && <Badge variant="error" label="High" />}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- contacts list ---------------- */
function ContactsList({ onOpen, query }) {
  const { Button, ButtonIcon, Avatar, Icon, Checkbox } = window[NS];
  let rows = CRM.contacts;
  if (query) { const q = query.toLowerCase(); rows = rows.filter(c => (c.name + c.company + c.title + c.email).toLowerCase().includes(q)); }
  const cols = '36px 1.6fr 1.4fr 1.2fr 1.6fr 1.1fr 40px';
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '1.5rem' }}>
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.5rem' }}>
        <span style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-3)', flex: 1 }}>{rows.length} items · sorted by Name · updated a few seconds ago</span>
        <ButtonIcon variant="border" iconName="utility:filterList" title="Filters" />
        <ButtonIcon variant="border" iconName="utility:settings" title="List settings" />
        <ButtonIcon variant="border" iconName="utility:refresh" title="Refresh" />
      </div>
      <div style={{ background: 'var(--slds-g-color-surface-container-1)', border: '1px solid var(--slds-g-color-border-1)', borderRadius: 'var(--slds-g-radius-border-4)', boxShadow: 'var(--slds-g-shadow-2)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '.5rem', alignItems: 'center', padding: '.625rem 1rem', borderBottom: '1px solid var(--slds-g-color-border-1)', background: 'var(--slds-g-color-surface-1)', fontSize: 'var(--slds-g-text-body-small)', fontWeight: 'var(--slds-g-font-weight-bold)', textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--slds-g-color-on-surface-3)' }}>
          <Checkbox /><span>Name</span><span>Title</span><span>Company</span><span>Email</span><span>Phone</span><span></span>
        </div>
        {rows.map((c, i) => (
          <div key={c.id} onClick={() => onOpen(c.id)} style={{ display: 'grid', gridTemplateColumns: cols, gap: '.5rem', alignItems: 'center', padding: '.625rem 1rem', cursor: 'pointer', borderBottom: i < rows.length - 1 ? '1px solid var(--slds-g-color-border-1)' : 0, fontSize: 'var(--slds-g-text-body-regular)' }}
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

/* ---------------- contact detail ---------------- */
function ContactDetail({ id, onBack, onToast }) {
  const { Button, ButtonIcon, Icon, Tabs, Card } = window[NS];
  const c = CRM.contacts.find(x => x.id === id) || CRM.contacts[0];
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
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '.25rem', background: 'transparent', border: 0, cursor: 'pointer', color: 'var(--slds-g-color-accent-1)', fontSize: 'var(--slds-g-text-body-small)', padding: 0, marginBottom: '.75rem' }}>
        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>chevron_left</span> Contacts
      </button>
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
        <div style={{ display: 'flex', gap: '2.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--slds-g-color-border-1)' }}>
          {field('Title', c.title)}{field('Phone', c.phone)}{field('Email', c.email, { link: true })}{field('Company', c.company, { link: true })}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '1.25rem', alignItems: 'start' }}>
        <div style={{ background: 'var(--slds-g-color-surface-container-1)', border: '1px solid var(--slds-g-color-border-1)', borderRadius: 'var(--slds-g-radius-border-4)', boxShadow: 'var(--slds-g-shadow-2)', overflow: 'hidden' }}>
          <div style={{ padding: '0 1.25rem' }}>
            <Tabs value={tab} onChange={setTab} tabs={[{ label: 'Details', value: 'details' }, { label: 'Related', value: 'related' }, { label: 'News', value: 'news' }]} />
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
            {tab === 'related' && <div style={{ color: 'var(--slds-g-color-on-surface-2)', fontSize: 'var(--slds-g-text-body-regular)' }}><strong>Opportunities (2)</strong> · Cases (1) · Files (4) · Notes (3)</div>}
            {tab === 'news' && <div style={{ color: 'var(--slds-g-color-on-surface-3)' }}>No recent news for {c.company}.</div>}
          </div>
        </div>
        <Card title="Activity" iconName="standard:task" actions={<Button variant="neutral" size="small" label="Log a Call" onClick={onToast} />}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {CRM.activity.map((a) => (
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

/* ---------------- opportunity board ---------------- */
function OpportunityBoard({ onToast }) {
  const { Badge, Avatar, Button, Icon } = window[NS];
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
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${CRM.stages.length}, minmax(200px, 1fr))`, gap: '.75rem', overflowX: 'auto' }}>
        {CRM.stages.map((stage) => {
          const cards = CRM.opportunities.filter(o => o.stage === stage);
          const total = cards.reduce((s, o) => s + o.amount, 0);
          return (
            <div key={stage} style={{ background: 'var(--slds-g-color-surface-1)', borderRadius: 'var(--slds-g-radius-border-4)', padding: '.625rem', minHeight: 200 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '.625rem', padding: '0 .25rem' }}>
                <span style={{ fontSize: 'var(--slds-g-text-body-small)', fontWeight: 'var(--slds-g-font-weight-bold)', textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--slds-g-color-on-surface-2)' }}>{stage}</span>
                <span style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-3)' }}>{money(total)}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                {cards.map((o) => (
                  <div key={o.id} style={{ background: 'var(--slds-g-color-surface-container-1)', border: '1px solid var(--slds-g-color-border-1)', borderRadius: 'var(--slds-g-radius-border-3)', boxShadow: 'var(--slds-g-shadow-1)', padding: '.75rem' }}>
                    <div style={{ fontSize: 'var(--slds-g-text-body-regular)', fontWeight: 'var(--slds-g-font-weight-semibold)', color: 'var(--slds-g-color-accent-1)', marginBottom: '.25rem' }}>{o.name}</div>
                    <div style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-3)', marginBottom: '.5rem' }}>{o.account}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'var(--slds-g-font-weight-bold)' }}>{money(o.amount)}</span>
                      <Avatar initials={o.owner} size="x-small" />
                    </div>
                    <div style={{ marginTop: '.5rem' }}>
                      {o.stage === 'Closed Won' ? <Badge variant="success" label="Won" /> : <Badge variant="brand" label={o.prob + '%'} />}
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

function Placeholder({ label }) {
  const { Icon } = window[NS];
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '4rem 1.5rem', textAlign: 'center', color: 'var(--slds-g-color-on-surface-3)' }}>
      <Icon iconName="standard:dashboard" size="large" />
      <h1 style={{ fontSize: 'var(--slds-g-text-heading-large)', marginTop: '1rem', color: 'var(--slds-g-color-on-surface-2)' }}>{label}</h1>
      <p style={{ marginTop: '.5rem' }}>This view isn't part of the kit demo — explore Home, Opportunities and Contacts.</p>
    </div>
  );
}

/* ---------------- root ---------------- */
function LightningCrmApp() {
  const KEY = 'slds2-crm-view';
  // ALL hooks run unconditionally, in the same order, on every render.
  const [, force] = React.useState(0);
  const [view, setView] = React.useState(() => { try { return localStorage.getItem(KEY) || 'home'; } catch (e) { return 'home'; } });
  const [contactId, setContactId] = React.useState('1');
  const [query, setQuery] = React.useState('');
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => { try { localStorage.setItem(KEY, view); } catch (e) {} }, [view]);
  // Poll until the design-system bundle (loaded async via ds-base.js) is ready.
  React.useEffect(() => {
    if (window[NS] && window[NS].Toast) return;
    const id = setInterval(() => { if (window[NS] && window[NS].Toast) { clearInterval(id); force((n) => n + 1); } }, 50);
    return () => clearInterval(id);
  }, []);
  // Readiness gate — AFTER all hooks, so hook order never changes.
  if (!window[NS] || !window[NS].Toast) return null;
  const { Toast } = window[NS];

  const fireToast = (msg) => {
    setToast(msg || { variant: 'success', title: 'Agentforce', message: 'Ask Agentforce is not wired up in this demo.' });
    clearTimeout(window.__crmToast);
    window.__crmToast = setTimeout(() => setToast(null), 3200);
  };
  const navigate = (v) => { setView(v); window.scrollTo && window.scrollTo(0, 0); };
  const openContact = (id) => { setContactId(id); navigate('contactDetail'); };

  let screen;
  if (view === 'home') screen = <HomeDashboard onNavigate={navigate} />;
  else if (view === 'opportunities') screen = <OpportunityBoard onToast={() => fireToast({ variant: 'success', title: 'Saved', message: 'New opportunity created.' })} />;
  else if (view === 'contacts') screen = <ContactsList onOpen={openContact} query={query} />;
  else if (view === 'contactDetail') screen = <ContactDetail id={contactId} onBack={() => navigate('contacts')} onToast={() => fireToast({ variant: 'success', title: 'Saved', message: 'Your changes were saved.' })} />;
  else screen = <Placeholder label={view.charAt(0).toUpperCase() + view.slice(1)} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 720, background: 'var(--slds-g-color-surface-1)' }}>
      <GlobalHeader onSearch={(q) => { setQuery(q); if (q && view !== 'contacts') navigate('contacts'); }} onToast={() => fireToast()} />
      <AppNav current={view} onNavigate={navigate} />
      <div style={{ flex: 1, overflowY: 'auto', background: 'var(--slds-g-color-surface-1)' }}>{screen}</div>
      {toast && (
        <div style={{ position: 'fixed', top: '1rem', left: '50%', transform: 'translateX(-50%)', zIndex: 50 }}>
          <Toast variant={toast.variant} title={toast.title} message={toast.message} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
}

window.LightningCrmApp = LightningCrmApp;
if (typeof module !== 'undefined') module.exports = { LightningCrmApp };
