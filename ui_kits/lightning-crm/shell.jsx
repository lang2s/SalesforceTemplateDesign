/* Lightning Experience app shell — global header + app navigation bar.
   Recreates the starter-kit shell/globalHeader + ui/globalNavigation. */
const DS = window.SalesforceSLDS2DesignSystem_2eee88;

function GlobalHeader({ onSearch, onToast }) {
  const { Icon, ButtonIcon, Avatar } = DS;
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: '1rem',
      height: '3.25rem', padding: '0 1rem',
      background: 'var(--slds-g-color-surface-container-1)',
      borderBottom: '1px solid var(--slds-g-color-border-1)',
      flex: 'none',
    }}>
      <img src="../../assets/salesforce-cloud.svg" alt="Salesforce" style={{ height: 26 }} />
      <div style={{ flex: 1, maxWidth: 520, margin: '0 auto', position: 'relative' }}>
        <span className="material-symbols-rounded" style={{
          position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
          fontSize: 18, color: 'var(--slds-g-color-on-surface-3)', pointerEvents: 'none',
        }}>search</span>
        <input
          placeholder="Search Salesforce..."
          onChange={(e) => onSearch && onSearch(e.target.value)}
          style={{
            width: '100%', height: '2rem', padding: '0 0.75rem 0 2.25rem',
            font: 'inherit', fontSize: 'var(--slds-g-text-body-regular)',
            color: 'var(--slds-g-color-on-surface-1)',
            background: 'var(--slds-g-color-surface-1)',
            border: '1px solid var(--slds-g-color-border-2)',
            borderRadius: 'var(--slds-g-radius-border-pill)', outline: 'none',
          }}
        />
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
  const { Icon } = DS;
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'accounts', label: 'Accounts' },
    { id: 'reports', label: 'Reports' },
    { id: 'dashboards', label: 'Dashboards' },
  ];
  return (
    <nav style={{
      display: 'flex', alignItems: 'stretch', gap: '0.25rem',
      padding: '0 1rem', height: '2.75rem',
      background: 'var(--slds-g-color-surface-container-1)',
      borderBottom: '1px solid var(--slds-g-color-border-1)',
      boxShadow: 'var(--slds-g-shadow-1)', flex: 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingRight: '1rem', marginRight: '0.5rem', borderRight: '1px solid var(--slds-g-color-border-1)' }}>
        <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--slds-g-color-on-surface-2)' }}>apps</span>
        <span style={{ fontWeight: 'var(--slds-g-font-weight-bold)', fontSize: 'var(--slds-g-text-heading-small)' }}>Sales</span>
        <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--slds-g-color-on-surface-3)' }}>expand_more</span>
      </div>
      {tabs.map((t) => {
        const on = current === t.id || (current === 'contactDetail' && t.id === 'contacts');
        return (
          <button key={t.id} onClick={() => onNavigate(t.id)} style={{
            position: 'relative', padding: '0 0.875rem', font: 'inherit',
            fontSize: 'var(--slds-g-text-body-regular)',
            fontWeight: on ? 'var(--slds-g-font-weight-bold)' : 'var(--slds-g-font-weight-regular)',
            color: on ? 'var(--slds-g-color-accent-1)' : 'var(--slds-g-color-on-surface-1)',
            background: 'transparent', border: 0,
            borderBottom: `3px solid ${on ? 'var(--slds-g-color-accent-1)' : 'transparent'}`,
            cursor: 'pointer', whiteSpace: 'nowrap',
            transition: 'color var(--slds-g-duration-quickly) var(--slds-g-ease-out)',
          }}>
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}

Object.assign(window, { GlobalHeader, AppNav });
