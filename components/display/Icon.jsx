import React from "react";

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
const availIds = {};            // category -> Set(iconName)
let spriteReady = false;
let spriteFailed = false;
let spritePromise = null;
const subscribers = new Set();
const notify = () => subscribers.forEach((fn) => fn());

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
      if (typeof document === "undefined") { spriteFailed = true; return; }
      if (document.getElementById("__slds_sprites")) { spriteReady = true; return; }
      const base = spriteBase();
      let inner = "";
      for (const cat of SPRITE_CATS) {
        try {
          const res = await fetch(base + "assets/icons/" + cat + ".svg");
          if (!res.ok) continue;
          let txt = await res.text();
          const set = new Set();
          txt.replace(/<symbol[^>]*\bid="([^"]+)"/g, (m, id) => { set.add(id); return m; });
          availIds[cat] = set;
          txt = txt.replace(/(<symbol[^>]*\bid=")([^"]+)(")/g, (m, a, id, b) => a + "slds-" + cat + "-" + id + b);
          inner += txt.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
        } catch (e) { /* skip this category */ }
      }
      if (!inner) { spriteFailed = true; return; }
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
  download: "download", upload: "upload", edit: "edit", delete: "delete",
  refresh: "refresh", search: "search", settings: "settings", help: "help",
  notification: "notifications", favorite: "star", add: "add", new: "add",
  close: "close", clear: "cancel", check: "check", success: "check_circle",
  warning: "warning", error: "error", info: "info", info_alt: "info",
  chevrondown: "expand_more", chevronup: "expand_less", chevronright: "chevron_right",
  chevronleft: "chevron_left", down: "keyboard_arrow_down", up: "keyboard_arrow_up",
  left: "chevron_left", right: "chevron_right", back: "arrow_back", forward: "arrow_forward",
  user: "person", people: "group", email: "mail", call: "call", phone: "call",
  event: "event", date_input: "calendar_today", clock: "schedule", world: "public",
  list: "list", table: "table_rows", kanban: "view_kanban", filterList: "filter_list",
  filter: "filter_alt", sort: "swap_vert", more: "more_horiz", threedots_vertical: "more_vert",
  apps: "apps", waffle: "apps", salesforce1: "cloud", agent_astro: "smart_toy",
  einstein: "auto_awesome", trailhead_alt: "school", home: "home", dashboard: "dashboard",
  chart: "bar_chart", opportunity: "paid", contact: "person", account: "business",
  lead: "trending_up", case: "headset_mic", task: "task_alt", file: "description",
  attach: "attach_file", link: "link", copy: "content_copy", share: "share",
  send: "send", comments: "chat_bubble", like: "thumb_up", lock: "lock",
  unlock: "lock_open", preview: "visibility", money: "payments", cart: "shopping_cart",
  location: "location_on", new_window: "open_in_new", logout: "logout", checkin: "where_to_vote",
  rows: "view_agenda", expand: "unfold_more", color_swatch: "palette", dayview: "today",
  trail: "route", record_lookup: "find_in_page", apex: "code", json: "data_object",
  page: "description", richtextbox: "notes", metrics: "insights", timeline: "timeline",
  recent: "history", topic: "sell", related_list: "list_alt", drag_and_drop: "drag_indicator",
  address: "place", pinned: "push_pin", trending: "trending_up",
};

/* Standard-object icon tile colors (used only by the Material fallback;
   real sprites carry their own tile via the glyph art + this bg). */
const STANDARD_COLORS = {
  account: "#5867e8", contact: "#3b9bd6", opportunity: "#fcb95b", lead: "#f88962",
  case: "#f2cf5b", task: "#4bca81", event: "#eb7092", campaign: "#f49756",
  dashboard: "#ee5e5b", report: "#06a59a", user: "#65cae4", related_list: "#76c2af",
  timeline: "#56aadf", recent: "#719e07", topic: "#5867e8", datatable: "#5867e8",
  record: "#5867e8", address: "#3b9bd6", default: "#0176d3",
};

const SIZES = { "xx-small": 14, "x-small": 16, small: 20, medium: 24, large: 32 };

const VARIANT_COLOR = {
  default: "var(--slds-g-color-on-surface-3)",
  error: "var(--slds-g-color-error-1)",
  success: "var(--slds-g-color-success-1)",
  warning: "var(--slds-g-color-warning-1)",
  brand: "var(--slds-g-color-accent-1)",
  inverse: "var(--slds-g-color-on-surface-inverse-1)",
};

const glyphFor = (name) => GLYPHS[name] || name.replace(/[^a-z0-9]+/gi, "_").toLowerCase();

export function Icon({
  iconName = "utility:info",
  size = "small",
  variant = "default",
  filled = false,
  title,
  className = "",
  style = {},
}) {
  const [, force] = React.useState(0);
  React.useEffect(() => {
    if (spriteReady || spriteFailed) return;
    const fn = () => force((x) => x + 1);
    subscribers.add(fn);
    loadSprites();
    return () => subscribers.delete(fn);
  }, []);

  const [category, name = ""] = iconName.split(":");
  const px = SIZES[size] || SIZES.small;
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": "true" };

  /* ---------- real SLDS sprite ---------- */
  if (hasSprite(category, name)) {
    const href = "#slds-" + category + "-" + name;
    if (category === "utility") {
      return (
        <svg className={className} width={px} height={px} {...a11y}
          style={{ fill: VARIANT_COLOR[variant] || VARIANT_COLOR.default, flex: "none", ...style }}>
          <use href={href} />
        </svg>
      );
    }
    if (category === "doctype") {
      return (
        <svg className={className} height={px} width={Math.round(px * 0.875)} {...a11y}
          style={{ flex: "none", ...style }}>
          <use href={href} />
        </svg>
      );
    }
    // standard / action / custom → colored rounded tile + white glyph
    const tile = px + Math.round(px * 0.5);
    const bg = STANDARD_COLORS[name] || STANDARD_COLORS.default;
    return (
      <span className={className} {...a11y}
        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: tile, height: tile, background: bg, borderRadius: "var(--slds-g-radius-border-3)", flex: "none", ...style }}>
        <svg width={Math.round(px * 0.92)} height={Math.round(px * 0.92)} style={{ fill: "#fff" }} aria-hidden="true">
          <use href={href} />
        </svg>
      </span>
    );
  }

  /* ---------- Material Symbols fallback ---------- */
  const isMono = category === "utility" || category === "doctype";
  const glyphStyle = {
    fontSize: px,
    fontVariationSettings: `"FILL" ${filled ? 1 : 0}, "wght" 400, "GRAD" 0, "opsz" ${px}`,
    lineHeight: 1,
  };
  if (isMono) {
    return (
      <span className={`material-symbols-rounded ${className}`} {...a11y}
        style={{ color: VARIANT_COLOR[variant] || VARIANT_COLOR.default, flex: "none", ...glyphStyle, ...style }}>
        {glyphFor(name)}
      </span>
    );
  }
  const tile = px + Math.round(px * 0.5);
  const bg = STANDARD_COLORS[name] || STANDARD_COLORS.default;
  return (
    <span className={className} {...a11y}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: tile, height: tile, background: bg, borderRadius: "var(--slds-g-radius-border-3)", flex: "none", ...style }}>
      <span className="material-symbols-rounded"
        style={{ color: "#fff", fontSize: Math.round(px * 0.86), fontVariationSettings: `"FILL" 1, "wght" 500, "GRAD" 0, "opsz" ${px}`, lineHeight: 1 }}>
        {glyphFor(name)}
      </span>
    </span>
  );
}
