/* Home dashboard screen. */
const DSH = window.SalesforceSLDS2DesignSystem_2eee88;

function money(n) { return '$' + n.toLocaleString(); }

function KpiTile({ label, value, sub, tone }) {
  return (
    <div style={{
      flex: 1, minWidth: 150, padding: '1rem 1.125rem',
      background: 'var(--slds-g-color-surface-container-1)',
      border: '1px solid var(--slds-g-color-border-1)',
      borderRadius: 'var(--slds-g-radius-border-4)',
      boxShadow: 'var(--slds-g-shadow-1)',
    }}>
      <div style={{ fontSize: 'var(--slds-g-text-body-small)', fontWeight: 'var(--slds-g-font-weight-bold)', letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--slds-g-color-on-surface-3)' }}>{label}</div>
      <div style={{ fontSize: 'var(--slds-g-text-display-medium)', fontWeight: 'var(--slds-g-font-weight-bold)', letterSpacing: '-.01em', margin: '.25rem 0 .125rem', color: tone || 'var(--slds-g-color-on-surface-1)' }}>{value}</div>
      <div style={{ fontSize: 'var(--slds-g-text-body-small)', color: 'var(--slds-g-color-on-surface-3)' }}>{sub}</div>
    </div>
  );
}

function HomeDashboard({ onNavigate }) {
  const { Card, Badge, Button, Avatar, Icon, Checkbox } = DSH;
  const C = window.CRM;
  const open = C.opportunities.filter(o => o.stage !== 'Closed Won');
  const pipeline = open.reduce((s, o) => s + o.amount, 0);
  const won = C.opportunities.filter(o => o.stage === 'Closed Won').reduce((s, o) => s + o.amount, 0);

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '1.5rem' }}>
      {/* Greeting */}
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

      {/* KPIs */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <KpiTile label="Open Pipeline" value={money(pipeline)} sub={open.length + ' open opportunities'} />
        <KpiTile label="Closed Won (QTD)" value={money(won)} sub="+18% vs. last quarter" tone="var(--slds-g-color-success-1)" />
        <KpiTile label="Quota Attainment" value="68%" sub="$1.36M of $2.0M" tone="var(--slds-g-color-accent-1)" />
        <KpiTile label="Win Rate" value="42%" sub="Trailing 90 days" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.25rem', alignItems: 'start' }}>
        {/* Opportunities */}
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

        {/* Today's tasks */}
        <Card title="Today's Tasks" iconName="standard:task"
          actions={<Badge variant="brand" label={C.tasks.filter(t => !t.done).length + ' open'} />}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
            {C.tasks.map((t) => (
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

Object.assign(window, { HomeDashboard });
