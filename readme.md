# Salesforce Lightning Design System 2 (SLDS 2 · Cosmos) — Design System

A design-agent kit that recreates the **Salesforce Lightning Design System 2** and its default **Salesforce Cosmos** theme: the visual language of the modern Salesforce Lightning Experience (Sales Cloud, Service Cloud, and the broader Lightning Platform). Use it to build on-brand Salesforce UIs — record pages, list views, dashboards, app shells — for production work or throwaway prototypes.

> **What SLDS 2 is.** SLDS 2 is the next-generation Salesforce design system and the foundation of Salesforce's "agentic" design direction. Its **Cosmos** theme refreshes SLDS 1 with an enriched color palette, softer corners, a reader-friendly type scale, calmer spacing, and a new **global styling-hook** framework (`--slds-g-*`). It is an *upgrade* to SLDS 1, not a rebuild — the same blueprints and base components, restyled.

## Sources

This kit was built by reading the official Salesforce starter kit and the public SLDS color/token system. The reader is encouraged to explore these directly for deeper fidelity (access may require permissions):

- **GitHub — `salesforce-ux/design-system-2-starter-kit`** · https://github.com/salesforce-ux/design-system-2-starter-kit
  The LWC + Vite + SLDS 2 starter app. Its `src/modules/` (shell, page, ui) define the app shell, global header, global navigation, and example pages (Home, Contacts, Contact Detail) that the Lightning CRM UI kit recreates. The visual tokens themselves ship in the npm packages `@salesforce-ux/design-system` (SLDS 1) and `@salesforce-ux/design-system-2` (SLDS 2 / Cosmos), resolved at build time.
- **Lightning Design System** · https://www.lightningdesignsystem.com (SLDS 2 beta) · https://v1.lightningdesignsystem.com (SLDS 1)
- **Lightning Base Components reference** (the `lightning` namespace component catalog — Button, Modal, Breadcrumbs, Progress Indicator/Path, Alert, Datatable, etc., implementing SLDS blueprints) · https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/components.html
- **Styling hooks reference** · https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-custom-properties.html
- **The Salesforce Color System** (palette ramps) · referenced for the `--slds-g-color-palette-*` values.

### Substitutions (flagged — replace for production)

- **Typeface.** ✅ The real brand typeface **Salesforce Sans** is bundled (`assets/fonts/`, full family — Thin/Light/Regular/Bold + italics, © Salesforce) and set as the primary UI font. Weight 500 (medium) resolves to 400 and 600 (semibold) to 700 via nearest-weight; **Public Sans** (Google Fonts) remains only as a metric fallback, **Roboto Mono** is the monospace.
- **Icons.** ✅ The **official SLDS icon sprites** are now bundled in `assets/icons/` (utility, standard, action, doctype, custom — 1,764 symbols total, CC BY-ND 4.0, © Salesforce). The `Icon` component renders them directly by SLDS name (e.g. `utility:download`, `standard:contact`). Material Symbols remains only as an automatic fallback if the sprites can't be fetched (e.g. opened over `file://`). See **Iconography** below.
- **Avatar photo.** The starter kit's `avatar1.jpg` would not import cleanly, so avatars use the component's on-brand **initials** fallback (blue circle).

---

## Design principles

SLDS 2 is framed as a philosophy, not just a component set — five principles guide every pattern and product decision. Carry them into anything you design with this kit:

- **Clarity** — *Simplicity drives momentum.* Prioritize clear, intuitive layouts and streamlined workflows; remove friction so the task stays in focus. (In practice: one primary action per view, plain-spoken labels, generous whitespace, no decorative noise.)
- **Innovation** — *The future is always in motion.* Build to adapt — embrace emerging patterns (e.g. Agentforce/agentic surfaces) and design for what's next rather than freezing a single layout.
- **Scalability** — *Great systems grow with you.* Stay modular: compose screens from the primitives so a pattern flexes from one component up to a global UI without re-design.
- **Empowerment** — *Design is for everyone.* Lower the barrier to entry — accessible by default (focus rings, contrast, semantics), no-code theming via styling hooks, and documentation anyone can follow.
- **Inspiration** — *Delight is part of the system.* Be expressive within the system: calm motion, confident type, and a single brand blue used with intent — functional first, but not lifeless.

**Foundations covered by this kit** (the SLDS 2 "What you'll find here" set): Iconography, Color, Typography, Spacing & Sizing, Borders & Radius, Shadows — all specified in `tokens/` and the `guidelines/` specimen cards. *Illustrations* are represented only by the **EmptyState** component's icon treatment (the real SLDS illustration library is licensed artwork — substitute the official assets for production).

---

## Content fundamentals

How Salesforce product UI is written. SLDS interfaces are **professional, plain-spoken, and task-focused** — enterprise software for sales reps, service agents, and admins, not consumer marketing.

- **Voice:** clear, direct, and helpful. Verb-first for actions (**New**, **Edit**, **Log a Call**, **Save**, **Follow**). No exclamation marks in chrome; toasts may use a single confident period ("Contact saved.").
- **Person:** the UI addresses the user as **you** ("Search Salesforce…", "Your changes were saved"). Record data is third-person factual.
- **Casing:** **Title Case** for buttons, tabs, menu items, and column headers (Recently Viewed, Close Date, Account Name). **Sentence case** for body copy, help text, and toast messages. ALL-CAPS only for small eyebrow/section labels via the `title_caps` style (letter-spaced).
- **Labels & objects:** Salesforce CRM nouns are first-class — Account, Contact, Lead, Opportunity, Case, Task, Campaign, Pipeline, Stage, Close Date, Amount, Owner. List views read like "**Recently Viewed**", "**My Open Opportunities**", "**12 items · sorted by Name · Updated a few seconds ago**".
- **Tone:** confident and quietly optimistic ("Sell faster", "Close more deals"), never hypey. Numbers and currency are concrete ($240,000, 68%, Q3).
- **Emoji:** **none.** Salesforce product UI does not use emoji. Status is communicated with colored badges, icons, and text — never emoji.
- **Microcopy:** short and scannable. Empty states are brief and actionable ("No contacts match your search."). Help text is one line.

Example specimens (see `guidelines/type-*` cards): eyebrow "SALES CLOUD" → heading "Pipeline overview" → body "Track every opportunity from first touch to closed-won with a single source of truth." → meta "Last modified by Austin Guevara · 2 hours ago".

---

## Visual foundations

The Cosmos look: **clean, bright, neutral-forward, with one confident blue.** Information density is high but calm — generous whitespace inside white cards floating on a soft gray canvas.

- **Color.** A single brand hue does the work: **Salesforce Blue `#0176D3`** (`palette-blue-50` → `--slds-g-color-accent-1`). It's the only saturated color in chrome — used for primary buttons, links, active tabs, and record-name links. Everything else is **neutral gray** (`#181818` text down through a 12-step ramp to `#ffffff`). Feedback colors are reserved strictly for state: green `#2e844a` (success/won), orange `#fe9339` (warning/at-risk), red `#ea001e` (error/overdue), cyan `#0d9dda` (info). Cosmos also ships brandable **accent** hues (indigo, violet, pink, teal) for theming, plus colored **standard-object icon tiles** (account=indigo, contact=blue, opportunity=amber, etc.). A full **dark theme** flips surfaces/text via `data-slds-theme="dark"`.
- **Surfaces.** Three neutral layers: app canvas (`surface-1`, light gray `#f3f3f3`), white **containers/cards** (`surface-container-1`), and sunken wells (`surface-3`). The page is gray; content lives on white cards. No background images, no gradients, no textures — Cosmos explicitly drops background imagery for accessibility.
- **Type.** Public Sans (→ Salesforce Sans). Reader-friendly scale: display 52/32, headings 24/20/16/14, body 16/14(base)/12. Headings are **bold** with tight tracking; body is regular at 1.5 line-height; meta is weak gray. Mono (Roboto Mono) for code/tokens.
- **Spacing.** 4px base unit; numeric `spacing-1…8` aliased to SLDS t-shirt names (x-small 8 · small 12 · medium 16 · large 24 · x-large 32). Comfortable, consistent gutters; cards breathe.
- **Corners.** Softer than SLDS 1. `radius-2` (4px) for inputs/chips, `radius-3` (8px) for buttons/controls, `radius-4` (12px) for cards/panels, `radius-5` (16px) for large surfaces, full **pill** for badges/search, **circle** for avatars.
- **Elevation.** Restrained, low-contrast, neutral-tinted shadows — never harsh. `shadow-1` hairline (resting), `shadow-2` cards, `shadow-3` hover-lift/dropdowns, `shadow-4` modals/popovers. Cards are white + `1px` hairline border + `shadow-2`. No glow, no colored shadows.
- **Borders.** `1px` hairlines (`border-1` `#e5e5e5`) divide rows and frame cards; control borders are slightly darker (`border-2` `#c9c9c9`); brand borders use blue.
- **Motion.** Calm and quick — **no bounce**. Durations `quickly 0.1s` / `promptly 0.2s` / `slowly 0.4s` with a standard ease-out. Transitions are limited to color, background, and box-shadow on hover/focus; nothing decorative loops.
- **States.** Hover = subtle background tint (`surface-3`) or a darker brand shade; links darken. Press = darker shade (no shrink). **Focus = a 3px soft-blue ring** (`shadow-focus`) — the consistent accessibility cue across every interactive element. Disabled = 0.5 opacity / muted gray.
- **Imagery.** Minimal. The product surface is UI, not photography. Avatars are photos *or* blue initial-circles; standard objects render as colored rounded-square icon tiles. No hero imagery, no illustration in chrome (illustrations appear only in empty/error states in the real product).
- **Layout.** Fixed app shell: a `~52px` white **global header** (logo, centered pill search, action icons, avatar) over a `~44px` white **app navigation bar** (App Launcher waffle + app name + underlined tabs), then a scrolling content region centered in a max-width container (~1180px). Record pages use a highlights **page header** + a 2/3 details · 1/3 activity split.

---

## Iconography

- **System:** Salesforce uses its own **SLDS icon set** — four categories: `utility:` (monochrome line/solid UI glyphs, ~16–24px, inherit text color), `standard:` (CRM objects on **colored rounded-square tiles**, white glyph), `action:` (round, colored), and `doctype:` (file types). Icons are referenced by colon name (`utility:download`, `standard:opportunity`).
- **In this kit:** the `Icon` component (`components/display/Icon.jsx`) renders the **real SLDS sprites** from `assets/icons/*.svg`. It fetches them once, injects them into the document with category-namespaced symbol ids (`slds-<category>-<name>`, Safari-safe same-document `<use>`), and references them by SLDS name. `utility:*` render as monochrome glyphs that inherit color (variant tints: `brand`, `success`, `warning`, `error`, `inverse`); `standard:*`/`action:*`/`custom:*` render as a colored rounded tile + white glyph; `doctype:*` render full-color. Sizes: `xx-small`–`large`. If a name isn't in the sprite or the fetch fails, it falls back to a Material Symbols glyph.
- **Emoji / unicode:** never used as iconography. All icons come from the SLDS set.
- **Sprites:** `assets/icons/utility.svg` (779), `standard.svg` (639), `action.svg` (187), `custom.svg` (113), `doctype.svg` (46). To update, replace these files with a newer SLDS icon release (same `<symbol id>` convention).

---

## Index / manifest

**Root**
- `styles.css` — the single entry point consumers link. `@import`s the token + base files below.
- `readme.md` — this guide. · `SKILL.md` — Agent Skills wrapper.

**`tokens/`** (all reachable from `styles.css`)
- `palette.css` — raw color ramps (`--slds-g-color-palette-<hue>-<step>`).
- `color.css` — semantic global hooks (`--slds-g-color-*`) + **dark theme** scope.
- `typography.css` — families, weights, `--slds-g-text-*` sizes, line-heights.
- `spacing.css` — `--slds-g-spacing-*` scale + sizing containers.
- `radius-elevation.css` — radius, shadows, motion (duration/easing).
- `fonts.css` — Public Sans + Roboto Mono + Material Symbols `@import` (Material Symbols is only the icon fallback; real SLDS sprites live in `assets/icons/`).
- `base.css` — element resets + SLDS text utility classes (`.slds-text-*`).

**`components/`** — reusable React primitives (namespace `window.SalesforceSLDS2DesignSystem_2eee88`). 40 components mirror the official **Lightning Base Components** catalog (the `lightning` namespace). Each directory has a `*.card.html` showcase (Design System tab) and each component a `.d.ts` + `.prompt.md`.
- `buttons/` — **Button** (neutral · brand · outline-brand · destructive · success · text), **ButtonIcon**, **ButtonGroup** (segmented control), **ButtonMenu** (dropdown w/ items, dividers, subheaders, destructive), **ButtonStateful** (Follow/Following toggle).
- `forms/` — **Input**, **Select**, **Textarea**, **Slider**, **Combobox**, **Checkbox**, **CheckboxGroup**, **RadioGroup**, **Toggle**, **DualListbox**, **FileUpload** (drop zone).
- `display/` — **Card**, **Badge**, **Avatar**, **Pill**, **Icon**, **EmptyState** (a.k.a. Illustration), **Helptext** (tooltip).
- `containers/` — **Accordion**, **Tile**, **Carousel**, **Layout** + **LayoutItem** (12-col grid).
- `feedback/` — **Tabs**, **Alert** (persistent), **Toast** (transient), **Spinner**.
- `overlays/` — **Modal** (focused dialog; small · medium · large).
- `navigation/` — **Breadcrumbs**, **VerticalNavigation** (sidebar w/ sections, icons, count badges).
- `progress/` — **ProgressIndicator** (`path` = Salesforce sales/case Path · `base` = stepper), **ProgressBar**, **ProgressRing**.
- `data/` — **Datatable** (selection, sortable columns, custom cells, row actions), **Tree** (nested expand/collapse).

**Catalog parity — components intentionally documented but not built.** These are data-bound or locale-formatting LWCs that need a live Salesforce org or carry no distinct visual design, so they're not part of the static kit. Recreate them with the primitives above when needed:
- **Forms (record data-binding):** Record Form, Record Edit Form, Record View Form, Input Field, Output Field — bind to `recordId`/SObject fields at runtime. In a mock, compose `Input`/`Select`/`Combobox` inside a `Card` or `Modal`.
- **Output formatters (locale/i18n):** Formatted Address, Date Time, Email, Location, Name, Number, Phone, Rich Text, Text, Time, URL, Relative Date Time — render a value formatted for the user's locale; in a mock just print the pre-formatted string.
- **Notification variants:** Confirm, Prompt (use **Modal** with footer buttons), Toast Container / Platform Show Toast Event (the host/queue for **Toast**).
- **Inputs:** Input Rich Text (+ Rich Text Toolbar Button/Group), Record Picker (a search **Combobox** bound to records), Click To Dial.
- **Visuals/containers:** Dynamic Icon (animated states), Illustration (covered by **EmptyState**), Map (needs a maps provider), Quick Action Panel, Tab/Tab Set internals, Carousel Image, Pill Container (covered by laying out **Pill**s), Tree Grid (compose **Tree** + **Datatable** columns), Flow.

**`ui_kits/lightning-crm/`** — interactive **Sales Cloud** recreation
- `index.html` — app entry: global header + app nav + routed screens, with working search, navigation, record drill-in, and toasts.
- `shell.jsx` (GlobalHeader, AppNav), `home.jsx` (HomeDashboard — KPIs, opportunities, tasks), `records.jsx` (ContactsList, ContactDetail, OpportunityBoard/kanban), `data.js` (sample CRM data).

**`templates/`** — reusable **starting points** (shown in the Templates picker; copy a folder to seed a new design):
- `templates/lightning-crm/` — the full Sales Cloud app (`LightningCrm.dc.html` mounts the self-contained `LightningCrmApp.jsx`).
- `templates/lwc-reference/` — the searchable LWC component catalog (81 components, 80 live demos across 12 categories).
- `templates/crm-builder/` — the drag-and-drop CRM Page Builder (see `crm-builder/` below).

**`reference/`** — `LWC Reference.html`: a searchable catalog of the full Salesforce Lightning base-component set (81 components, 12 categories) with live SLDS 2 demos + how-to-compose notes for the data-bound ones. (Design System tab → "Reference".)

**`crm-builder/`** — the **CRM Page Builder**: a Lightning App Builder–style drag-and-drop prototyper (`index.html` + `catalog.js`, `render.jsx`, `export.js`, `app.jsx`). 25 page components, 6 region layouts, page settings, and per-component properties. Exports the layout as **FlexiPage XML** (native App Builder format), an **LWC parent-component scaffold** (`.html`/`.js`/`.js-meta.xml`), **JSON**, or a designer **mockup outline** — the configured properties flow into the generated code. (Design System tab → "Tools".)

**`guidelines/`** — foundation specimen cards (Design System tab): Colors (Brand, Surfaces, Feedback, Dark), Type (Typeface, Headings, Body), Spacing (Scale, Radius, Elevation), Brand (Logo).

**`assets/`** — `salesforce-cloud.svg` (the cloud mark) + `icons/` (the five official SLDS icon sprites: utility, standard, action, doctype, custom). `public/favicon.ico` + `public/images/salesforce.svg` are the original starter-kit imports.
