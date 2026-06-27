---
name: salesforce-slds2-design
description: Use this skill to generate well-branded interfaces and assets for Salesforce (Lightning Design System 2 / Cosmos theme), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and Lightning Experience UI kit components for prototyping Sales/Service Cloud and Lightning Platform UIs.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files (token CSS under `tokens/`, React primitives under `components/`, the interactive `ui_kits/lightning-crm/` recreation, and the `guidelines/` specimen cards).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view — link `styles.css` for the tokens, load `_ds_bundle.js` for the components (`window.SalesforceSLDS2DesignSystem_2eee88`), and copy `assets/icons/*.svg` (the real SLDS icon sprites) alongside so the `Icon` component can fetch them. Follow the visual + content rules in the README. If working on production code, copy assets and read the rules here to become an expert in designing with SLDS 2 (the icons are the real SLDS sprites; only the **Salesforce Sans** typeface is substituted with Public Sans — swap it for the licensed original in production).

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask a few clarifying questions (which Salesforce product/surface, light or dark theme, fidelity, variations), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
