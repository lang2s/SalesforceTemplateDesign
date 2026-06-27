/* Lightning CRM sample data — exposed as window.CRM for the UI kit.
   Mirrors the starter-kit contact fixtures, plus opportunities & tasks. */
(function () {
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
    { id: 'a1', type: 'call', icon: 'utility:call', subject: 'Logged a call', desc: 'Discussed Q3 renewal scope and pricing.', date: '2h ago' },
    { id: 'a2', type: 'email', icon: 'utility:email', subject: 'Email: Proposal v2', desc: 'Sent updated proposal with revised terms.', date: 'Yesterday' },
    { id: 'a3', type: 'event', icon: 'utility:event', subject: 'Discovery meeting', desc: 'Reviewed current platform usage and goals.', date: 'Jun 20' },
    { id: 'a4', type: 'task', icon: 'utility:task', subject: 'Created task', desc: 'Prepare ROI summary for exec review.', date: 'Jun 18' },
  ];

  window.CRM = { contacts, opportunities, tasks, activity, stages };
})();
