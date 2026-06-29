/* @ds-bundle: {"format":3,"namespace":"SalesforceSLDS2DesignSystem_2eee88","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"ButtonGroup","sourcePath":"components/buttons/ButtonGroup.jsx"},{"name":"ButtonIcon","sourcePath":"components/buttons/ButtonIcon.jsx"},{"name":"ButtonMenu","sourcePath":"components/buttons/ButtonMenu.jsx"},{"name":"ButtonStateful","sourcePath":"components/buttons/ButtonStateful.jsx"},{"name":"Accordion","sourcePath":"components/containers/Accordion.jsx"},{"name":"Carousel","sourcePath":"components/containers/Carousel.jsx"},{"name":"Layout","sourcePath":"components/containers/Layout.jsx"},{"name":"LayoutItem","sourcePath":"components/containers/Layout.jsx"},{"name":"Tile","sourcePath":"components/containers/Tile.jsx"},{"name":"Datatable","sourcePath":"components/data/Datatable.jsx"},{"name":"Tree","sourcePath":"components/data/Tree.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"EmptyState","sourcePath":"components/display/EmptyState.jsx"},{"name":"Helptext","sourcePath":"components/display/Helptext.jsx"},{"name":"Icon","sourcePath":"components/display/Icon.jsx"},{"name":"Pill","sourcePath":"components/display/Pill.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Spinner","sourcePath":"components/feedback/Spinner.jsx"},{"name":"Tabs","sourcePath":"components/feedback/Tabs.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"CheckboxGroup","sourcePath":"components/forms/CheckboxGroup.jsx"},{"name":"Combobox","sourcePath":"components/forms/Combobox.jsx"},{"name":"DualListbox","sourcePath":"components/forms/DualListbox.jsx"},{"name":"FileUpload","sourcePath":"components/forms/FileUpload.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Slider","sourcePath":"components/forms/Slider.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"},{"name":"Breadcrumbs","sourcePath":"components/navigation/Breadcrumbs.jsx"},{"name":"VerticalNavigation","sourcePath":"components/navigation/VerticalNavigation.jsx"},{"name":"Modal","sourcePath":"components/overlays/Modal.jsx"},{"name":"ProgressBar","sourcePath":"components/progress/ProgressBar.jsx"},{"name":"ProgressIndicator","sourcePath":"components/progress/ProgressIndicator.jsx"},{"name":"ProgressRing","sourcePath":"components/progress/ProgressRing.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"0f8601d85222","components/buttons/ButtonGroup.jsx":"1d57c1733079","components/buttons/ButtonIcon.jsx":"db81f10aaf2b","components/buttons/ButtonMenu.jsx":"a92c22a11be4","components/buttons/ButtonStateful.jsx":"d69b7d05e845","components/containers/Accordion.jsx":"a8c11199d50c","components/containers/Carousel.jsx":"01a93e864cde","components/containers/Layout.jsx":"a88f0a2f0a12","components/containers/Tile.jsx":"5319c73221d3","components/data/Datatable.jsx":"e975c567abd6","components/data/Tree.jsx":"f6b8e7033031","components/display/Avatar.jsx":"41212bfd6a51","components/display/Badge.jsx":"b58e50d12bdc","components/display/Card.jsx":"22251d349795","components/display/EmptyState.jsx":"01f1f968cc2a","components/display/Helptext.jsx":"f8df26888276","components/display/Icon.jsx":"64b410172c77","components/display/Pill.jsx":"9f3446059fce","components/feedback/Alert.jsx":"1d2943b4da83","components/feedback/Spinner.jsx":"577ea08c6c30","components/feedback/Tabs.jsx":"4678bf9780b1","components/feedback/Toast.jsx":"e0b55aef67ab","components/forms/Checkbox.jsx":"a84b0274f2d6","components/forms/CheckboxGroup.jsx":"74aaeb71d456","components/forms/Combobox.jsx":"009ff77e62a5","components/forms/DualListbox.jsx":"a35376de6397","components/forms/FileUpload.jsx":"55bb609867a1","components/forms/Input.jsx":"6c03c982c725","components/forms/RadioGroup.jsx":"8d25301ca105","components/forms/Select.jsx":"e996397f4fb2","components/forms/Slider.jsx":"0e9aeb2b2cd5","components/forms/Textarea.jsx":"42eb489a2a02","components/forms/Toggle.jsx":"1a6619e28bc3","components/navigation/Breadcrumbs.jsx":"db3dbc32531f","components/navigation/VerticalNavigation.jsx":"dcd267be6439","components/overlays/Modal.jsx":"1203e35360a7","components/progress/ProgressBar.jsx":"dc6ba2f96de2","components/progress/ProgressIndicator.jsx":"616d5dcb6485","components/progress/ProgressRing.jsx":"b7f9c71314e1","ui_kits/lightning-crm/data.js":"e0bf0671af62","ui_kits/lightning-crm/data/contacts.js":"4d307862c96c","ui_kits/lightning-crm/home.jsx":"f610c538ac9c","ui_kits/lightning-crm/records.jsx":"d616b2d5a717","ui_kits/lightning-crm/shell.jsx":"84478982cf3d"},"inlinedExternals":[],"unexposedExports":[{"name":"getAllContacts","sourcePath":"ui_kits/lightning-crm/data/contacts.js"},{"name":"getContactById","sourcePath":"ui_kits/lightning-crm/data/contacts.js"}]} */

(() => {

const __ds_ns = (window.SalesforceSLDS2DesignSystem_2eee88 = window.SalesforceSLDS2DesignSystem_2eee88 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/containers/Layout.jsx
try { (() => {
/**
 * SLDS Layout / Layout Item — a 12-column flex grid.
 * <Layout gutters horizontalAlign="spread">
 *   <LayoutItem size={6}>…</LayoutItem>
 *   <LayoutItem size={6}>…</LayoutItem>
 * </Layout>
 */
function Layout({
  children,
  gutters = true,
  wrap = true,
  horizontalAlign = "start",
  verticalAlign = "stretch",
  className = "",
  style = {}
}) {
  const justify = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    spread: "space-between",
    space: "space-around"
  }[horizontalAlign] || "flex-start";
  const align = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    stretch: "stretch"
  }[verticalAlign] || "stretch";
  const gap = gutters ? "var(--slds-g-spacing-4)" : "0";
  return /*#__PURE__*/React.createElement("div", {
    className: `slds2-layout ${className}`,
    style: {
      display: "flex",
      flexWrap: wrap ? "wrap" : "nowrap",
      gap,
      justifyContent: justify,
      alignItems: align,
      ...style
    }
  }, children);
}
function LayoutItem({
  children,
  size,
  flexibility,
  className = "",
  style = {}
}) {
  const basis = size ? `calc(${size / 12 * 100}% - var(--slds-g-spacing-4))` : "auto";
  const grow = flexibility === "auto" || flexibility === "grow" ? 1 : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: `slds2-layout-item ${className}`,
    style: {
      flex: size ? `1 1 ${basis}` : `${grow} 1 auto`,
      minWidth: size ? basis : "auto",
      maxWidth: size ? basis : "none",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Layout, LayoutItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/containers/Layout.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
const VARIANTS = {
  default: {
    bg: "var(--slds-g-color-surface-3)",
    fg: "var(--slds-g-color-on-surface-2)"
  },
  inverse: {
    bg: "var(--slds-g-color-surface-inverse-1)",
    fg: "var(--slds-g-color-on-surface-inverse-1)"
  },
  brand: {
    bg: "var(--slds-g-color-accent-container-1)",
    fg: "var(--slds-g-color-accent-foreground-1)"
  },
  success: {
    bg: "var(--slds-g-color-success-container-1)",
    fg: "var(--slds-g-color-palette-green-60)"
  },
  warning: {
    bg: "var(--slds-g-color-warning-container-1)",
    fg: "var(--slds-g-color-palette-orange-60)"
  },
  error: {
    bg: "var(--slds-g-color-error-container-1)",
    fg: "var(--slds-g-color-palette-red-60)"
  }
};
function Badge({
  label,
  children,
  variant = "default",
  className = "",
  style = {}
}) {
  const v = VARIANTS[variant] || VARIANTS.default;
  return /*#__PURE__*/React.createElement("span", {
    className: `slds2-badge ${className}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: "1.25rem",
      padding: "0 0.5rem",
      fontSize: "var(--slds-g-font-scale-neg-1)",
      fontWeight: "var(--slds-g-font-weight-semibold)",
      lineHeight: 1,
      color: v.fg,
      background: v.bg,
      borderRadius: "var(--slds-g-radius-border-pill)",
      whiteSpace: "nowrap",
      ...style
    }
  }, label ?? children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ============================================================
   SLDS Icon — renders the REAL Salesforce SLDS icon sprites
   (utility / standard / action / doctype / custom) shipped in
   assets/icons/*.svg. The sprites are fetched once and injected
   into the document (Safari-safe same-document <use>), with each
   symbol id namespaced as `slds-<category>-<name>`.

   If the sprites can't be fetched (e.g. opened over file://),
   the component falls back to the Material Symbols glyph map so
   icons still render. ============================================================ */

const SPRITE_CATS = ["utility", "standard", "action", "doctype", "custom"];
const availIds = {}; // category -> Set(iconName)
let spriteReady = false;
let spriteFailed = false;
let spritePromise = null;
const subscribers = new Set();
const notify = () => subscribers.forEach(fn => fn());
function spriteBase() {
  if (typeof document === "undefined") return "./";
  const s = document.querySelector('script[src*="_ds_bundle.js"]');
  if (s && s.getAttribute("src")) return s.getAttribute("src").replace(/_ds_bundle\.js.*$/, "");
  return "./";
}
function loadSprites() {
  if (spritePromise) return spritePromise;
  spritePromise = (async () => {
    try {
      if (typeof document === "undefined") {
        spriteFailed = true;
        return;
      }
      if (document.getElementById("__slds_sprites")) {
        spriteReady = true;
        return;
      }
      const base = spriteBase();
      let inner = "";
      for (const cat of SPRITE_CATS) {
        try {
          const res = await fetch(base + "assets/icons/" + cat + ".svg");
          if (!res.ok) continue;
          let txt = await res.text();
          const set = new Set();
          txt.replace(/<symbol[^>]*\bid="([^"]+)"/g, (m, id) => {
            set.add(id);
            return m;
          });
          availIds[cat] = set;
          txt = txt.replace(/(<symbol[^>]*\bid=")([^"]+)(")/g, (m, a, id, b) => a + "slds-" + cat + "-" + id + b);
          inner += txt.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
        } catch (e) {/* skip this category */}
      }
      if (!inner) {
        spriteFailed = true;
        return;
      }
      const holder = document.createElement("div");
      holder.setAttribute("aria-hidden", "true");
      holder.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
      holder.innerHTML = '<svg id="__slds_sprites" xmlns="http://www.w3.org/2000/svg">' + inner + "</svg>";
      document.body.appendChild(holder.firstChild);
      spriteReady = true;
    } catch (e) {
      spriteFailed = true;
    } finally {
      notify();
    }
  })();
  return spritePromise;
}
const hasSprite = (cat, name) => spriteReady && availIds[cat] && availIds[cat].has(name);

/* ---- Material Symbols fallback (used until sprites load / if they fail) ---- */
const GLYPHS = {
  download: "download",
  upload: "upload",
  edit: "edit",
  delete: "delete",
  refresh: "refresh",
  search: "search",
  settings: "settings",
  help: "help",
  notification: "notifications",
  favorite: "star",
  add: "add",
  new: "add",
  close: "close",
  clear: "cancel",
  check: "check",
  success: "check_circle",
  warning: "warning",
  error: "error",
  info: "info",
  info_alt: "info",
  chevrondown: "expand_more",
  chevronup: "expand_less",
  chevronright: "chevron_right",
  chevronleft: "chevron_left",
  down: "keyboard_arrow_down",
  up: "keyboard_arrow_up",
  left: "chevron_left",
  right: "chevron_right",
  back: "arrow_back",
  forward: "arrow_forward",
  user: "person",
  people: "group",
  email: "mail",
  call: "call",
  phone: "call",
  event: "event",
  date_input: "calendar_today",
  clock: "schedule",
  world: "public",
  list: "list",
  table: "table_rows",
  kanban: "view_kanban",
  filterList: "filter_list",
  filter: "filter_alt",
  sort: "swap_vert",
  more: "more_horiz",
  threedots_vertical: "more_vert",
  apps: "apps",
  waffle: "apps",
  salesforce1: "cloud",
  agent_astro: "smart_toy",
  einstein: "auto_awesome",
  trailhead_alt: "school",
  home: "home",
  dashboard: "dashboard",
  chart: "bar_chart",
  opportunity: "paid",
  contact: "person",
  account: "business",
  lead: "trending_up",
  case: "headset_mic",
  task: "task_alt",
  file: "description",
  attach: "attach_file",
  link: "link",
  copy: "content_copy",
  share: "share",
  send: "send",
  comments: "chat_bubble",
  like: "thumb_up",
  lock: "lock",
  unlock: "lock_open",
  preview: "visibility",
  money: "payments",
  cart: "shopping_cart",
  location: "location_on",
  new_window: "open_in_new",
  logout: "logout",
  checkin: "where_to_vote",
  rows: "view_agenda",
  expand: "unfold_more",
  color_swatch: "palette",
  dayview: "today",
  trail: "route",
  record_lookup: "find_in_page",
  apex: "code",
  json: "data_object",
  page: "description",
  richtextbox: "notes",
  metrics: "insights",
  timeline: "timeline",
  recent: "history",
  topic: "sell",
  related_list: "list_alt",
  drag_and_drop: "drag_indicator",
  address: "place",
  pinned: "push_pin",
  trending: "trending_up"
};

/* Standard-object icon tile colors (used only by the Material fallback;
   real sprites carry their own tile via the glyph art + this bg). */
const STANDARD_COLORS = {
  account: "#5867e8",
  contact: "#3b9bd6",
  opportunity: "#fcb95b",
  lead: "#f88962",
  case: "#f2cf5b",
  task: "#4bca81",
  event: "#eb7092",
  campaign: "#f49756",
  dashboard: "#ee5e5b",
  report: "#06a59a",
  user: "#65cae4",
  related_list: "#76c2af",
  timeline: "#56aadf",
  recent: "#719e07",
  topic: "#5867e8",
  datatable: "#5867e8",
  record: "#5867e8",
  address: "#3b9bd6",
  default: "#0176d3"
};
const SIZES = {
  "xx-small": 14,
  "x-small": 16,
  small: 20,
  medium: 24,
  large: 32
};
const VARIANT_COLOR = {
  default: "var(--slds-g-color-on-surface-3)",
  error: "var(--slds-g-color-error-1)",
  success: "var(--slds-g-color-success-1)",
  warning: "var(--slds-g-color-warning-1)",
  brand: "var(--slds-g-color-accent-1)",
  inverse: "var(--slds-g-color-on-surface-inverse-1)"
};
const glyphFor = name => GLYPHS[name] || name.replace(/[^a-z0-9]+/gi, "_").toLowerCase();
function Icon({
  iconName = "utility:info",
  size = "small",
  variant = "default",
  filled = false,
  title,
  className = "",
  style = {}
}) {
  const [, force] = React.useState(0);
  React.useEffect(() => {
    if (spriteReady || spriteFailed) return;
    const fn = () => force(x => x + 1);
    subscribers.add(fn);
    loadSprites();
    return () => subscribers.delete(fn);
  }, []);
  const [category, name = ""] = iconName.split(":");
  const px = SIZES[size] || SIZES.small;
  const a11y = title ? {
    role: "img",
    "aria-label": title
  } : {
    "aria-hidden": "true"
  };

  /* ---------- real SLDS sprite ---------- */
  if (hasSprite(category, name)) {
    const href = "#slds-" + category + "-" + name;
    if (category === "utility") {
      return /*#__PURE__*/React.createElement("svg", _extends({
        className: className,
        width: px,
        height: px
      }, a11y, {
        style: {
          fill: VARIANT_COLOR[variant] || VARIANT_COLOR.default,
          flex: "none",
          ...style
        }
      }), /*#__PURE__*/React.createElement("use", {
        href: href
      }));
    }
    if (category === "doctype") {
      return /*#__PURE__*/React.createElement("svg", _extends({
        className: className,
        height: px,
        width: Math.round(px * 0.875)
      }, a11y, {
        style: {
          flex: "none",
          ...style
        }
      }), /*#__PURE__*/React.createElement("use", {
        href: href
      }));
    }
    // standard / action / custom → colored rounded tile + white glyph
    const tile = px + Math.round(px * 0.5);
    const bg = STANDARD_COLORS[name] || STANDARD_COLORS.default;
    return /*#__PURE__*/React.createElement("span", _extends({
      className: className
    }, a11y, {
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: tile,
        height: tile,
        background: bg,
        borderRadius: "var(--slds-g-radius-border-3)",
        flex: "none",
        ...style
      }
    }), /*#__PURE__*/React.createElement("svg", {
      width: Math.round(px * 0.92),
      height: Math.round(px * 0.92),
      style: {
        fill: "#fff"
      },
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("use", {
      href: href
    })));
  }

  /* ---------- Material Symbols fallback ---------- */
  const isMono = category === "utility" || category === "doctype";
  const glyphStyle = {
    fontSize: px,
    fontVariationSettings: `"FILL" ${filled ? 1 : 0}, "wght" 400, "GRAD" 0, "opsz" ${px}`,
    lineHeight: 1
  };
  if (isMono) {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: `material-symbols-rounded ${className}`
    }, a11y, {
      style: {
        color: VARIANT_COLOR[variant] || VARIANT_COLOR.default,
        flex: "none",
        ...glyphStyle,
        ...style
      }
    }), glyphFor(name));
  }
  const tile = px + Math.round(px * 0.5);
  const bg = STANDARD_COLORS[name] || STANDARD_COLORS.default;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className
  }, a11y, {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: tile,
      height: tile,
      background: bg,
      borderRadius: "var(--slds-g-radius-border-3)",
      flex: "none",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      color: "#fff",
      fontSize: Math.round(px * 0.86),
      fontVariationSettings: `"FILL" 1, "wght" 500, "GRAD" 0, "opsz" ${px}`,
      lineHeight: 1
    }
  }, glyphFor(name)));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Icon.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SLDS button variants → token-driven styles. */
const VARIANTS = {
  neutral: {
    "--_bg": "var(--slds-g-color-surface-container-1)",
    "--_bg-hover": "var(--slds-g-color-surface-3)",
    "--_fg": "var(--slds-g-color-accent-1)",
    "--_bd": "var(--slds-g-color-border-2)"
  },
  brand: {
    "--_bg": "var(--slds-g-color-accent-1)",
    "--_bg-hover": "var(--slds-g-color-accent-2)",
    "--_fg": "var(--slds-g-color-on-accent-1)",
    "--_bd": "var(--slds-g-color-accent-1)"
  },
  "outline-brand": {
    "--_bg": "var(--slds-g-color-surface-container-1)",
    "--_bg-hover": "var(--slds-g-color-accent-container-1)",
    "--_fg": "var(--slds-g-color-accent-1)",
    "--_bd": "var(--slds-g-color-accent-1)"
  },
  destructive: {
    "--_bg": "var(--slds-g-color-error-1)",
    "--_bg-hover": "var(--slds-g-color-error-2)",
    "--_fg": "var(--slds-g-color-on-error-1)",
    "--_bd": "var(--slds-g-color-error-1)"
  },
  success: {
    "--_bg": "var(--slds-g-color-success-1)",
    "--_bg-hover": "var(--slds-g-color-palette-green-60)",
    "--_fg": "var(--slds-g-color-on-success-1)",
    "--_bd": "var(--slds-g-color-success-1)"
  },
  text: {
    "--_bg": "transparent",
    "--_bg-hover": "var(--slds-g-color-surface-3)",
    "--_fg": "var(--slds-g-color-accent-1)",
    "--_bd": "transparent"
  }
};
function Button({
  label,
  children,
  variant = "neutral",
  size = "medium",
  iconName,
  iconPosition = "left",
  disabled = false,
  stretch = false,
  type = "button",
  onClick,
  className = "",
  style = {},
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.neutral;
  const pad = size === "small" ? "0 0.75rem" : "0 1rem";
  const height = size === "small" ? "1.75rem" : "2rem";
  const content = label ?? children;
  const icon = iconName ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: iconName,
    size: "x-small",
    variant: "inverse",
    style: {
      color: "inherit"
    }
  }) : null;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    className: `slds2-button ${className}`,
    style: {
      ...v,
      display: stretch ? "flex" : "inline-flex",
      width: stretch ? "100%" : "auto",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.375rem",
      height,
      padding: pad,
      font: "inherit",
      fontSize: "var(--slds-g-text-body-regular)",
      fontWeight: "var(--slds-g-font-weight-semibold)",
      lineHeight: 1,
      color: "var(--_fg)",
      background: "var(--_bg)",
      border: "1px solid var(--_bd)",
      borderRadius: "var(--slds-g-radius-border-3)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background var(--slds-g-duration-quickly) var(--slds-g-ease-out), box-shadow var(--slds-g-duration-quickly) var(--slds-g-ease-out)",
      whiteSpace: "nowrap",
      ...style
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.background = "var(--_bg-hover)";
    },
    onMouseLeave: e => {
      if (!disabled) e.currentTarget.style.background = "var(--_bg)";
    },
    onFocus: e => {
      e.currentTarget.style.boxShadow = "var(--slds-g-shadow-focus)";
    },
    onBlur: e => {
      e.currentTarget.style.boxShadow = "none";
    }
  }, rest), iconName && iconPosition === "left" && icon, content, iconName && iconPosition === "right" && icon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/ButtonGroup.jsx
try { (() => {
/** SLDS Button Group — a set of related buttons joined into a single segmented control. */
function ButtonGroup({
  items = [],
  value,
  onChange,
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "group",
    className: `slds2-button-group ${className}`,
    style: {
      display: "inline-flex",
      ...style
    }
  }, items.map((item, i) => {
    const first = i === 0;
    const last = i === items.length - 1;
    const selected = value !== undefined && item.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: item.value ?? i,
      type: "button",
      onClick: () => onChange ? onChange(item.value) : item.onClick && item.onClick(),
      title: item.title || item.label,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        height: "2rem",
        padding: item.label ? "0 0.75rem" : "0 0.5rem",
        marginLeft: first ? 0 : "-1px",
        font: "inherit",
        fontSize: "var(--slds-g-text-body-regular)",
        fontWeight: "var(--slds-g-font-weight-semibold)",
        color: selected ? "var(--slds-g-color-on-accent-1)" : "var(--slds-g-color-accent-1)",
        background: selected ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-surface-container-1)",
        border: "1px solid var(--slds-g-color-border-2)",
        borderTopLeftRadius: first ? "var(--slds-g-radius-border-3)" : 0,
        borderBottomLeftRadius: first ? "var(--slds-g-radius-border-3)" : 0,
        borderTopRightRadius: last ? "var(--slds-g-radius-border-3)" : 0,
        borderBottomRightRadius: last ? "var(--slds-g-radius-border-3)" : 0,
        cursor: "pointer",
        position: "relative",
        zIndex: selected ? 1 : 0,
        whiteSpace: "nowrap"
      }
    }, item.iconName && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      iconName: item.iconName,
      size: "x-small",
      style: {
        color: "inherit"
      }
    }), item.label);
  }));
}
Object.assign(__ds_scope, { ButtonGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/ButtonGroup.jsx", error: String((e && e.message) || e) }); }

// components/buttons/ButtonIcon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  border: {
    bg: "var(--slds-g-color-surface-container-1)",
    bgHover: "var(--slds-g-color-surface-3)",
    fg: "var(--slds-g-color-accent-1)",
    bd: "var(--slds-g-color-border-2)"
  },
  "border-filled": {
    bg: "var(--slds-g-color-surface-container-1)",
    bgHover: "var(--slds-g-color-surface-3)",
    fg: "var(--slds-g-color-on-surface-2)",
    bd: "var(--slds-g-color-border-2)"
  },
  bare: {
    bg: "transparent",
    bgHover: "var(--slds-g-color-surface-3)",
    fg: "var(--slds-g-color-on-surface-3)",
    bd: "transparent"
  },
  brand: {
    bg: "var(--slds-g-color-accent-1)",
    bgHover: "var(--slds-g-color-accent-2)",
    fg: "var(--slds-g-color-on-accent-1)",
    bd: "var(--slds-g-color-accent-1)"
  },
  container: {
    bg: "var(--slds-g-color-surface-container-1)",
    bgHover: "var(--slds-g-color-surface-3)",
    fg: "var(--slds-g-color-on-surface-3)",
    bd: "transparent"
  }
};
const SIZES = {
  "x-small": "1.5rem",
  small: "1.75rem",
  medium: "2rem",
  large: "2.5rem"
};
function ButtonIcon({
  iconName = "utility:settings",
  variant = "border",
  size = "medium",
  disabled = false,
  title,
  onClick,
  className = "",
  style = {},
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.border;
  const dim = SIZES[size] || SIZES.medium;
  const bare = variant === "bare";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    title: title,
    "aria-label": title,
    className: `slds2-button-icon ${className}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dim,
      height: dim,
      padding: 0,
      color: v.fg,
      background: v.bg,
      border: `1px solid ${v.bd}`,
      borderRadius: bare ? "var(--slds-g-radius-border-2)" : "var(--slds-g-radius-border-3)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background var(--slds-g-duration-quickly) var(--slds-g-ease-out)",
      ...style
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.background = v.bgHover;
    },
    onMouseLeave: e => {
      if (!disabled) e.currentTarget.style.background = v.bg;
    },
    onFocus: e => {
      e.currentTarget.style.boxShadow = "var(--slds-g-shadow-focus)";
    },
    onBlur: e => {
      e.currentTarget.style.boxShadow = "none";
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: iconName,
    size: size === "large" ? "small" : "x-small",
    style: {
      color: "inherit"
    }
  }));
}
Object.assign(__ds_scope, { ButtonIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/ButtonIcon.jsx", error: String((e && e.message) || e) }); }

// components/buttons/ButtonMenu.jsx
try { (() => {
/**
 * SLDS Button Menu — a button that opens a dropdown of menu items.
 * Items: { label, iconName, onClick } | { divider: true } | { subheader: "…" }.
 */
function ButtonMenu({
  label,
  iconName = "utility:down",
  items = [],
  align = "left",
  variant = "border",
  className = "",
  style = {}
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const bordered = variant === "border";
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: `slds2-button-menu ${className}`,
    style: {
      position: "relative",
      display: "inline-block",
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(o => !o),
    "aria-haspopup": "true",
    "aria-expanded": open,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.375rem",
      height: "2rem",
      padding: label ? "0 0.75rem" : "0 0.5rem",
      minWidth: label ? "auto" : "2rem",
      justifyContent: "center",
      font: "inherit",
      fontSize: "var(--slds-g-text-body-regular)",
      fontWeight: "var(--slds-g-font-weight-semibold)",
      color: "var(--slds-g-color-accent-1)",
      background: "var(--slds-g-color-surface-container-1)",
      border: bordered ? "1px solid var(--slds-g-color-border-2)" : "1px solid transparent",
      borderRadius: "var(--slds-g-radius-border-3)",
      cursor: "pointer"
    }
  }, label, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: iconName,
    size: "xx-small",
    style: {
      color: "var(--slds-g-color-on-surface-3)"
    }
  })), open && /*#__PURE__*/React.createElement("ul", {
    role: "menu",
    style: {
      position: "absolute",
      top: "calc(100% + 4px)",
      [align]: 0,
      zIndex: 30,
      minWidth: "12rem",
      margin: 0,
      padding: "0.25rem",
      listStyle: "none",
      background: "var(--slds-g-color-surface-container-1)",
      border: "1px solid var(--slds-g-color-border-1)",
      borderRadius: "var(--slds-g-radius-border-3)",
      boxShadow: "var(--slds-g-shadow-4)"
    }
  }, items.map((it, i) => {
    if (it.divider) return /*#__PURE__*/React.createElement("li", {
      key: i,
      role: "separator",
      style: {
        height: 1,
        margin: "0.25rem 0",
        background: "var(--slds-g-color-border-1)"
      }
    });
    if (it.subheader) return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        padding: "0.375rem 0.625rem 0.25rem",
        fontSize: "var(--slds-g-text-body-small)",
        fontWeight: "var(--slds-g-font-weight-bold)",
        textTransform: "uppercase",
        letterSpacing: ".04em",
        color: "var(--slds-g-color-on-surface-3)"
      }
    }, it.subheader);
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      role: "menuitem",
      onClick: () => {
        it.onClick && it.onClick();
        setOpen(false);
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 0.625rem",
        borderRadius: "var(--slds-g-radius-border-2)",
        fontSize: "var(--slds-g-text-body-regular)",
        color: it.destructive ? "var(--slds-g-color-error-1)" : "var(--slds-g-color-on-surface-1)",
        cursor: "pointer"
      },
      onMouseEnter: e => e.currentTarget.style.background = "var(--slds-g-color-surface-3)",
      onMouseLeave: e => e.currentTarget.style.background = "transparent"
    }, it.iconName && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      iconName: it.iconName,
      size: "x-small",
      style: {
        color: "inherit",
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, it.label), it.checked && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      iconName: "utility:check",
      size: "xx-small",
      variant: "brand"
    }));
  })));
}
Object.assign(__ds_scope, { ButtonMenu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/ButtonMenu.jsx", error: String((e && e.message) || e) }); }

// components/buttons/ButtonStateful.jsx
try { (() => {
/**
 * SLDS Button Stateful — a toggle button that flips between two states,
 * e.g. Follow → Following (with a hover "Unfollow" affordance).
 */
function ButtonStateful({
  selected: controlled,
  defaultSelected = false,
  onChange,
  labelWhenOff = "Follow",
  labelWhenOn = "Following",
  labelWhenHover = "Unfollow",
  iconNameWhenOff = "utility:add",
  iconNameWhenOn = "utility:check",
  className = "",
  style = {}
}) {
  const isControlled = controlled !== undefined;
  const [internal, setInternal] = React.useState(defaultSelected);
  const [hover, setHover] = React.useState(false);
  const selected = isControlled ? controlled : internal;
  const toggle = () => {
    if (!isControlled) setInternal(s => !s);
    onChange && onChange(!selected);
  };
  const label = selected ? hover ? labelWhenHover : labelWhenOn : labelWhenOff;
  const icon = selected ? iconNameWhenOn : iconNameWhenOff;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-pressed": selected,
    onClick: toggle,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    className: `slds2-button-stateful ${className}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.375rem",
      height: "2rem",
      padding: "0 0.875rem",
      font: "inherit",
      fontSize: "var(--slds-g-text-body-regular)",
      fontWeight: "var(--slds-g-font-weight-semibold)",
      color: selected ? "var(--slds-g-color-on-accent-1)" : "var(--slds-g-color-accent-1)",
      background: selected ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-surface-container-1)",
      border: "1px solid var(--slds-g-color-accent-1)",
      borderRadius: "var(--slds-g-radius-border-3)",
      cursor: "pointer",
      minWidth: "6.5rem",
      justifyContent: "center",
      whiteSpace: "nowrap",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: icon,
    size: "x-small",
    style: {
      color: "inherit"
    }
  }), label);
}
Object.assign(__ds_scope, { ButtonStateful });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/ButtonStateful.jsx", error: String((e && e.message) || e) }); }

// components/containers/Accordion.jsx
try { (() => {
/**
 * SLDS Accordion — expand/collapse sections of related content.
 * sections: [{ id, label, content }]. Set allowMultiple to keep several open.
 */
function Accordion({
  sections = [],
  defaultActive,
  allowMultiple = false,
  className = "",
  style = {}
}) {
  const initial = defaultActive != null ? Array.isArray(defaultActive) ? defaultActive : [defaultActive] : sections[0] ? [sections[0].id ?? 0] : [];
  const [open, setOpen] = React.useState(initial);
  const toggle = key => {
    setOpen(cur => {
      const has = cur.includes(key);
      if (allowMultiple) return has ? cur.filter(k => k !== key) : [...cur, key];
      return has ? [] : [key];
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `slds2-accordion ${className}`,
    style: style
  }, sections.map((s, i) => {
    const key = s.id ?? i;
    const isOpen = open.includes(key);
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      style: {
        borderBottom: "1px solid var(--slds-g-color-border-1)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => toggle(key),
      "aria-expanded": isOpen,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        width: "100%",
        padding: "0.75rem 0.25rem",
        font: "inherit",
        fontSize: "var(--slds-g-text-heading-small)",
        fontWeight: "var(--slds-g-font-weight-semibold)",
        color: "var(--slds-g-color-on-surface-1)",
        background: "transparent",
        border: 0,
        cursor: "pointer",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      iconName: "utility:chevronright",
      size: "xx-small",
      style: {
        color: "var(--slds-g-color-on-surface-2)",
        transition: "transform var(--slds-g-duration-quickly) var(--slds-g-ease-out)",
        transform: isOpen ? "rotate(90deg)" : "none"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, s.label)), isOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 0.25rem 1rem 1.75rem",
        fontSize: "var(--slds-g-text-body-regular)",
        lineHeight: "var(--slds-g-font-lineheight-body)",
        color: "var(--slds-g-color-on-surface-2)"
      }
    }, s.content));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/containers/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/containers/Carousel.jsx
try { (() => {
/**
 * SLDS Carousel — cycle through a set of slides with indicator dots and
 * optional arrows. slides: [{ key?, content }] or any React nodes.
 */
function Carousel({
  slides = [],
  height = 220,
  showArrows = true,
  className = "",
  style = {}
}) {
  const [i, setI] = React.useState(0);
  const n = slides.length;
  const go = next => setI((next % n + n) % n);
  return /*#__PURE__*/React.createElement("div", {
    className: `slds2-carousel ${className}`,
    style: {
      position: "relative",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      borderRadius: "var(--slds-g-radius-border-4)",
      border: "1px solid var(--slds-g-color-border-1)",
      background: "var(--slds-g-color-surface-container-1)",
      overflow: "hidden",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      width: "100%",
      transform: `translateX(-${i * 100}%)`,
      transition: "transform var(--slds-g-duration-promptly) var(--slds-g-ease-in-out)"
    }
  }, slides.map((s, idx) => /*#__PURE__*/React.createElement("div", {
    key: s.key ?? idx,
    style: {
      flex: "0 0 100%",
      width: "100%",
      height: "100%"
    }
  }, s.content ?? s)))), showArrows && n > 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Previous",
    onClick: () => go(i - 1),
    style: arrowStyle("left")
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: "utility:chevronleft",
    size: "x-small",
    style: {
      color: "var(--slds-g-color-on-surface-1)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Next",
    onClick: () => go(i + 1),
    style: arrowStyle("right")
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: "utility:chevronright",
    size: "x-small",
    style: {
      color: "var(--slds-g-color-on-surface-1)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: "0.375rem",
      marginTop: "0.625rem"
    }
  }, slides.map((_, idx) => /*#__PURE__*/React.createElement("button", {
    key: idx,
    type: "button",
    "aria-label": `Slide ${idx + 1}`,
    onClick: () => setI(idx),
    style: {
      width: idx === i ? "1.25rem" : "0.5rem",
      height: "0.5rem",
      padding: 0,
      border: 0,
      borderRadius: "var(--slds-g-radius-border-pill)",
      background: idx === i ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-2)",
      cursor: "pointer",
      transition: "width var(--slds-g-duration-quickly) var(--slds-g-ease-out)"
    }
  }))));
}
function arrowStyle(side) {
  return {
    position: "absolute",
    top: "calc(50% - 1rem - 0.625rem)",
    [side]: "0.5rem",
    transform: "translateY(-50%)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2rem",
    height: "2rem",
    borderRadius: "var(--slds-g-radius-border-circle)",
    background: "var(--slds-g-color-surface-container-1)",
    border: "1px solid var(--slds-g-color-border-1)",
    boxShadow: "var(--slds-g-shadow-2)",
    cursor: "pointer"
  };
}
Object.assign(__ds_scope, { Carousel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/containers/Carousel.jsx", error: String((e && e.message) || e) }); }

// components/containers/Tile.jsx
try { (() => {
/**
 * SLDS Tile — a compact summary block for a record in a list/related panel.
 * Title (optional link), optional leading avatar/icon, meta lines, actions.
 */
function Tile({
  title,
  href,
  onTitleClick,
  iconName,
  avatar,
  meta = [],
  actions,
  children,
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: `slds2-tile ${className}`,
    style: {
      display: "flex",
      gap: "0.625rem",
      padding: "0.75rem",
      background: "var(--slds-g-color-surface-container-1)",
      border: "1px solid var(--slds-g-color-border-1)",
      borderRadius: "var(--slds-g-radius-border-3)",
      ...style
    }
  }, (iconName || avatar) && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      paddingTop: 1
    }
  }, avatar || /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: iconName,
    size: "small"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, href || onTitleClick ? /*#__PURE__*/React.createElement("a", {
    href: href || "#",
    onClick: onTitleClick,
    style: {
      fontSize: "var(--slds-g-text-body-regular)",
      fontWeight: "var(--slds-g-font-weight-semibold)",
      color: "var(--slds-g-color-accent-1)",
      textDecoration: "none"
    }
  }, title) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--slds-g-text-body-regular)",
      fontWeight: "var(--slds-g-font-weight-semibold)",
      color: "var(--slds-g-color-on-surface-1)"
    }
  }, title)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none"
    }
  }, actions)), meta.length > 0 && /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: "0.25rem 0 0",
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      columnGap: "0.5rem",
      rowGap: "0.125rem"
    }
  }, meta.map((m, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-on-surface-3)"
    }
  }, m.label), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-on-surface-2)"
    }
  }, m.value)))), children));
}
Object.assign(__ds_scope, { Tile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/containers/Tile.jsx", error: String((e && e.message) || e) }); }

// components/data/Datatable.jsx
try { (() => {
/**
 * SLDS Datatable — a styled record grid with header, optional row selection,
 * sortable-column affordance, and a row-actions slot.
 * columns: [{ key, label, width, align, render }]
 * rows: array of record objects (need a unique `id`).
 */
function Datatable({
  columns = [],
  rows = [],
  selectable = false,
  sortBy,
  sortDir = "asc",
  onSort,
  rowActions,
  className = "",
  style = {}
}) {
  const [selected, setSelected] = React.useState([]);
  const allChecked = selectable && rows.length > 0 && selected.length === rows.length;
  const toggleAll = () => setSelected(allChecked ? [] : rows.map(r => r.id));
  const toggleOne = id => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const checkbox = (checked, onClick) => /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1rem",
      height: "1rem",
      borderRadius: "var(--slds-g-radius-border-2)",
      background: checked ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-surface-container-1)",
      border: `1px solid ${checked ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-2)"}`,
      cursor: "pointer",
      flex: "none"
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M13.5 4.5L6.5 11.5L3 8",
    stroke: "#fff",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
  const th = {
    padding: "0.5rem 0.75rem",
    textAlign: "left",
    whiteSpace: "nowrap",
    fontSize: "var(--slds-g-text-body-small)",
    fontWeight: "var(--slds-g-font-weight-bold)",
    textTransform: "uppercase",
    letterSpacing: ".04em",
    color: "var(--slds-g-color-on-surface-3)"
  };
  const td = {
    padding: "0.625rem 0.75rem",
    fontSize: "var(--slds-g-text-body-regular)",
    color: "var(--slds-g-color-on-surface-1)",
    borderTop: "1px solid var(--slds-g-color-border-1)"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `slds2-datatable ${className}`,
    style: {
      overflowX: "auto",
      background: "var(--slds-g-color-surface-container-1)",
      border: "1px solid var(--slds-g-color-border-1)",
      borderRadius: "var(--slds-g-radius-border-4)",
      boxShadow: "var(--slds-g-shadow-1)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "var(--slds-g-color-surface-1)"
    }
  }, selectable && /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      width: 40
    }
  }, checkbox(allChecked, toggleAll)), columns.map(c => {
    const active = sortBy === c.key;
    return /*#__PURE__*/React.createElement("th", {
      key: c.key,
      style: {
        ...th,
        width: c.width,
        textAlign: c.align || "left",
        cursor: c.sortable ? "pointer" : "default"
      },
      onClick: () => c.sortable && onSort && onSort(c.key, active && sortDir === "asc" ? "desc" : "asc")
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem"
      }
    }, c.label, c.sortable && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      iconName: active ? sortDir === "asc" ? "utility:arrowup" : "utility:arrowdown" : "utility:arrowdown",
      size: "xx-small",
      style: {
        color: active ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-3)",
        fontSize: 12
      }
    })));
  }), rowActions && /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      width: 40
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => {
    const checked = selected.includes(r.id);
    return /*#__PURE__*/React.createElement("tr", {
      key: r.id,
      style: {
        background: checked ? "var(--slds-g-color-accent-container-1)" : "transparent"
      },
      onMouseEnter: e => {
        if (!checked) e.currentTarget.style.background = "var(--slds-g-color-surface-1)";
      },
      onMouseLeave: e => {
        if (!checked) e.currentTarget.style.background = "transparent";
      }
    }, selectable && /*#__PURE__*/React.createElement("td", {
      style: td
    }, checkbox(checked, () => toggleOne(r.id))), columns.map(c => /*#__PURE__*/React.createElement("td", {
      key: c.key,
      style: {
        ...td,
        textAlign: c.align || "left"
      }
    }, c.render ? c.render(r[c.key], r) : r[c.key])), rowActions && /*#__PURE__*/React.createElement("td", {
      style: {
        ...td,
        textAlign: "right"
      }
    }, rowActions(r)));
  }))));
}
Object.assign(__ds_scope, { Datatable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Datatable.jsx", error: String((e && e.message) || e) }); }

// components/data/Tree.jsx
try { (() => {
/**
 * SLDS Tree — a nested, expand/collapse hierarchy.
 * nodes: [{ id, label, iconName, children: [...] }]
 */
function Tree({
  nodes = [],
  defaultExpanded,
  value,
  onSelect,
  className = "",
  style = {}
}) {
  const [expanded, setExpanded] = React.useState(() => new Set(defaultExpanded || collectIds(nodes, 1)));
  const [selected, setSelected] = React.useState(value);
  const current = value !== undefined ? value : selected;
  const toggle = id => setExpanded(s => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });
  const pick = id => {
    setSelected(id);
    onSelect && onSelect(id);
  };
  const renderNodes = (list, depth) => list.map(node => {
    const hasKids = node.children && node.children.length > 0;
    const isOpen = expanded.has(node.id);
    const on = node.id === current;
    return /*#__PURE__*/React.createElement("li", {
      key: node.id,
      role: "treeitem",
      "aria-expanded": hasKids ? isOpen : undefined
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => pick(node.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0.375rem",
        padding: "0.375rem 0.5rem",
        paddingLeft: `calc(0.5rem + ${depth * 1.25}rem)`,
        borderRadius: "var(--slds-g-radius-border-2)",
        background: on ? "var(--slds-g-color-surface-3)" : "transparent",
        fontSize: "var(--slds-g-text-body-regular)",
        color: "var(--slds-g-color-on-surface-1)",
        cursor: "pointer"
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = "var(--slds-g-color-surface-2)";
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement("span", {
      onClick: e => {
        e.stopPropagation();
        if (hasKids) toggle(node.id);
      },
      style: {
        width: 16,
        display: "inline-flex",
        justifyContent: "center",
        flex: "none"
      }
    }, hasKids && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      iconName: "utility:chevronright",
      size: "xx-small",
      style: {
        color: "var(--slds-g-color-on-surface-2)",
        fontSize: 13,
        transition: "transform var(--slds-g-duration-quickly) var(--slds-g-ease-out)",
        transform: isOpen ? "rotate(90deg)" : "none"
      }
    })), node.iconName && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      iconName: node.iconName,
      size: "x-small",
      style: {
        color: "var(--slds-g-color-on-surface-2)",
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, node.label)), hasKids && isOpen && /*#__PURE__*/React.createElement("ul", {
      role: "group",
      style: {
        listStyle: "none",
        margin: 0,
        padding: 0
      }
    }, renderNodes(node.children, depth + 1)));
  });
  return /*#__PURE__*/React.createElement("ul", {
    role: "tree",
    className: `slds2-tree ${className}`,
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      ...style
    }
  }, renderNodes(nodes, 0));
}
function collectIds(nodes, maxDepth, depth = 0, acc = []) {
  if (depth >= maxDepth) return acc;
  nodes.forEach(n => {
    if (n.children) {
      acc.push(n.id);
      collectIds(n.children, maxDepth, depth + 1, acc);
    }
  });
  return acc;
}
Object.assign(__ds_scope, { Tree });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Tree.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
const SIZES = {
  "x-small": 20,
  small: 24,
  medium: 32,
  large: 48,
  "x-large": 64
};
function Avatar({
  src,
  initials,
  iconName = "standard:user",
  size = "medium",
  variant = "circle",
  alt = "",
  className = "",
  style = {}
}) {
  const dim = SIZES[size] || SIZES.medium;
  const radius = variant === "circle" ? "var(--slds-g-radius-border-circle)" : "var(--slds-g-radius-border-3)";
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: dim,
    height: dim,
    borderRadius: radius,
    overflow: "hidden",
    flex: "none",
    ...style
  };
  if (src) {
    return /*#__PURE__*/React.createElement("img", {
      className: className,
      src: src,
      alt: alt,
      style: {
        ...base,
        objectFit: "cover"
      }
    });
  }
  if (initials) {
    return /*#__PURE__*/React.createElement("span", {
      className: className,
      style: {
        ...base,
        background: "var(--slds-g-color-palette-blue-60)",
        color: "#fff",
        fontSize: Math.round(dim * 0.4),
        fontWeight: "var(--slds-g-font-weight-semibold)",
        letterSpacing: ".02em"
      }
    }, initials);
  }
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      ...base
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: iconName,
    size: dim >= 48 ? "large" : "small"
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function Card({
  title,
  iconName,
  actions,
  footer,
  children,
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: `slds2-card ${className}`,
    style: {
      background: "var(--slds-g-color-surface-container-1)",
      border: "1px solid var(--slds-g-color-border-1)",
      borderRadius: "var(--slds-g-radius-border-4)",
      boxShadow: "var(--slds-g-shadow-2)",
      overflow: "hidden",
      ...style
    }
  }, (title || actions) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.75rem 1rem"
    }
  }, iconName && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: iconName,
    size: "small"
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      flex: 1,
      margin: 0,
      fontSize: "var(--slds-g-text-heading-small)",
      fontWeight: "var(--slds-g-font-weight-bold)",
      color: "var(--slds-g-color-on-surface-1)"
    }
  }, title), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.5rem",
      alignItems: "center"
    }
  }, actions)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 1rem 1rem"
    }
  }, children), footer && /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: "0.75rem 1rem",
      borderTop: "1px solid var(--slds-g-color-border-1)",
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-on-surface-3)",
      textAlign: "center"
    }
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/EmptyState.jsx
try { (() => {
/**
 * SLDS Empty State / Illustration — a centered message shown when there's no
 * data, no results, or an error, with an icon and optional action.
 */
function EmptyState({
  iconName = "standard:empty",
  title,
  message,
  action,
  size = "medium",
  className = "",
  style = {}
}) {
  const pad = size === "small" ? "1.5rem 1rem" : "3rem 1.5rem";
  return /*#__PURE__*/React.createElement("div", {
    className: `slds2-empty-state ${className}`,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: pad,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size === "small" ? "3rem" : "4rem",
      height: size === "small" ? "3rem" : "4rem",
      borderRadius: "var(--slds-g-radius-border-circle)",
      background: "var(--slds-g-color-surface-3)",
      marginBottom: "1rem"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: iconName,
    size: "large",
    style: {
      color: "var(--slds-g-color-on-surface-3)"
    }
  })), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--slds-g-text-heading-medium)",
      fontWeight: "var(--slds-g-font-weight-bold)",
      color: "var(--slds-g-color-on-surface-1)",
      margin: 0
    }
  }, title), message && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "0.375rem",
      maxWidth: "26rem",
      fontSize: "var(--slds-g-text-body-regular)",
      color: "var(--slds-g-color-on-surface-3)"
    }
  }, message), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "1.25rem"
    }
  }, action));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/display/Helptext.jsx
try { (() => {
/**
 * SLDS Helptext — a small info "?" icon that reveals a tooltip on hover/focus.
 */
function Helptext({
  content,
  iconName = "utility:info",
  align = "top",
  className = "",
  style = {}
}) {
  const [show, setShow] = React.useState(false);
  const pos = align === "bottom" ? {
    top: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)"
  } : align === "left" ? {
    right: "calc(100% + 8px)",
    top: "50%",
    transform: "translateY(-50%)"
  } : align === "right" ? {
    left: "calc(100% + 8px)",
    top: "50%",
    transform: "translateY(-50%)"
  } : {
    bottom: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)"
  };
  return /*#__PURE__*/React.createElement("span", {
    className: `slds2-helptext ${className}`,
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false),
    tabIndex: 0,
    role: "button",
    "aria-label": "Help"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: iconName,
    size: "x-small",
    style: {
      color: "var(--slds-g-color-on-surface-3)",
      cursor: "help"
    }
  }), show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      ...pos,
      zIndex: 40,
      width: "max-content",
      maxWidth: "16rem",
      padding: "0.5rem 0.625rem",
      fontSize: "var(--slds-g-text-body-small)",
      lineHeight: 1.4,
      color: "var(--slds-g-color-on-surface-inverse-1)",
      background: "var(--slds-g-color-surface-inverse-1)",
      borderRadius: "var(--slds-g-radius-border-2)",
      boxShadow: "var(--slds-g-shadow-3)",
      textAlign: "left"
    }
  }, content));
}
Object.assign(__ds_scope, { Helptext });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Helptext.jsx", error: String((e && e.message) || e) }); }

// components/display/Pill.jsx
try { (() => {
/** SLDS Pill — a removable token for filters, selections, or lookups. */
function Pill({
  label,
  children,
  iconName,
  onRemove,
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `slds2-pill ${className}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.375rem",
      height: "1.5rem",
      padding: iconName ? "0 0.25rem 0 0.375rem" : "0 0.5rem",
      paddingRight: onRemove ? "0.125rem" : undefined,
      background: "var(--slds-g-color-surface-container-1)",
      border: "1px solid var(--slds-g-color-border-2)",
      borderRadius: "var(--slds-g-radius-border-2)",
      fontSize: "var(--slds-g-font-scale-neg-1)",
      color: "var(--slds-g-color-on-surface-1)",
      whiteSpace: "nowrap",
      ...style
    }
  }, iconName && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: iconName,
    size: "xx-small"
  }), /*#__PURE__*/React.createElement("span", null, label ?? children), onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1.125rem",
      height: "1.125rem",
      padding: 0,
      border: 0,
      background: "transparent",
      borderRadius: "var(--slds-g-radius-border-circle)",
      color: "var(--slds-g-color-on-surface-3)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: "utility:close",
    size: "xx-small",
    style: {
      color: "inherit",
      fontSize: 13
    }
  })));
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Pill.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
const THEMES = {
  info: {
    bg: "var(--slds-g-color-palette-cloud-blue-50)",
    icon: "utility:info",
    fg: "#fff"
  },
  success: {
    bg: "var(--slds-g-color-success-1)",
    icon: "utility:success",
    fg: "#fff"
  },
  warning: {
    bg: "var(--slds-g-color-warning-1)",
    icon: "utility:warning",
    fg: "var(--slds-g-color-palette-neutral-10)"
  },
  error: {
    bg: "var(--slds-g-color-error-1)",
    icon: "utility:error",
    fg: "#fff"
  }
};

/** SLDS Alert — a full-width, persistent notification bar pinned in context. */
function Alert({
  variant = "info",
  children,
  iconName,
  onClose,
  className = "",
  style = {}
}) {
  const t = THEMES[variant] || THEMES.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "alert",
    className: `slds2-alert ${className}`,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.625rem",
      width: "100%",
      padding: "0.5rem 0.875rem",
      background: t.bg,
      color: t.fg,
      fontSize: "var(--slds-g-text-body-regular)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: iconName || t.icon,
    size: "x-small",
    filled: true,
    style: {
      color: t.fg,
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      lineHeight: 1.4
    }
  }, children), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1.25rem",
      height: "1.25rem",
      flex: "none",
      padding: 0,
      border: 0,
      background: "transparent",
      color: t.fg,
      cursor: "pointer",
      opacity: 0.85
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: "utility:close",
    size: "xx-small",
    style: {
      color: "inherit",
      fontSize: 14
    }
  })));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Spinner.jsx
try { (() => {
const SIZES = {
  "x-small": 16,
  small: 20,
  medium: 28,
  large: 40
};

/** SLDS Spinner — a circular brand loading indicator. */
function Spinner({
  size = "medium",
  inverse = false,
  className = "",
  style = {}
}) {
  const dim = SIZES[size] || SIZES.medium;
  const track = inverse ? "rgba(255,255,255,0.3)" : "var(--slds-g-color-border-2)";
  const head = inverse ? "#fff" : "var(--slds-g-color-accent-1)";
  return /*#__PURE__*/React.createElement("span", {
    role: "status",
    "aria-label": "Loading",
    className: `slds2-spinner ${className}`,
    style: {
      display: "inline-block",
      width: dim,
      height: dim,
      border: `${Math.max(2, Math.round(dim / 10))}px solid ${track}`,
      borderTopColor: head,
      borderRadius: "50%",
      animation: "slds2-spin 0.8s linear infinite",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes slds2-spin{to{transform:rotate(360deg)}}`));
}
Object.assign(__ds_scope, { Spinner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Spinner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tabs.jsx
try { (() => {
/** SLDS Tabs — underlined tab bar for switching views. */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  className = "",
  style = {}
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? (tabs[0] && tabs[0].value));
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const pick = val => {
    if (!isControlled) setInternal(val);
    onChange && onChange(val);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    className: `slds2-tabs ${className}`,
    style: {
      display: "flex",
      gap: "1.25rem",
      borderBottom: "1px solid var(--slds-g-color-border-1)",
      ...style
    }
  }, tabs.map(t => {
    const on = current === t.value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => pick(t.value),
      style: {
        position: "relative",
        padding: "0.625rem 0.125rem",
        font: "inherit",
        fontSize: "var(--slds-g-text-body-regular)",
        fontWeight: on ? "var(--slds-g-font-weight-bold)" : "var(--slds-g-font-weight-regular)",
        color: on ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-on-surface-2)",
        background: "transparent",
        border: 0,
        borderBottom: `2px solid ${on ? "var(--slds-g-color-accent-1)" : "transparent"}`,
        marginBottom: "-1px",
        cursor: "pointer",
        transition: "color var(--slds-g-duration-quickly) var(--slds-g-ease-out)"
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.color = "var(--slds-g-color-on-surface-1)";
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.color = "var(--slds-g-color-on-surface-2)";
      }
    }, t.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const THEMES = {
  info: {
    bg: "var(--slds-g-color-palette-cloud-blue-50)",
    icon: "utility:info"
  },
  success: {
    bg: "var(--slds-g-color-success-1)",
    icon: "utility:success"
  },
  warning: {
    bg: "var(--slds-g-color-warning-1)",
    icon: "utility:warning"
  },
  error: {
    bg: "var(--slds-g-color-error-1)",
    icon: "utility:error"
  }
};

/** SLDS Toast — a transient confirmation/alert banner. */
function Toast({
  variant = "info",
  title,
  message,
  onClose,
  className = "",
  style = {}
}) {
  const t = THEMES[variant] || THEMES.info;
  const onWarning = variant === "warning";
  const fg = onWarning ? "var(--slds-g-color-palette-neutral-10)" : "#fff";
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    className: `slds2-toast ${className}`,
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.625rem",
      minWidth: "20rem",
      maxWidth: "32rem",
      padding: "0.625rem 0.75rem",
      background: t.bg,
      color: fg,
      borderRadius: "var(--slds-g-radius-border-3)",
      boxShadow: "var(--slds-g-shadow-4)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: t.icon,
    size: "small",
    filled: true,
    style: {
      color: fg,
      flex: "none",
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: "var(--slds-g-text-body-regular)",
      lineHeight: 1.4
    }
  }, title && /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: "var(--slds-g-font-weight-bold)"
    }
  }, title), title && message && " ", message), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1.25rem",
      height: "1.25rem",
      flex: "none",
      padding: 0,
      border: 0,
      background: "transparent",
      color: fg,
      cursor: "pointer",
      opacity: 0.85
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: "utility:close",
    size: "xx-small",
    style: {
      color: "inherit",
      fontSize: 14
    }
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** SLDS Checkbox — a single labeled boolean. */
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  className = "",
  style = {}
}) {
  const [internal, setInternal] = React.useState(Boolean(defaultChecked));
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const toggle = e => {
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    className: `slds2-checkbox ${className}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: on,
    onChange: toggle,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 1,
      height: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1rem",
      height: "1rem",
      flex: "none",
      background: on ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-surface-container-1)",
      border: `1px solid ${on ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-3)"}`,
      borderRadius: "var(--slds-g-radius-border-2)",
      transition: "background var(--slds-g-duration-quickly) var(--slds-g-ease-out)"
    }
  }, on && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: "utility:check",
    size: "xx-small",
    style: {
      color: "#fff",
      fontSize: 12
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--slds-g-text-body-regular)",
      color: "var(--slds-g-color-on-surface-1)"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/CheckboxGroup.jsx
try { (() => {
/**
 * SLDS Checkbox Group — a labeled set of related checkboxes (multi-select).
 * options: [{ label, value }]. Controlled via value (array) or uncontrolled.
 */
function CheckboxGroup({
  label,
  options = [],
  value,
  defaultValue = [],
  onChange,
  disabled = false,
  className = "",
  style = {}
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const selected = isControlled ? value : internal;
  const toggle = val => {
    const next = selected.includes(val) ? selected.filter(v => v !== val) : [...selected, val];
    if (!isControlled) setInternal(next);
    onChange && onChange(next);
  };
  return /*#__PURE__*/React.createElement("fieldset", {
    className: `slds2-checkbox-group ${className}`,
    style: {
      border: 0,
      margin: 0,
      padding: 0,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("legend", {
    style: {
      marginBottom: "0.375rem",
      padding: 0,
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-on-surface-2)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    }
  }, options.map(o => {
    const checked = selected.includes(o.value);
    return /*#__PURE__*/React.createElement("label", {
      key: o.value,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      onClick: () => !disabled && toggle(o.value),
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "1rem",
        height: "1rem",
        flex: "none",
        borderRadius: "var(--slds-g-radius-border-2)",
        background: checked ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-surface-container-1)",
        border: `1px solid ${checked ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-2)"}`
      }
    }, checked && /*#__PURE__*/React.createElement("svg", {
      width: "11",
      height: "11",
      viewBox: "0 0 16 16",
      fill: "none",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M13.5 4.5L6.5 11.5L3 8",
      stroke: "#fff",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--slds-g-text-body-regular)",
        color: "var(--slds-g-color-on-surface-1)"
      }
    }, o.label));
  })));
}
Object.assign(__ds_scope, { CheckboxGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/CheckboxGroup.jsx", error: String((e && e.message) || e) }); }

// components/forms/Combobox.jsx
try { (() => {
/** SLDS Combobox — a styled single-select dropdown. */
function Combobox({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  style = {}
}) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const ref = React.useRef(null);
  const selected = options.find(o => o.value === current);
  React.useEffect(() => {
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const pick = val => {
    if (!isControlled) setInternal(val);
    onChange && onChange(val);
    setOpen(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `slds2-combobox ${className}`,
    style: {
      ...style
    },
    ref: ref
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      marginBottom: "0.25rem",
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-on-surface-2)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: () => setOpen(o => !o),
    style: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "2rem",
      padding: "0 0.5rem 0 0.75rem",
      font: "inherit",
      fontSize: "var(--slds-g-text-body-regular)",
      textAlign: "left",
      color: selected ? "var(--slds-g-color-on-surface-1)" : "var(--slds-g-color-on-surface-3)",
      background: "var(--slds-g-color-surface-container-1)",
      border: `1px solid ${open ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-2)"}`,
      borderRadius: "var(--slds-g-radius-border-3)",
      boxShadow: open ? "var(--slds-g-shadow-focus)" : "none",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, selected ? selected.label : placeholder), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: "utility:chevrondown",
    size: "xx-small",
    style: {
      color: "var(--slds-g-color-on-surface-3)"
    }
  })), open && /*#__PURE__*/React.createElement("ul", {
    role: "listbox",
    style: {
      position: "absolute",
      top: "calc(100% + 4px)",
      left: 0,
      right: 0,
      zIndex: 20,
      margin: 0,
      padding: "0.25rem",
      listStyle: "none",
      background: "var(--slds-g-color-surface-container-1)",
      border: "1px solid var(--slds-g-color-border-1)",
      borderRadius: "var(--slds-g-radius-border-3)",
      boxShadow: "var(--slds-g-shadow-4)",
      maxHeight: "12rem",
      overflowY: "auto"
    }
  }, options.map(opt => {
    const on = opt.value === current;
    return /*#__PURE__*/React.createElement("li", {
      key: opt.value,
      role: "option",
      "aria-selected": on,
      onClick: () => pick(opt.value),
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 0.625rem",
        borderRadius: "var(--slds-g-radius-border-2)",
        fontSize: "var(--slds-g-text-body-regular)",
        color: "var(--slds-g-color-on-surface-1)",
        background: on ? "var(--slds-g-color-surface-3)" : "transparent",
        cursor: "pointer"
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = "var(--slds-g-color-surface-3)";
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        flex: "none"
      }
    }, on && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      iconName: "utility:check",
      size: "xx-small",
      variant: "brand"
    })), opt.label);
  }))));
}
Object.assign(__ds_scope, { Combobox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Combobox.jsx", error: String((e && e.message) || e) }); }

// components/forms/DualListbox.jsx
try { (() => {
/**
 * SLDS Dual Listbox — move options between a Source list and a Selected list.
 * options: [{ label, value }]. Uncontrolled selection by default.
 */
function DualListbox({
  label,
  sourceLabel = "Available",
  selectedLabel = "Selected",
  options = [],
  value,
  defaultValue = [],
  onChange,
  className = "",
  style = {}
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const selected = isControlled ? value : internal;
  const [highlight, setHighlight] = React.useState(null);
  const setSel = next => {
    if (!isControlled) setInternal(next);
    onChange && onChange(next);
  };
  const source = options.filter(o => !selected.includes(o.value));
  const chosen = options.filter(o => selected.includes(o.value));
  const move = (val, into) => {
    setSel(into ? [...selected, val] : selected.filter(v => v !== val));
    setHighlight(null);
  };
  const list = (rows, into) => /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: "0.25rem",
      height: "11rem",
      overflowY: "auto",
      background: "var(--slds-g-color-surface-container-1)",
      border: "1px solid var(--slds-g-color-border-2)",
      borderRadius: "var(--slds-g-radius-border-3)"
    }
  }, rows.map(o => /*#__PURE__*/React.createElement("li", {
    key: o.value,
    onClick: () => setHighlight({
      val: o.value,
      into
    }),
    onDoubleClick: () => move(o.value, into),
    style: {
      padding: "0.4rem 0.5rem",
      borderRadius: "var(--slds-g-radius-border-2)",
      fontSize: "var(--slds-g-text-body-regular)",
      color: "var(--slds-g-color-on-surface-1)",
      background: highlight && highlight.val === o.value ? "var(--slds-g-color-accent-container-1)" : "transparent",
      cursor: "pointer"
    }
  }, o.label)));
  const moveBtn = (icon, into) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => highlight && move(highlight.val, into),
    "aria-label": into ? "Add" : "Remove",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "2rem",
      height: "2rem",
      borderRadius: "var(--slds-g-radius-border-2)",
      border: "1px solid var(--slds-g-color-border-2)",
      background: "var(--slds-g-color-surface-container-1)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: icon,
    size: "x-small",
    style: {
      color: "var(--slds-g-color-accent-1)"
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: `slds2-dual-listbox ${className}`,
    style: style
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "0.375rem",
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-on-surface-2)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      gap: "0.625rem",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "0.25rem",
      fontSize: "var(--slds-g-text-body-small)",
      fontWeight: "var(--slds-g-font-weight-semibold)",
      color: "var(--slds-g-color-on-surface-3)"
    }
  }, sourceLabel), list(source, true)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.375rem"
    }
  }, moveBtn("utility:right", true), moveBtn("utility:left", false)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "0.25rem",
      fontSize: "var(--slds-g-text-body-small)",
      fontWeight: "var(--slds-g-font-weight-semibold)",
      color: "var(--slds-g-color-on-surface-3)"
    }
  }, selectedLabel), list(chosen, false))));
}
Object.assign(__ds_scope, { DualListbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/DualListbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/FileUpload.jsx
try { (() => {
/**
 * SLDS File Upload — a drop zone + browse button. Visual/interaction shell;
 * surfaces selected file names (no real upload).
 */
function FileUpload({
  label,
  accept,
  multiple = true,
  onFiles,
  className = "",
  style = {}
}) {
  const [over, setOver] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const inputRef = React.useRef(null);
  const take = list => {
    const arr = Array.from(list || []);
    setFiles(arr.map(f => f.name));
    onFiles && onFiles(arr);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `slds2-file-upload ${className}`,
    style: style
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "0.375rem",
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-on-surface-2)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    onClick: () => inputRef.current && inputRef.current.click(),
    onDragOver: e => {
      e.preventDefault();
      setOver(true);
    },
    onDragLeave: () => setOver(false),
    onDrop: e => {
      e.preventDefault();
      setOver(false);
      take(e.dataTransfer.files);
    },
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      padding: "1.5rem",
      textAlign: "center",
      background: over ? "var(--slds-g-color-accent-container-1)" : "var(--slds-g-color-surface-2)",
      border: `2px dashed ${over ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-2)"}`,
      borderRadius: "var(--slds-g-radius-border-4)",
      cursor: "pointer",
      transition: "background var(--slds-g-duration-quickly) var(--slds-g-ease-out)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: "utility:upload",
    size: "medium",
    style: {
      color: "var(--slds-g-color-accent-1)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--slds-g-text-body-regular)",
      color: "var(--slds-g-color-on-surface-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--slds-g-color-accent-1)",
      fontWeight: "var(--slds-g-font-weight-semibold)"
    }
  }, "Upload Files"), " or drop them here"), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "file",
    accept: accept,
    multiple: multiple,
    onChange: e => take(e.target.files),
    style: {
      display: "none"
    }
  })), files.length > 0 && /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: "0.625rem 0 0",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.375rem"
    }
  }, files.map((name, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.375rem 0.5rem",
      background: "var(--slds-g-color-surface-container-1)",
      border: "1px solid var(--slds-g-color-border-1)",
      borderRadius: "var(--slds-g-radius-border-2)",
      fontSize: "var(--slds-g-text-body-small)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: "doctype:attachment",
    size: "x-small"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, name), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: "utility:success",
    size: "xx-small",
    variant: "success"
  })))));
}
Object.assign(__ds_scope, { FileUpload });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FileUpload.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let _id = 0;
function Input({
  label,
  value,
  defaultValue,
  onChange,
  type = "text",
  placeholder,
  required = false,
  readOnly = false,
  disabled = false,
  error,
  iconName,
  className = "",
  style = {},
  ...rest
}) {
  const id = React.useMemo(() => `slds2-input-${++_id}`, []);
  const invalid = Boolean(error);
  const [focus, setFocus] = React.useState(false);
  const fieldStyle = {
    width: "100%",
    height: "2rem",
    padding: iconName ? "0 0.75rem 0 2rem" : "0 0.75rem",
    font: "inherit",
    fontSize: "var(--slds-g-text-body-regular)",
    color: "var(--slds-g-color-on-surface-1)",
    background: readOnly ? "transparent" : "var(--slds-g-color-surface-container-1)",
    border: readOnly ? "1px solid transparent" : `1px solid ${invalid ? "var(--slds-g-color-error-1)" : "var(--slds-g-color-border-2)"}`,
    borderRadius: "var(--slds-g-radius-border-3)",
    outline: "none",
    boxShadow: focus && !readOnly ? "var(--slds-g-shadow-focus)" : "none",
    transition: "box-shadow var(--slds-g-duration-quickly) var(--slds-g-ease-out)",
    opacity: disabled ? 0.5 : 1
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `slds2-form-element ${className}`,
    style: style
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: "block",
      marginBottom: "0.25rem",
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-on-surface-2)"
    }
  }, required && !readOnly && /*#__PURE__*/React.createElement("abbr", {
    title: "required",
    style: {
      color: "var(--slds-g-color-error-1)",
      textDecoration: "none",
      marginRight: 2
    }
  }, "*"), label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, iconName && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: iconName,
    size: "x-small",
    style: {
      position: "absolute",
      left: "0.5rem",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: type,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    placeholder: placeholder,
    required: required,
    readOnly: readOnly,
    disabled: disabled,
    "aria-invalid": invalid,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: fieldStyle
  }, rest))), invalid && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0.25rem 0 0",
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-error-1)"
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioGroup.jsx
try { (() => {
let _gid = 0;

/** SLDS Radio Group — pick one of a small set of options. */
function RadioGroup({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  name,
  disabled = false,
  className = "",
  style = {}
}) {
  const groupName = React.useMemo(() => name || `slds2-radio-${++_gid}`, [name]);
  const [internal, setInternal] = React.useState(defaultValue ?? (options[0] && options[0].value));
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const pick = val => {
    if (!isControlled) setInternal(val);
    onChange && onChange(val);
  };
  return /*#__PURE__*/React.createElement("fieldset", {
    className: `slds2-radio-group ${className}`,
    style: {
      border: 0,
      margin: 0,
      padding: 0,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("legend", {
    style: {
      padding: 0,
      marginBottom: "0.375rem",
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-on-surface-2)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    }
  }, options.map(opt => {
    const on = current === opt.value;
    return /*#__PURE__*/React.createElement("label", {
      key: opt.value,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: groupName,
      checked: on,
      onChange: () => pick(opt.value),
      disabled: disabled,
      style: {
        position: "absolute",
        opacity: 0,
        width: 1,
        height: 1
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "1rem",
        height: "1rem",
        flex: "none",
        background: "var(--slds-g-color-surface-container-1)",
        border: `1px solid ${on ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-3)"}`,
        borderRadius: "50%"
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        width: "0.5rem",
        height: "0.5rem",
        borderRadius: "50%",
        background: "var(--slds-g-color-accent-1)"
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--slds-g-text-body-regular)",
        color: "var(--slds-g-color-on-surface-1)"
      }
    }, opt.label));
  })));
}
Object.assign(__ds_scope, { RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
let _sid = 0;

/** SLDS Select — a native <select> styled to match SLDS form controls. */
function Select({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  required = false,
  disabled = false,
  error,
  className = "",
  style = {}
}) {
  const id = React.useMemo(() => `slds2-select-${++_sid}`, []);
  const [focus, setFocus] = React.useState(false);
  const invalid = Boolean(error);
  return /*#__PURE__*/React.createElement("div", {
    className: `slds2-form-element ${className}`,
    style: style
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: "block",
      marginBottom: "0.25rem",
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-on-surface-2)"
    }
  }, required && /*#__PURE__*/React.createElement("abbr", {
    title: "required",
    style: {
      color: "var(--slds-g-color-error-1)",
      textDecoration: "none",
      marginRight: 2
    }
  }, "*"), label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("select", {
    id: id,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    required: required,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      width: "100%",
      height: "2rem",
      padding: "0 2rem 0 0.75rem",
      font: "inherit",
      fontSize: "var(--slds-g-text-body-regular)",
      color: "var(--slds-g-color-on-surface-1)",
      background: "var(--slds-g-color-surface-container-1)",
      border: `1px solid ${invalid ? "var(--slds-g-color-error-1)" : "var(--slds-g-color-border-2)"}`,
      borderRadius: "var(--slds-g-radius-border-3)",
      outline: "none",
      boxShadow: focus ? "var(--slds-g-shadow-focus)" : "none",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1
    }
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value ?? o,
    value: o.value ?? o
  }, o.label ?? o))), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: "utility:chevrondown",
    size: "xx-small",
    style: {
      position: "absolute",
      right: "0.5rem",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--slds-g-color-on-surface-3)"
    }
  })), invalid && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0.25rem 0 0",
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-error-1)"
    }
  }, error));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Slider.jsx
try { (() => {
let _slid = 0;

/** SLDS Slider — a range input with SLDS-styled track, thumb, and value label. */
function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  showValue = true,
  unit = "",
  disabled = false,
  className = "",
  style = {}
}) {
  const id = React.useMemo(() => `slds2-slider-${++_slid}`, []);
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? min);
  const current = isControlled ? value : internal;
  const pct = (current - min) / (max - min) * 100;
  const handle = e => {
    const v = Number(e.target.value);
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `slds2-slider ${className}`,
    style: style
  }, (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "0.375rem"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-on-surface-2)"
    }
  }, label), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--slds-g-text-body-small)",
      fontWeight: "var(--slds-g-font-weight-semibold)",
      color: "var(--slds-g-color-on-surface-1)"
    }
  }, current, unit)), /*#__PURE__*/React.createElement("input", {
    id: id,
    type: "range",
    min: min,
    max: max,
    step: step,
    value: current,
    onChange: handle,
    disabled: disabled,
    style: {
      width: "100%",
      height: "1rem",
      appearance: "none",
      WebkitAppearance: "none",
      background: "transparent",
      cursor: disabled ? "not-allowed" : "pointer",
      // track fill via gradient
      backgroundImage: `linear-gradient(var(--slds-g-color-accent-1), var(--slds-g-color-accent-1))`,
      backgroundSize: `${pct}% 4px`,
      backgroundPosition: "0 center",
      backgroundRepeat: "no-repeat",
      borderRadius: "var(--slds-g-radius-border-pill)",
      opacity: disabled ? 0.5 : 1,
      // base track
      boxShadow: "none"
    }
  }), /*#__PURE__*/React.createElement("style", null, `
        #${id} { background-color: var(--slds-g-color-border-2); background-clip: padding-box; }
        #${id}::-webkit-slider-runnable-track { height: 4px; border-radius: 999px; background: transparent; }
        #${id}::-moz-range-track { height: 4px; border-radius: 999px; background: var(--slds-g-color-border-2); }
        #${id}::-moz-range-progress { height: 4px; border-radius: 999px; background: var(--slds-g-color-accent-1); }
        #${id}::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; margin-top: -6px; border-radius: 50%; background: var(--slds-g-color-accent-1); border: 2px solid var(--slds-g-color-surface-container-1); box-shadow: var(--slds-g-shadow-2); cursor: pointer; }
        #${id}::-moz-range-thumb { width: 16px; height: 16px; border-radius: 50%; background: var(--slds-g-color-accent-1); border: 2px solid var(--slds-g-color-surface-container-1); box-shadow: var(--slds-g-shadow-2); cursor: pointer; }
        #${id}:focus { outline: none; }
        #${id}:focus::-webkit-slider-thumb { box-shadow: var(--slds-g-shadow-focus); }
      `));
}
Object.assign(__ds_scope, { Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Slider.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let _tid = 0;

/** SLDS Textarea — a multi-line text input matching SLDS form styling. */
function Textarea({
  label,
  value,
  defaultValue,
  onChange,
  placeholder,
  rows = 3,
  required = false,
  disabled = false,
  error,
  className = "",
  style = {},
  ...rest
}) {
  const id = React.useMemo(() => `slds2-textarea-${++_tid}`, []);
  const [focus, setFocus] = React.useState(false);
  const invalid = Boolean(error);
  return /*#__PURE__*/React.createElement("div", {
    className: `slds2-form-element ${className}`,
    style: style
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: "block",
      marginBottom: "0.25rem",
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-on-surface-2)"
    }
  }, required && /*#__PURE__*/React.createElement("abbr", {
    title: "required",
    style: {
      color: "var(--slds-g-color-error-1)",
      textDecoration: "none",
      marginRight: 2
    }
  }, "*"), label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: id,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    placeholder: placeholder,
    rows: rows,
    required: required,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      padding: "0.5rem 0.75rem",
      font: "inherit",
      fontSize: "var(--slds-g-text-body-regular)",
      lineHeight: "var(--slds-g-font-lineheight-body)",
      color: "var(--slds-g-color-on-surface-1)",
      background: "var(--slds-g-color-surface-container-1)",
      border: `1px solid ${invalid ? "var(--slds-g-color-error-1)" : "var(--slds-g-color-border-2)"}`,
      borderRadius: "var(--slds-g-radius-border-3)",
      outline: "none",
      resize: "vertical",
      boxShadow: focus ? "var(--slds-g-shadow-focus)" : "none",
      opacity: disabled ? 0.5 : 1
    }
  }, rest)), invalid && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0.25rem 0 0",
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-error-1)"
    }
  }, error));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
/** SLDS Toggle (switch) — an instant on/off control. */
function Toggle({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  className = "",
  style = {}
}) {
  const [internal, setInternal] = React.useState(Boolean(defaultChecked));
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const toggle = e => {
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    className: `slds2-toggle ${className}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.625rem",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: on,
    onChange: toggle,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 1,
      height: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: "2.75rem",
      height: "1.5rem",
      flex: "none",
      background: on ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-3)",
      borderRadius: "var(--slds-g-radius-border-pill)",
      transition: "background var(--slds-g-duration-promptly) var(--slds-g-ease-out)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: 3,
      width: "1.125rem",
      height: "1.125rem",
      background: "#fff",
      borderRadius: "50%",
      boxShadow: "var(--slds-g-shadow-2)",
      transform: on ? "translateX(1.25rem)" : "translateX(0)",
      transition: "transform var(--slds-g-duration-promptly) var(--slds-g-ease-out)"
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--slds-g-text-body-regular)",
      color: "var(--slds-g-color-on-surface-1)"
    }
  }, label));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumbs.jsx
try { (() => {
/** SLDS Breadcrumbs — hierarchy trail above a record or list view. */
function Breadcrumbs({
  items = [],
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Breadcrumbs",
    className: `slds2-breadcrumbs ${className}`,
    style: style
  }, /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "0.25rem",
      margin: 0,
      padding: 0
    }
  }, items.map((item, i) => {
    const isLast = i === items.length - 1;
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0.25rem"
      }
    }, isLast ? /*#__PURE__*/React.createElement("span", {
      "aria-current": "page",
      style: {
        fontSize: "var(--slds-g-text-body-small)",
        color: "var(--slds-g-color-on-surface-3)"
      }
    }, item.label) : /*#__PURE__*/React.createElement("a", {
      href: item.href || "#",
      onClick: item.onClick,
      style: {
        fontSize: "var(--slds-g-text-body-small)",
        color: "var(--slds-g-color-accent-1)",
        textDecoration: "none",
        cursor: "pointer"
      }
    }, item.label), !isLast && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        color: "var(--slds-g-color-on-surface-3)",
        fontSize: "var(--slds-g-text-body-small)",
        userSelect: "none"
      }
    }, "\u203A"));
  })));
}
Object.assign(__ds_scope, { Breadcrumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumbs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/VerticalNavigation.jsx
try { (() => {
/**
 * SLDS Vertical Navigation — a sidebar nav with optional sections, per-item
 * icons and count badges, and a selected state.
 * sections: [{ label?, items: [{ id, label, iconName, badge }] }]
 */
function VerticalNavigation({
  sections = [],
  value,
  defaultValue,
  onSelect,
  className = "",
  style = {}
}) {
  const firstId = sections[0] && sections[0].items[0] && sections[0].items[0].id;
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? firstId);
  const current = isControlled ? value : internal;
  const pick = id => {
    if (!isControlled) setInternal(id);
    onSelect && onSelect(id);
  };
  return /*#__PURE__*/React.createElement("nav", {
    className: `slds2-vertical-nav ${className}`,
    style: {
      minWidth: "12rem",
      ...style
    }
  }, sections.map((sec, si) => /*#__PURE__*/React.createElement("div", {
    key: si,
    style: {
      marginBottom: "1rem"
    }
  }, sec.label && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0.75rem 0.375rem",
      fontSize: "var(--slds-g-text-body-small)",
      fontWeight: "var(--slds-g-font-weight-bold)",
      textTransform: "uppercase",
      letterSpacing: ".04em",
      color: "var(--slds-g-color-on-surface-3)"
    }
  }, sec.label), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, sec.items.map(it => {
    const on = it.id === current;
    return /*#__PURE__*/React.createElement("li", {
      key: it.id
    }, /*#__PURE__*/React.createElement("a", {
      href: it.href || "#",
      onClick: e => {
        if (!it.href) e.preventDefault();
        pick(it.id);
        it.onClick && it.onClick();
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 0.75rem",
        borderLeft: `3px solid ${on ? "var(--slds-g-color-accent-1)" : "transparent"}`,
        background: on ? "var(--slds-g-color-surface-3)" : "transparent",
        color: on ? "var(--slds-g-color-on-surface-1)" : "var(--slds-g-color-on-surface-2)",
        fontSize: "var(--slds-g-text-body-regular)",
        fontWeight: on ? "var(--slds-g-font-weight-semibold)" : "var(--slds-g-font-weight-regular)",
        textDecoration: "none",
        cursor: "pointer"
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = "var(--slds-g-color-surface-2)";
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = "transparent";
      }
    }, it.iconName && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      iconName: it.iconName,
      size: "x-small",
      style: {
        color: "inherit",
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, it.label), it.badge != null && /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "none",
        fontSize: "var(--slds-g-text-body-small)",
        color: "var(--slds-g-color-on-surface-3)"
      }
    }, it.badge)));
  })))));
}
Object.assign(__ds_scope, { VerticalNavigation });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/VerticalNavigation.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Modal.jsx
try { (() => {
const SIZES = {
  small: "30rem",
  medium: "40rem",
  large: "52rem"
};

/** SLDS Modal — a focused dialog over a dimmed backdrop. */
function Modal({
  isOpen = true,
  onClose,
  title,
  tagline,
  size = "medium",
  footer,
  children,
  className = "",
  style = {}
}) {
  if (!isOpen) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "presentation",
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "4rem 1rem",
      background: "rgba(24, 24, 24, 0.55)",
      backdropFilter: "blur(2px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": typeof title === "string" ? title : undefined,
    onClick: e => e.stopPropagation(),
    className: `slds2-modal ${className}`,
    style: {
      width: "100%",
      maxWidth: SIZES[size] || SIZES.medium,
      maxHeight: "calc(100vh - 8rem)",
      display: "flex",
      flexDirection: "column",
      background: "var(--slds-g-color-surface-container-1)",
      borderRadius: "var(--slds-g-radius-border-5)",
      boxShadow: "var(--slds-g-shadow-4)",
      overflow: "hidden",
      ...style
    }
  }, (title || onClose) && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: "1.25rem 3rem 1rem 1.5rem",
      borderBottom: "1px solid var(--slds-g-color-border-1)"
    }
  }, title && /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--slds-g-text-heading-large)",
      fontWeight: "var(--slds-g-font-weight-bold)",
      color: "var(--slds-g-color-on-surface-1)",
      margin: 0
    }
  }, title), tagline && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "0.25rem",
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-on-surface-3)"
    }
  }, tagline), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "2rem",
      height: "2rem",
      padding: 0,
      border: 0,
      borderRadius: "var(--slds-g-radius-border-circle)",
      background: "transparent",
      color: "var(--slds-g-color-on-surface-2)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    iconName: "utility:close",
    size: "x-small",
    style: {
      color: "inherit"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "1.5rem",
      fontSize: "var(--slds-g-text-body-regular)",
      lineHeight: "var(--slds-g-font-lineheight-body)",
      color: "var(--slds-g-color-on-surface-1)"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "0.75rem",
      padding: "0.875rem 1.5rem",
      borderTop: "1px solid var(--slds-g-color-border-1)",
      background: "var(--slds-g-color-surface-2)"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Modal.jsx", error: String((e && e.message) || e) }); }

// components/progress/ProgressBar.jsx
try { (() => {
/** SLDS Progress Bar — a horizontal indicator of completion (0–100). */
function ProgressBar({
  value = 0,
  size = "medium",
  variant = "base",
  showValue = false,
  label,
  className = "",
  style = {}
}) {
  const pct = Math.max(0, Math.min(100, value));
  const height = size === "small" ? 4 : size === "large" ? 12 : 8;
  const fill = variant === "success" ? "var(--slds-g-color-success-1)" : variant === "warning" ? "var(--slds-g-color-warning-1)" : "var(--slds-g-color-accent-1)";
  return /*#__PURE__*/React.createElement("div", {
    className: `slds2-progress-bar ${className}`,
    style: style
  }, (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "0.25rem"
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--slds-g-text-body-small)",
      color: "var(--slds-g-color-on-surface-2)"
    }
  }, label), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--slds-g-text-body-small)",
      fontWeight: "var(--slds-g-font-weight-semibold)",
      color: "var(--slds-g-color-on-surface-1)"
    }
  }, pct, "%")), /*#__PURE__*/React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": pct,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    style: {
      width: "100%",
      height,
      background: "var(--slds-g-color-surface-3)",
      borderRadius: "var(--slds-g-radius-border-pill)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: "100%",
      background: fill,
      borderRadius: "var(--slds-g-radius-border-pill)",
      transition: "width var(--slds-g-duration-promptly) var(--slds-g-ease-out)"
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/progress/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/progress/ProgressIndicator.jsx
try { (() => {
/**
 * SLDS Progress Indicator.
 * - variant="base": dotted track with circular step markers (setup flows).
 * - variant="path": the Salesforce "Path" — chevron stages for sales/case
 *   progress; completed = brand, current = darker brand, upcoming = gray.
 */
function ProgressIndicator({
  steps = [],
  current = 0,
  variant = "base",
  className = "",
  style = {}
}) {
  if (variant === "path") {
    return /*#__PURE__*/React.createElement("ol", {
      className: `slds2-path ${className}`,
      style: {
        display: "flex",
        listStyle: "none",
        margin: 0,
        padding: 0,
        gap: "2px",
        ...style
      }
    }, steps.map((label, i) => {
      const done = i < current;
      const active = i === current;
      const bg = done ? "var(--slds-g-color-accent-1)" : active ? "var(--slds-g-color-accent-3)" : "var(--slds-g-color-surface-3)";
      const fg = done || active ? "#fff" : "var(--slds-g-color-on-surface-2)";
      return /*#__PURE__*/React.createElement("li", {
        key: i,
        style: {
          position: "relative",
          flex: 1,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.375rem",
          height: "2rem",
          padding: "0 0.5rem 0 1.25rem",
          background: bg,
          color: fg,
          fontSize: "var(--slds-g-text-body-small)",
          fontWeight: active ? "var(--slds-g-font-weight-bold)" : "var(--slds-g-font-weight-medium)",
          clipPath: "polygon(0 0, calc(100% - 0.9rem) 0, 100% 50%, calc(100% - 0.9rem) 100%, 0 100%, 0.9rem 50%)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }, done && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
        iconName: "utility:check",
        size: "xx-small",
        style: {
          color: "#fff",
          fontSize: 13
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }, label));
    }));
  }

  // base variant — circles on a connecting track
  return /*#__PURE__*/React.createElement("div", {
    className: `slds2-progress ${className}`,
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      padding: "0 0.75rem",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "1.25rem",
      right: "1.25rem",
      height: 2,
      background: "var(--slds-g-color-border-2)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "1.25rem",
      height: 2,
      width: steps.length > 1 ? `calc((100% - 2.5rem) * ${current / (steps.length - 1)})` : 0,
      background: "var(--slds-g-color-accent-1)",
      transition: "width var(--slds-g-duration-promptly) var(--slds-g-ease-out)"
    }
  }), /*#__PURE__*/React.createElement("ol", {
    style: {
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, steps.map((label, i) => {
    const done = i < current;
    const active = i === current;
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.375rem"
      }
    }, /*#__PURE__*/React.createElement("span", {
      title: typeof label === "string" ? label : undefined,
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "1rem",
        height: "1rem",
        borderRadius: "var(--slds-g-radius-border-circle)",
        background: done ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-surface-container-1)",
        border: `2px solid ${done || active ? "var(--slds-g-color-accent-1)" : "var(--slds-g-color-border-2)"}`,
        boxShadow: active ? "var(--slds-g-shadow-focus)" : "none"
      }
    }, done && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      iconName: "utility:check",
      size: "xx-small",
      style: {
        color: "#fff",
        fontSize: 10
      }
    })));
  })));
}
Object.assign(__ds_scope, { ProgressIndicator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/progress/ProgressIndicator.jsx", error: String((e && e.message) || e) }); }

// components/progress/ProgressRing.jsx
try { (() => {
/** SLDS Progress Ring — a circular completion indicator (0–100). */
function ProgressRing({
  value = 0,
  size = 32,
  variant = "base",
  showValue = false,
  className = "",
  style = {}
}) {
  const pct = Math.max(0, Math.min(100, value));
  const stroke = Math.max(3, Math.round(size * 0.1));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  const color = variant === "success" ? "var(--slds-g-color-success-1)" : variant === "warning" ? "var(--slds-g-color-warning-1)" : variant === "error" ? "var(--slds-g-color-error-1)" : "var(--slds-g-color-accent-1)";
  return /*#__PURE__*/React.createElement("div", {
    className: `slds2-progress-ring ${className}`,
    style: {
      position: "relative",
      width: size,
      height: size,
      display: "inline-flex",
      ...style
    },
    role: "progressbar",
    "aria-valuenow": pct,
    "aria-valuemin": 0,
    "aria-valuemax": 100
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: "rotate(-90deg)"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--slds-g-color-surface-3)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: offset,
    style: {
      transition: "stroke-dashoffset var(--slds-g-duration-promptly) var(--slds-g-ease-out)"
    }
  })), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: Math.max(9, Math.round(size * 0.26)),
      fontWeight: "var(--slds-g-font-weight-semibold)",
      color: "var(--slds-g-color-on-surface-1)"
    }
  }, Math.round(pct)));
}
Object.assign(__ds_scope, { ProgressRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/progress/ProgressRing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lightning-crm/data.js
try { (() => {
/* Lightning CRM sample data — exposed as window.CRM for the UI kit.
   Mirrors the starter-kit contact fixtures, plus opportunities & tasks. */
(function () {
  const contacts = [{
    id: '1',
    name: 'Lando Voss',
    title: 'VP Sales',
    company: 'Global Media',
    email: 'lvoss@globalmedia.com',
    phone: '(415) 555-1212',
    mobile: '(415) 555-1300',
    city: 'San Francisco, CA',
    initials: 'LV'
  }, {
    id: '2',
    name: 'Carlos Piquet',
    title: 'President and CEO',
    company: 'Acme',
    email: 'cpiquet@acme.com',
    phone: '(212) 555-5555',
    mobile: '(212) 555-5600',
    city: 'New York, NY',
    initials: 'CP'
  }, {
    id: '3',
    name: 'Lewis Mansell',
    title: 'President',
    company: 'Global Media',
    email: 'lmansell@globalmedia.com',
    phone: '(415) 555-1212',
    mobile: '(415) 555-1400',
    city: 'San Francisco, CA',
    initials: 'LM'
  }, {
    id: '4',
    name: 'Max Alonso',
    title: 'Buyer',
    company: 'Acme',
    email: 'malonso@acme.com',
    phone: '(212) 555-5555',
    mobile: '(212) 555-5700',
    city: 'New York, NY',
    initials: 'MA'
  }, {
    id: '5',
    name: 'Oscar Lauda',
    title: 'Sales Manager',
    company: 'Global Media',
    email: 'olauda@globalmedia.com',
    phone: '(905) 555-1212',
    mobile: '(905) 555-1300',
    city: 'Toronto, ON',
    initials: 'OL'
  }, {
    id: '6',
    name: 'Kimi Leclerc',
    title: 'VP Customer Support',
    company: 'Acme',
    email: 'kleclerc@acme.com',
    phone: '(212) 555-5555',
    mobile: '(212) 555-5800',
    city: 'New York, NY',
    initials: 'KL'
  }, {
    id: '7',
    name: 'Ayrton Prost',
    title: 'Executive Officer',
    company: 'Pinnacle Corp',
    email: 'aprost@pinnaclecorp.com',
    phone: '(415) 555-7000',
    mobile: '(415) 555-7100',
    city: 'San Francisco, CA',
    initials: 'AP'
  }];
  const stages = ['Qualification', 'Needs Analysis', 'Proposal', 'Negotiation', 'Closed Won'];
  const opportunities = [{
    id: 'o1',
    name: 'Global Media — Platform Renewal',
    account: 'Global Media',
    amount: 240000,
    stage: 'Negotiation',
    close: 'Aug 30, 2026',
    owner: 'AG',
    prob: 75
  }, {
    id: 'o2',
    name: 'Acme — Enterprise Expansion',
    account: 'Acme',
    amount: 410000,
    stage: 'Proposal',
    close: 'Sep 15, 2026',
    owner: 'AG',
    prob: 60
  }, {
    id: 'o3',
    name: 'Pinnacle — Service Cloud',
    account: 'Pinnacle Corp',
    amount: 88000,
    stage: 'Qualification',
    close: 'Oct 02, 2026',
    owner: 'OL',
    prob: 20
  }, {
    id: 'o4',
    name: 'Acme — Data Cloud Pilot',
    account: 'Acme',
    amount: 125000,
    stage: 'Needs Analysis',
    close: 'Sep 28, 2026',
    owner: 'KL',
    prob: 35
  }, {
    id: 'o5',
    name: 'Global Media — Agentforce',
    account: 'Global Media',
    amount: 320000,
    stage: 'Closed Won',
    close: 'Jun 10, 2026',
    owner: 'AG',
    prob: 100
  }, {
    id: 'o6',
    name: 'Pinnacle — Marketing Cloud',
    account: 'Pinnacle Corp',
    amount: 156000,
    stage: 'Negotiation',
    close: 'Aug 12, 2026',
    owner: 'OL',
    prob: 80
  }];
  const tasks = [{
    id: 't1',
    subject: 'Call Lando about renewal terms',
    due: 'Today',
    who: 'Lando Voss',
    done: false,
    priority: 'High'
  }, {
    id: 't2',
    subject: 'Send proposal to Acme procurement',
    due: 'Today',
    who: 'Max Alonso',
    done: false,
    priority: 'High'
  }, {
    id: 't3',
    subject: 'Schedule Agentforce demo',
    due: 'Tomorrow',
    who: 'Lewis Mansell',
    done: false,
    priority: 'Medium'
  }, {
    id: 't4',
    subject: 'Follow up on Pinnacle pilot',
    due: 'Jun 27',
    who: 'Ayrton Prost',
    done: true,
    priority: 'Low'
  }];
  const activity = [{
    id: 'a1',
    type: 'call',
    icon: 'utility:call',
    subject: 'Logged a call',
    desc: 'Discussed Q3 renewal scope and pricing.',
    date: '2h ago'
  }, {
    id: 'a2',
    type: 'email',
    icon: 'utility:email',
    subject: 'Email: Proposal v2',
    desc: 'Sent updated proposal with revised terms.',
    date: 'Yesterday'
  }, {
    id: 'a3',
    type: 'event',
    icon: 'utility:event',
    subject: 'Discovery meeting',
    desc: 'Reviewed current platform usage and goals.',
    date: 'Jun 20'
  }, {
    id: 'a4',
    type: 'task',
    icon: 'utility:task',
    subject: 'Created task',
    desc: 'Prepare ROI summary for exec review.',
    date: 'Jun 18'
  }];
  window.CRM = {
    contacts,
    opportunities,
    tasks,
    activity,
    stages
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lightning-crm/data.js", error: String((e && e.message) || e) }); }

// ui_kits/lightning-crm/data/contacts.js
try { (() => {
const CONTACTS = [{
  id: '1',
  name: 'Lando Voss',
  title: 'VP Sales',
  company: 'Global Media',
  email: 'lvoss@globalmedia.com',
  phone: '(415) 555-1212',
  mobile: '(415) 555-1300',
  department: 'Sales',
  mailingStreet: '123 Market St',
  mailingCity: 'San Francisco',
  mailingState: 'CA',
  mailingZip: '94105',
  description: 'Key contact for the Global Media west coast accounts.'
}, {
  id: '2',
  name: 'Carlos Piquet',
  title: 'President and CEO',
  company: 'Acme',
  email: 'cpiquet@acme.com',
  phone: '(212) 555-5555',
  mobile: '(212) 555-5600',
  department: 'Executive',
  mailingStreet: '456 Broadway',
  mailingCity: 'New York',
  mailingState: 'NY',
  mailingZip: '10013',
  description: 'Primary executive sponsor for the Acme partnership.'
}, {
  id: '3',
  name: 'Lewis Mansell',
  title: 'President',
  company: 'Global Media',
  email: 'lmansell@globalmedia.com',
  phone: '(415) 555-1212',
  mobile: '(415) 555-1400',
  department: 'Executive',
  mailingStreet: '123 Market St',
  mailingCity: 'San Francisco',
  mailingState: 'CA',
  mailingZip: '94105',
  description: 'Oversees all Global Media operations on the west coast.'
}, {
  id: '4',
  name: 'Max Alonso',
  title: 'Buyer',
  company: 'Acme',
  email: 'malonso@acme.com',
  phone: '(212) 555-5555',
  mobile: '(212) 555-5700',
  department: 'Procurement',
  mailingStreet: '456 Broadway',
  mailingCity: 'New York',
  mailingState: 'NY',
  mailingZip: '10013',
  description: 'Handles procurement for office supplies and software licenses.'
}, {
  id: '5',
  name: 'Oscar Lauda',
  title: 'Sales Manager',
  company: 'Global Media',
  email: 'olauda@globalmedia.com',
  phone: '(905) 555-1212',
  mobile: '(905) 555-1300',
  department: 'Sales',
  mailingStreet: '789 King St W',
  mailingCity: 'Toronto',
  mailingState: 'ON',
  mailingZip: 'M5V 1N4',
  description: 'Manages the Canadian sales region for Global Media.'
}, {
  id: '6',
  name: 'Kimi Leclerc',
  title: 'VP Customer Support',
  company: 'Acme',
  email: 'kleclerc@acme.com',
  phone: '(212) 555-5555',
  mobile: '(212) 555-5800',
  department: 'Customer Support',
  mailingStreet: '456 Broadway',
  mailingCity: 'New York',
  mailingState: 'NY',
  mailingZip: '10013',
  description: 'Leads the customer support organization at Acme.'
}, {
  id: '7',
  name: 'Ayrton Prost',
  title: 'Executive Officer',
  company: 'Pinnacle Corp',
  email: 'aprost@pinnaclecorp.com',
  phone: '(415) 555-7000',
  mobile: '(415) 555-7100',
  department: 'Executive',
  mailingStreet: '415 Mission St',
  mailingCity: 'San Francisco',
  mailingState: 'CA',
  mailingZip: '94105',
  description: 'Executive contact at Pinnacle Corp for strategic initiatives.'
}];
function getAllContacts() {
  return [...CONTACTS];
}
function getContactById(id) {
  return CONTACTS.find(c => c.id === id) || null;
}
Object.assign(__ds_scope, { getAllContacts, getContactById });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lightning-crm/data/contacts.js", error: String((e && e.message) || e) }); }

// ui_kits/lightning-crm/home.jsx
try { (() => {
/* Home dashboard screen. */
const DSH = window.SalesforceSLDS2DesignSystem_2eee88;
function money(n) {
  return '$' + n.toLocaleString();
}
function KpiTile({
  label,
  value,
  sub,
  tone
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 150,
      padding: '1rem 1.125rem',
      background: 'var(--slds-g-color-surface-container-1)',
      border: '1px solid var(--slds-g-color-border-1)',
      borderRadius: 'var(--slds-g-radius-border-4)',
      boxShadow: 'var(--slds-g-shadow-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--slds-g-text-body-small)',
      fontWeight: 'var(--slds-g-font-weight-bold)',
      letterSpacing: '.05em',
      textTransform: 'uppercase',
      color: 'var(--slds-g-color-on-surface-3)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--slds-g-text-display-medium)',
      fontWeight: 'var(--slds-g-font-weight-bold)',
      letterSpacing: '-.01em',
      margin: '.25rem 0 .125rem',
      color: tone || 'var(--slds-g-color-on-surface-1)'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--slds-g-text-body-small)',
      color: 'var(--slds-g-color-on-surface-3)'
    }
  }, sub));
}
function HomeDashboard({
  onNavigate
}) {
  const {
    Card,
    Badge,
    Button,
    Avatar,
    Icon,
    Checkbox
  } = DSH;
  const C = window.CRM;
  const open = C.opportunities.filter(o => o.stage !== 'Closed Won');
  const pipeline = open.reduce((s, o) => s + o.amount, 0);
  const won = C.opportunities.filter(o => o.stage === 'Closed Won').reduce((s, o) => s + o.amount, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1.25rem'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: "AG",
    size: "x-large"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--slds-g-text-body-small)',
      color: 'var(--slds-g-color-on-surface-3)'
    }
  }, "Tuesday, June 25, 2026"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--slds-g-text-heading-x-large)',
      margin: 0
    }
  }, "Good morning, Austin")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "outline-brand",
    iconName: "utility:event",
    label: "Calendar"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "brand",
    iconName: "utility:new",
    label: "New Opportunity"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      marginBottom: '1.25rem'
    }
  }, /*#__PURE__*/React.createElement(KpiTile, {
    label: "Open Pipeline",
    value: money(pipeline),
    sub: open.length + ' open opportunities'
  }), /*#__PURE__*/React.createElement(KpiTile, {
    label: "Closed Won (QTD)",
    value: money(won),
    sub: "+18% vs. last quarter",
    tone: "var(--slds-g-color-success-1)"
  }), /*#__PURE__*/React.createElement(KpiTile, {
    label: "Quota Attainment",
    value: "68%",
    sub: "$1.36M of $2.0M",
    tone: "var(--slds-g-color-accent-1)"
  }), /*#__PURE__*/React.createElement(KpiTile, {
    label: "Win Rate",
    value: "42%",
    sub: "Trailing 90 days"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: '1.25rem',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "My Open Opportunities",
    iconName: "standard:opportunity",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "text",
      size: "small",
      label: "View All",
      onClick: () => onNavigate('opportunities')
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2.4fr 1fr 1.1fr 0.8fr',
      gap: '.5rem',
      padding: '.5rem 0',
      borderBottom: '1px solid var(--slds-g-color-border-1)',
      fontSize: 'var(--slds-g-text-body-small)',
      fontWeight: 'var(--slds-g-font-weight-bold)',
      color: 'var(--slds-g-color-on-surface-3)',
      textTransform: 'uppercase',
      letterSpacing: '.04em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Opportunity"), /*#__PURE__*/React.createElement("span", null, "Amount"), /*#__PURE__*/React.createElement("span", null, "Stage"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "Close")), open.slice(0, 5).map(o => /*#__PURE__*/React.createElement("div", {
    key: o.id,
    style: {
      display: 'grid',
      gridTemplateColumns: '2.4fr 1fr 1.1fr 0.8fr',
      gap: '.5rem',
      padding: '.625rem 0',
      borderBottom: '1px solid var(--slds-g-color-border-1)',
      alignItems: 'center',
      fontSize: 'var(--slds-g-text-body-regular)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: {
      color: 'var(--slds-g-color-accent-1)',
      fontWeight: 'var(--slds-g-font-weight-medium)',
      cursor: 'pointer'
    }
  }, o.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--slds-g-font-weight-semibold)'
    }
  }, money(o.amount)), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Badge, {
    variant: "brand",
    label: o.stage
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right',
      color: 'var(--slds-g-color-on-surface-2)'
    }
  }, o.close))))), /*#__PURE__*/React.createElement(Card, {
    title: "Today's Tasks",
    iconName: "standard:task",
    actions: /*#__PURE__*/React.createElement(Badge, {
      variant: "brand",
      label: C.tasks.filter(t => !t.done).length + ' open'
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '.625rem'
    }
  }, C.tasks.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '.625rem'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    defaultChecked: t.done
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--slds-g-text-body-regular)',
      textDecoration: t.done ? 'line-through' : 'none',
      color: t.done ? 'var(--slds-g-color-on-surface-3)' : 'var(--slds-g-color-on-surface-1)'
    }
  }, t.subject), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--slds-g-text-body-small)',
      color: 'var(--slds-g-color-on-surface-3)'
    }
  }, t.who, " \xB7 Due ", t.due)), t.priority === 'High' && !t.done && /*#__PURE__*/React.createElement(Badge, {
    variant: "error",
    label: "High"
  })))))));
}
Object.assign(window, {
  HomeDashboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lightning-crm/home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lightning-crm/records.jsx
try { (() => {
/* Record screens — Contacts list, Contact detail, Opportunity board. */
const DSR = window.SalesforceSLDS2DesignSystem_2eee88;
function money2(n) {
  return '$' + n.toLocaleString();
}

/* ---------------- Contacts list view ---------------- */
function ContactsList({
  onOpen,
  query
}) {
  const {
    Button,
    ButtonIcon,
    Avatar,
    Icon,
    Checkbox
  } = DSR;
  let rows = window.CRM.contacts;
  if (query) {
    const q = query.toLowerCase();
    rows = rows.filter(c => (c.name + c.company + c.title + c.email).toLowerCase().includes(q));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '.75rem',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    iconName: "standard:contact",
    size: "large"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--slds-g-text-body-small)',
      color: 'var(--slds-g-color-on-surface-3)'
    }
  }, "Contacts"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '.375rem'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--slds-g-text-heading-large)',
      margin: 0
    }
  }, "Recently Viewed"), /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18,
      color: 'var(--slds-g-color-on-surface-3)'
    }
  }, "expand_more"))), /*#__PURE__*/React.createElement(Button, {
    variant: "neutral",
    label: "Import"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "brand",
    label: "New",
    iconName: "utility:new"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '.5rem',
      marginBottom: '.5rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--slds-g-text-body-small)',
      color: 'var(--slds-g-color-on-surface-3)',
      flex: 1
    }
  }, rows.length, " items \xB7 sorted by Name \xB7 updated a few seconds ago"), /*#__PURE__*/React.createElement(ButtonIcon, {
    variant: "border",
    iconName: "utility:filterList",
    title: "Filters"
  }), /*#__PURE__*/React.createElement(ButtonIcon, {
    variant: "border",
    iconName: "utility:settings",
    title: "List settings"
  }), /*#__PURE__*/React.createElement(ButtonIcon, {
    variant: "border",
    iconName: "utility:refresh",
    title: "Refresh"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--slds-g-color-surface-container-1)',
      border: '1px solid var(--slds-g-color-border-1)',
      borderRadius: 'var(--slds-g-radius-border-4)',
      boxShadow: 'var(--slds-g-shadow-2)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '36px 1.6fr 1.4fr 1.2fr 1.6fr 1.1fr 40px',
      gap: '.5rem',
      alignItems: 'center',
      padding: '.625rem 1rem',
      borderBottom: '1px solid var(--slds-g-color-border-1)',
      background: 'var(--slds-g-color-surface-1)',
      fontSize: 'var(--slds-g-text-body-small)',
      fontWeight: 'var(--slds-g-font-weight-bold)',
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      color: 'var(--slds-g-color-on-surface-3)'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, null), /*#__PURE__*/React.createElement("span", null, "Name"), /*#__PURE__*/React.createElement("span", null, "Title"), /*#__PURE__*/React.createElement("span", null, "Company"), /*#__PURE__*/React.createElement("span", null, "Email"), /*#__PURE__*/React.createElement("span", null, "Phone"), /*#__PURE__*/React.createElement("span", null)), rows.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    onClick: () => onOpen(c.id),
    style: {
      display: 'grid',
      gridTemplateColumns: '36px 1.6fr 1.4fr 1.2fr 1.6fr 1.1fr 40px',
      gap: '.5rem',
      alignItems: 'center',
      padding: '.625rem 1rem',
      cursor: 'pointer',
      borderBottom: i < rows.length - 1 ? '1px solid var(--slds-g-color-border-1)' : 0,
      fontSize: 'var(--slds-g-text-body-regular)'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--slds-g-color-surface-1)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, /*#__PURE__*/React.createElement(Checkbox, {
    onClick: e => e.stopPropagation()
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '.5rem'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: c.initials,
    size: "small"
  }), /*#__PURE__*/React.createElement("a", {
    style: {
      color: 'var(--slds-g-color-accent-1)',
      fontWeight: 'var(--slds-g-font-weight-medium)'
    }
  }, c.name)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--slds-g-color-on-surface-2)'
    }
  }, c.title), /*#__PURE__*/React.createElement("span", null, c.company), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--slds-g-color-accent-1)'
    }
  }, c.email), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--slds-g-color-on-surface-2)'
    }
  }, c.phone), /*#__PURE__*/React.createElement("span", {
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(ButtonIcon, {
    variant: "bare",
    iconName: "utility:threedots_vertical",
    title: "Actions",
    size: "small"
  })))), rows.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '2rem',
      textAlign: 'center',
      color: 'var(--slds-g-color-on-surface-3)'
    }
  }, "No contacts match your search.")));
}

/* ---------------- Contact detail (record home) ---------------- */
function ContactDetail({
  id,
  onBack,
  onToast
}) {
  const {
    Button,
    ButtonIcon,
    Avatar,
    Icon,
    Badge,
    Tabs,
    Card,
    Input
  } = DSR;
  const c = window.CRM.contacts.find(x => x.id === id) || window.CRM.contacts[0];
  const [tab, setTab] = React.useState('details');
  const [following, setFollowing] = React.useState(false);
  const field = (label, value, opts = {}) => /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '.875rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--slds-g-text-body-small)',
      color: 'var(--slds-g-color-on-surface-3)',
      marginBottom: '.125rem'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--slds-g-text-body-regular)',
      color: opts.link ? 'var(--slds-g-color-accent-1)' : 'var(--slds-g-color-on-surface-1)'
    }
  }, value));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '.25rem',
      background: 'transparent',
      border: 0,
      cursor: 'pointer',
      color: 'var(--slds-g-color-accent-1)',
      fontSize: 'var(--slds-g-text-body-small)',
      padding: 0,
      marginBottom: '.75rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 16
    }
  }, "chevron_left"), " Contacts"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--slds-g-color-surface-container-1)',
      border: '1px solid var(--slds-g-color-border-1)',
      borderRadius: 'var(--slds-g-radius-border-4)',
      boxShadow: 'var(--slds-g-shadow-2)',
      padding: '1.125rem 1.25rem',
      marginBottom: '1.25rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '.875rem'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    iconName: "standard:contact",
    size: "large"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--slds-g-text-body-small)',
      color: 'var(--slds-g-color-on-surface-3)'
    }
  }, "Contact"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--slds-g-text-heading-large)',
      margin: '.0625rem 0'
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--slds-g-color-on-surface-2)'
    }
  }, c.title, " \xB7 ", c.company)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '.5rem'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "neutral",
    iconName: following ? 'utility:check' : 'utility:add',
    label: following ? 'Following' : 'Follow',
    onClick: () => setFollowing(f => !f)
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "neutral",
    label: "Edit",
    onClick: onToast
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "neutral",
    label: "Delete"
  }), /*#__PURE__*/React.createElement(ButtonIcon, {
    variant: "border",
    iconName: "utility:chevrondown",
    title: "More actions"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '2.5rem',
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid var(--slds-g-color-border-1)'
    }
  }, field('Title', c.title), field('Phone', c.phone), field('Email', c.email, {
    link: true
  }), field('Company', c.company, {
    link: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.7fr 1fr',
      gap: '1.25rem',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--slds-g-color-surface-container-1)',
      border: '1px solid var(--slds-g-color-border-1)',
      borderRadius: 'var(--slds-g-radius-border-4)',
      boxShadow: 'var(--slds-g-shadow-2)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 1.25rem'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    tabs: [{
      label: 'Details',
      value: 'details'
    }, {
      label: 'Related',
      value: 'related'
    }, {
      label: 'News',
      value: 'news'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '1.25rem'
    }
  }, tab === 'details' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      columnGap: '2rem'
    }
  }, field('Name', c.name), field('Mobile', c.mobile), field('Title', c.title), field('Email', c.email, {
    link: true
  }), field('Account Name', c.company, {
    link: true
  }), field('Mailing Address', c.city), field('Department', 'Sales'), field('Lead Source', 'Web')), tab === 'related' && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--slds-g-color-on-surface-2)',
      fontSize: 'var(--slds-g-text-body-regular)'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Opportunities (2)"), " \xB7 Cases (1) \xB7 Files (4) \xB7 Notes (3)"), tab === 'news' && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--slds-g-color-on-surface-3)'
    }
  }, "No recent news for ", c.company, ".")))), /*#__PURE__*/React.createElement(Card, {
    title: "Activity",
    iconName: "standard:task",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "neutral",
      size: "small",
      label: "Log a Call",
      onClick: onToast
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }
  }, window.CRM.activity.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    style: {
      display: 'flex',
      gap: '.625rem'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    iconName: a.icon,
    size: "small",
    variant: "brand"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '.5rem'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 'var(--slds-g-text-body-regular)'
    }
  }, a.subject), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--slds-g-text-body-small)',
      color: 'var(--slds-g-color-on-surface-3)',
      whiteSpace: 'nowrap'
    }
  }, a.date)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--slds-g-text-body-small)',
      color: 'var(--slds-g-color-on-surface-2)'
    }
  }, a.desc))))))));
}

/* ---------------- Opportunity board (kanban) ---------------- */
function OpportunityBoard({
  onToast
}) {
  const {
    Badge,
    Avatar,
    ButtonIcon,
    Button,
    Icon
  } = DSR;
  const C = window.CRM;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1320,
      margin: '0 auto',
      padding: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '.75rem',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    iconName: "standard:opportunity",
    size: "large"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--slds-g-text-body-small)',
      color: 'var(--slds-g-color-on-surface-3)'
    }
  }, "Opportunities"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--slds-g-text-heading-large)',
      margin: 0
    }
  }, "All Opportunities")), /*#__PURE__*/React.createElement(Button, {
    variant: "neutral",
    iconName: "utility:list",
    label: "Table"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "brand",
    iconName: "utility:new",
    label: "New",
    onClick: onToast
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${C.stages.length}, minmax(200px, 1fr))`,
      gap: '.75rem',
      overflowX: 'auto'
    }
  }, C.stages.map(stage => {
    const cards = C.opportunities.filter(o => o.stage === stage);
    const total = cards.reduce((s, o) => s + o.amount, 0);
    return /*#__PURE__*/React.createElement("div", {
      key: stage,
      style: {
        background: 'var(--slds-g-color-surface-1)',
        borderRadius: 'var(--slds-g-radius-border-4)',
        padding: '.625rem',
        minHeight: 200
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '.625rem',
        padding: '0 .25rem'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--slds-g-text-body-small)',
        fontWeight: 'var(--slds-g-font-weight-bold)',
        textTransform: 'uppercase',
        letterSpacing: '.04em',
        color: 'var(--slds-g-color-on-surface-2)'
      }
    }, stage), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--slds-g-text-body-small)',
        color: 'var(--slds-g-color-on-surface-3)'
      }
    }, money2(total))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '.5rem'
      }
    }, cards.map(o => /*#__PURE__*/React.createElement("div", {
      key: o.id,
      style: {
        background: 'var(--slds-g-color-surface-container-1)',
        border: '1px solid var(--slds-g-color-border-1)',
        borderRadius: 'var(--slds-g-radius-border-3)',
        boxShadow: 'var(--slds-g-shadow-1)',
        padding: '.75rem'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--slds-g-text-body-regular)',
        fontWeight: 'var(--slds-g-font-weight-semibold)',
        color: 'var(--slds-g-color-accent-1)',
        marginBottom: '.25rem'
      }
    }, o.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--slds-g-text-body-small)',
        color: 'var(--slds-g-color-on-surface-3)',
        marginBottom: '.5rem'
      }
    }, o.account), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'var(--slds-g-font-weight-bold)'
      }
    }, money2(o.amount)), /*#__PURE__*/React.createElement(Avatar, {
      initials: o.owner,
      size: "x-small"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '.5rem'
      }
    }, o.stage === 'Closed Won' ? /*#__PURE__*/React.createElement(Badge, {
      variant: "success",
      label: "Won"
    }) : /*#__PURE__*/React.createElement(Badge, {
      variant: "brand",
      label: o.prob + '%'
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--slds-g-text-body-small)',
        color: 'var(--slds-g-color-on-surface-3)',
        marginLeft: '.5rem'
      }
    }, o.close))))));
  })));
}
Object.assign(window, {
  ContactsList,
  ContactDetail,
  OpportunityBoard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lightning-crm/records.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lightning-crm/shell.jsx
try { (() => {
/* Lightning Experience app shell — global header + app navigation bar.
   Recreates the starter-kit shell/globalHeader + ui/globalNavigation. */
const DS = window.SalesforceSLDS2DesignSystem_2eee88;
function GlobalHeader({
  onSearch,
  onToast
}) {
  const {
    Icon,
    ButtonIcon,
    Avatar
  } = DS;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      height: '3.25rem',
      padding: '0 1rem',
      background: 'var(--slds-g-color-surface-container-1)',
      borderBottom: '1px solid var(--slds-g-color-border-1)',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/salesforce-cloud.svg",
    alt: "Salesforce",
    style: {
      height: 26
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      maxWidth: 520,
      margin: '0 auto',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      position: 'absolute',
      left: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: 18,
      color: 'var(--slds-g-color-on-surface-3)',
      pointerEvents: 'none'
    }
  }, "search"), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search Salesforce...",
    onChange: e => onSearch && onSearch(e.target.value),
    style: {
      width: '100%',
      height: '2rem',
      padding: '0 0.75rem 0 2.25rem',
      font: 'inherit',
      fontSize: 'var(--slds-g-text-body-regular)',
      color: 'var(--slds-g-color-on-surface-1)',
      background: 'var(--slds-g-color-surface-1)',
      border: '1px solid var(--slds-g-color-border-2)',
      borderRadius: 'var(--slds-g-radius-border-pill)',
      outline: 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement(ButtonIcon, {
    variant: "bare",
    iconName: "utility:agent_astro",
    title: "Agentforce",
    size: "large",
    onClick: () => onToast && onToast()
  }), /*#__PURE__*/React.createElement(ButtonIcon, {
    variant: "bare",
    iconName: "utility:favorite",
    title: "Favorites",
    size: "large"
  }), /*#__PURE__*/React.createElement(ButtonIcon, {
    variant: "bare",
    iconName: "utility:new",
    title: "Global Actions",
    size: "large"
  }), /*#__PURE__*/React.createElement(ButtonIcon, {
    variant: "bare",
    iconName: "utility:help",
    title: "Help",
    size: "large"
  }), /*#__PURE__*/React.createElement(ButtonIcon, {
    variant: "bare",
    iconName: "utility:settings",
    title: "Setup",
    size: "large"
  }), /*#__PURE__*/React.createElement(ButtonIcon, {
    variant: "bare",
    iconName: "utility:notification",
    title: "Notifications",
    size: "large"
  }), /*#__PURE__*/React.createElement(Avatar, {
    initials: "AG",
    size: "medium",
    alt: "Austin Guevara"
  })));
}
function AppNav({
  current,
  onNavigate
}) {
  const {
    Icon
  } = DS;
  const tabs = [{
    id: 'home',
    label: 'Home'
  }, {
    id: 'opportunities',
    label: 'Opportunities'
  }, {
    id: 'contacts',
    label: 'Contacts'
  }, {
    id: 'accounts',
    label: 'Accounts'
  }, {
    id: 'reports',
    label: 'Reports'
  }, {
    id: 'dashboards',
    label: 'Dashboards'
  }];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      gap: '0.25rem',
      padding: '0 1rem',
      height: '2.75rem',
      background: 'var(--slds-g-color-surface-container-1)',
      borderBottom: '1px solid var(--slds-g-color-border-1)',
      boxShadow: 'var(--slds-g-shadow-1)',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      paddingRight: '1rem',
      marginRight: '0.5rem',
      borderRight: '1px solid var(--slds-g-color-border-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 20,
      color: 'var(--slds-g-color-on-surface-2)'
    }
  }, "apps"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--slds-g-font-weight-bold)',
      fontSize: 'var(--slds-g-text-heading-small)'
    }
  }, "Sales"), /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 18,
      color: 'var(--slds-g-color-on-surface-3)'
    }
  }, "expand_more")), tabs.map(t => {
    const on = current === t.id || current === 'contactDetail' && t.id === 'contacts';
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => onNavigate(t.id),
      style: {
        position: 'relative',
        padding: '0 0.875rem',
        font: 'inherit',
        fontSize: 'var(--slds-g-text-body-regular)',
        fontWeight: on ? 'var(--slds-g-font-weight-bold)' : 'var(--slds-g-font-weight-regular)',
        color: on ? 'var(--slds-g-color-accent-1)' : 'var(--slds-g-color-on-surface-1)',
        background: 'transparent',
        border: 0,
        borderBottom: `3px solid ${on ? 'var(--slds-g-color-accent-1)' : 'transparent'}`,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'color var(--slds-g-duration-quickly) var(--slds-g-ease-out)'
      }
    }, t.label);
  }));
}
Object.assign(window, {
  GlobalHeader,
  AppNav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lightning-crm/shell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ButtonGroup = __ds_scope.ButtonGroup;

__ds_ns.ButtonIcon = __ds_scope.ButtonIcon;

__ds_ns.ButtonMenu = __ds_scope.ButtonMenu;

__ds_ns.ButtonStateful = __ds_scope.ButtonStateful;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Carousel = __ds_scope.Carousel;

__ds_ns.Layout = __ds_scope.Layout;

__ds_ns.LayoutItem = __ds_scope.LayoutItem;

__ds_ns.Tile = __ds_scope.Tile;

__ds_ns.Datatable = __ds_scope.Datatable;

__ds_ns.Tree = __ds_scope.Tree;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Helptext = __ds_scope.Helptext;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Spinner = __ds_scope.Spinner;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.CheckboxGroup = __ds_scope.CheckboxGroup;

__ds_ns.Combobox = __ds_scope.Combobox;

__ds_ns.DualListbox = __ds_scope.DualListbox;

__ds_ns.FileUpload = __ds_scope.FileUpload;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.Breadcrumbs = __ds_scope.Breadcrumbs;

__ds_ns.VerticalNavigation = __ds_scope.VerticalNavigation;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.ProgressIndicator = __ds_scope.ProgressIndicator;

__ds_ns.ProgressRing = __ds_scope.ProgressRing;

})();
