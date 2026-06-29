/* Email Template Builder — catalog: blocks, prop schema, merge tokens, starter
   templates. Exposed as window.EMB. Blocks render with literal inline styles
   (driven by dashboard settings) so the canvas matches the exported email HTML.

   Prop schema entry: { k, l, t:'text'|'textarea'|'number'|'select'|'toggle'|'color', d, o:[options] } */
(function () {
  // suggested personalization tokens (canonical "Object.Field" form)
  const tokens = ["Recipient.FirstName", "Recipient.LastName", "Recipient.Name", "Recipient.Email", "Account.Name", "Contact.Title", "Organization.Name", "Sender.Name", "Sender.Email", "Today"];

  const aligns = ["left", "center", "right"];

  const catalog = [
    // ---- Header & Footer ----
    { type: "header", label: "Header / Logo", icon: "utility:company", group: "Header & Footer",
      desc: "Brand bar with logo or wordmark",
      props: [{ k: "logoText", l: "Wordmark", t: "text", d: "GLOBAL MEDIA" }, { k: "logoUrl", l: "Logo image URL", t: "text", d: "" }, { k: "align", l: "Align", t: "select", d: "left", o: aligns }, { k: "bg", l: "Background", t: "color", d: "#ffffff" }, { k: "showRule", l: "Bottom rule", t: "toggle", d: true }] },
    { type: "footer", label: "Footer / Unsubscribe", icon: "utility:anchor", group: "Header & Footer",
      desc: "Company address, links & unsubscribe",
      props: [{ k: "company", l: "Company", t: "text", d: "Global Media, Inc." }, { k: "address", l: "Address", t: "text", d: "415 Mission St, San Francisco, CA 94105" }, { k: "unsubscribe", l: "Unsubscribe label", t: "text", d: "Unsubscribe" }, { k: "manage", l: "Manage-prefs label", t: "text", d: "Update preferences" }, { k: "bg", l: "Background", t: "color", d: "#f4f6f9" }, { k: "color", l: "Text color", t: "color", d: "#7f8baa" }] },

    // ---- Content ----
    { type: "hero", label: "Hero", icon: "utility:image", group: "Content",
      desc: "Big banner with heading & CTA",
      props: [{ k: "image", l: "Background image URL", t: "text", d: "" }, { k: "bg", l: "Background color", t: "color", d: "#0176D3" }, { k: "heading", l: "Heading", t: "text", d: "Your July statement is ready" }, { k: "sub", l: "Subtext", t: "textarea", d: "Hi {{Recipient.FirstName}}, here's a quick look at this month." }, { k: "buttonLabel", l: "Button label", t: "text", d: "View statement" }, { k: "url", l: "Button URL", t: "text", d: "https://example.com/statement" }, { k: "color", l: "Text color", t: "color", d: "#ffffff" }] },
    { type: "heading", label: "Heading", icon: "utility:text", group: "Content",
      desc: "Section title",
      props: [{ k: "text", l: "Text", t: "text", d: "What's new this month" }, { k: "size", l: "Size", t: "select", d: "28", o: ["32", "28", "22", "18"] }, { k: "align", l: "Align", t: "select", d: "left", o: aligns }, { k: "color", l: "Color", t: "color", d: "#16325c" }] },
    { type: "text", label: "Text", icon: "utility:justify_text", group: "Content",
      desc: "Paragraph copy (supports merge fields)",
      props: [{ k: "content", l: "Content", t: "textarea", d: "Hi {{Recipient.FirstName}},\n\nThanks for being a valued customer. Your account with {{Account.Name}} is in great shape and there are a few updates we think you'll like." }, { k: "size", l: "Font size", t: "select", d: "16", o: ["18", "16", "14"] }, { k: "align", l: "Align", t: "select", d: "left", o: aligns }, { k: "color", l: "Color", t: "color", d: "#4a5874" }] },
    { type: "button", label: "Button (CTA)", icon: "utility:new_window", group: "Content",
      desc: "Call-to-action button",
      props: [{ k: "label", l: "Label", t: "text", d: "Get started" }, { k: "url", l: "URL", t: "text", d: "https://example.com" }, { k: "bg", l: "Background", t: "color", d: "#0176D3" }, { k: "color", l: "Text color", t: "color", d: "#ffffff" }, { k: "align", l: "Align", t: "select", d: "center", o: aligns }, { k: "radius", l: "Corner radius", t: "number", d: 6 }, { k: "full", l: "Full width", t: "toggle", d: false }] },
    { type: "list", label: "List", icon: "utility:list", group: "Content",
      desc: "Bulleted / numbered list",
      props: [{ k: "title", l: "Title", t: "text", d: "Included this month" }, { k: "items", l: "Items (one per line)", t: "textarea", d: "Unlimited reports & dashboards\nPriority support\nNew Agentforce templates" }, { k: "marker", l: "Marker", t: "select", d: "check", o: ["check", "bullet", "number"] }, { k: "color", l: "Text color", t: "color", d: "#4a5874" }] },

    // ---- Media ----
    { type: "image", label: "Image", icon: "utility:image", group: "Media",
      desc: "Full-width or inline image",
      props: [{ k: "url", l: "Image URL", t: "text", d: "" }, { k: "alt", l: "Alt text", t: "text", d: "Product image" }, { k: "width", l: "Width %", t: "number", d: 100 }, { k: "align", l: "Align", t: "select", d: "center", o: aligns }, { k: "href", l: "Link URL", t: "text", d: "" }] },
    { type: "productCard", label: "Product / Record Card", icon: "utility:cart", group: "Media",
      desc: "Image, title, price & button",
      props: [{ k: "image", l: "Image URL", t: "text", d: "" }, { k: "title", l: "Title", t: "text", d: "Enterprise Plan" }, { k: "subtitle", l: "Subtitle", t: "text", d: "Billed annually" }, { k: "price", l: "Price / meta", t: "text", d: "$1,200 / yr" }, { k: "buttonLabel", l: "Button label", t: "text", d: "Renew now" }, { k: "url", l: "Button URL", t: "text", d: "https://example.com/renew" }, { k: "layout", l: "Layout", t: "select", d: "left", o: ["left", "top"] }, { k: "bg", l: "Card background", t: "color", d: "#f7f9fc" }] },

    // ---- Layout ----
    { type: "twoColumn", label: "Two Columns", icon: "utility:side_list", group: "Layout",
      desc: "Side-by-side content columns",
      props: [{ k: "col1Heading", l: "Col 1 heading", t: "text", d: "Reports" }, { k: "col1Text", l: "Col 1 text", t: "textarea", d: "Build any view with drag-and-drop." }, { k: "col2Heading", l: "Col 2 heading", t: "text", d: "Dashboards" }, { k: "col2Text", l: "Col 2 text", t: "textarea", d: "Share live KPIs with your team." }, { k: "color", l: "Text color", t: "color", d: "#4a5874" }] },
    { type: "divider", label: "Divider", icon: "utility:dash", group: "Layout",
      desc: "Horizontal rule",
      props: [{ k: "color", l: "Color", t: "color", d: "#e3e8ef" }, { k: "thickness", l: "Thickness (px)", t: "number", d: 1 }, { k: "pad", l: "Vertical padding (px)", t: "number", d: 16 }] },
    { type: "spacer", label: "Spacer", icon: "utility:expand_alt", group: "Layout",
      desc: "Empty vertical space",
      props: [{ k: "height", l: "Height (px)", t: "number", d: 32 }] },

    // ---- Social ----
    { type: "social", label: "Social Links", icon: "utility:share", group: "Social",
      desc: "Row of social network links",
      props: [{ k: "networks", l: "Networks (comma)", t: "text", d: "LinkedIn, Twitter, Facebook, Instagram" }, { k: "align", l: "Align", t: "select", d: "center", o: aligns }, { k: "color", l: "Icon color", t: "color", d: "#0176D3" }] },
  ];

  const byType = {};
  catalog.forEach((c) => (byType[c.type] = c));
  function defaultProps(type) { const c = byType[type]; const p = {}; (c.props || []).forEach((pr) => (p[pr.k] = pr.d)); return p; }
  function mk(type, over) { return { type, props: Object.assign(defaultProps(type), over || {}) }; }

  // ----------------------------------------------------------- starter templates
  const baseSettings = { subject: "Your July statement is ready", preheader: "A quick look at your account this month.", brandColor: "#0176D3", pageBg: "#eef2f7", contentBg: "#ffffff", textColor: "#16325c", fontFamily: "Arial, Helvetica, sans-serif", width: 600, mergeSyntax: "handlebars" };

  const templates = {
    welcome: {
      label: "Welcome", icon: "utility:adduser",
      settings: { ...baseSettings, subject: "Welcome to Global Media, {{Recipient.FirstName}}", preheader: "Let's get you set up." },
      blocks: [
        mk("header"),
        mk("hero", { heading: "Welcome aboard", sub: "Hi {{Recipient.FirstName}}, we're thrilled to have you. Let's set up your workspace in two minutes.", buttonLabel: "Set up my account" }),
        mk("text", { content: "You now have everything you need to build reports, dashboards and customer journeys. Here's where to begin." }),
        mk("list", { title: "First steps", items: "Connect your data\nInvite your team\nBuild your first dashboard" }),
        mk("button", { label: "Open the app", url: "https://example.com/app" }),
        mk("divider"), mk("social"), mk("footer"),
      ],
    },
    newsletter: {
      label: "Newsletter", icon: "utility:announcement",
      settings: { ...baseSettings, subject: "What's new this month at Global Media", preheader: "Product updates, tips & a customer story." },
      blocks: [
        mk("header"),
        mk("heading", { text: "What's new this month" }),
        mk("text", { content: "Hi {{Recipient.FirstName}}, here are the highlights from the team — including faster dashboards and new templates." }),
        mk("image"),
        mk("twoColumn"),
        mk("button", { label: "Read the full update", url: "https://example.com/blog" }),
        mk("divider"), mk("social"), mk("footer"),
      ],
    },
    receipt: {
      label: "Order Receipt", icon: "utility:cart",
      settings: { ...baseSettings, subject: "Your receipt from Global Media", preheader: "Thanks for your purchase." },
      blocks: [
        mk("header", { align: "center" }),
        mk("heading", { text: "Thanks for your order", align: "center" }),
        mk("text", { content: "Hi {{Recipient.FirstName}}, your renewal is confirmed. A copy of this receipt has been sent to {{Recipient.Email}}.", align: "center" }),
        mk("productCard"),
        mk("divider"),
        mk("text", { content: "Need help? Reply to this email or contact {{Sender.Name}}.", align: "center", size: "14" }),
        mk("footer"),
      ],
    },
    invite: {
      label: "Event Invite", icon: "utility:event",
      settings: { ...baseSettings, subject: "You're invited: Global Media Summit", preheader: "Join us on October 14.", brandColor: "#5867E8" },
      blocks: [
        mk("header"),
        mk("hero", { bg: "#5867E8", heading: "Global Media Summit 2026", sub: "Join us October 14 in San Francisco for a day of product, partners and keynotes.", buttonLabel: "Reserve my seat" }),
        mk("text", { content: "Hi {{Recipient.FirstName}}, we'd love to see you there. Seats are limited, so reserve yours today." }),
        mk("button", { label: "Reserve my seat", bg: "#5867E8", url: "https://example.com/rsvp" }),
        mk("divider"), mk("social"), mk("footer"),
      ],
    },
    reengage: {
      label: "Re-engagement", icon: "utility:back",
      settings: { ...baseSettings, subject: "We miss you, {{Recipient.FirstName}}", preheader: "Here's 20% off to come back.", brandColor: "#06A59A" },
      blocks: [
        mk("header"),
        mk("heading", { text: "We miss you", align: "center" }),
        mk("text", { content: "It's been a while, {{Recipient.FirstName}}. Come back and pick up where you left off — here's 20% off your next plan.", align: "center" }),
        mk("button", { label: "Claim 20% off", bg: "#06A59A", align: "center", url: "https://example.com/comeback" }),
        mk("spacer"), mk("divider"), mk("footer"),
      ],
    },
  };

  function starter() { return templates.welcome.blocks.map((b) => ({ type: b.type, props: { ...b.props } })); }

  window.EMB = { catalog, byType, defaultProps, mk, tokens, templates, baseSettings, starter };
})();
