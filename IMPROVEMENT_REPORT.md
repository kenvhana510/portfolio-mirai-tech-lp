# Improvement Report — portfolio-mirai-tech-lp

## Changes made
- Removed dead CSS from `css/style.css`: `.img-slot__inner`, `.img-slot__icon`, `.img-slot__meta` (and its `div`/`dt`/`dd`/`--compact` variants), plus the scoped overrides `.workplace .img-slot__meta`, `.workplace .img-slot__meta dd`, `.voice-card .img-slot__meta`. These styled the placeholder component's icon/metadata panel used before real photos were sourced. HANDOFF.md §4/§10 confirms all 12 images were replaced with real `<picture>` elements and "残るプレースホルダーは0件" (zero placeholders remain) — verified no `.img-slot__inner`/`.img-slot__icon`/`.img-slot__meta` element exists anywhere in `index.html`, so these ~25 lines were unreachable. Verified CSS brace balance after edit; zero visual/behavioral change since the selectors never matched anything on the live page.

## Duplicate / dead code found
- The removed `.img-slot__*` metadata rules were the only confirmed-dead CSS. Base `.img-slot`/`.img-slot--photo`/`.img-slot--round` classes are still actively used by all 12 photo containers and were kept.
- `js/main.js` and `index.html` have no dead functions, no stray console/debug statements, no TODO markers.
- Repeated per-card markup (job cards, benefit items, voice cards) is content-driven HTML, not accidental duplication — appropriate for a finished single-page LP that CLAUDE.md/HANDOFF.md mark as complete; not restructured into JS templating to avoid any risk of visual regression on a "done" deliverable.

## Remaining suggestions (not applied, low priority)
- `HANDOFF.md` §2 states "Gitリポジトリではない（.gitなし）" but a `.git` directory now exists in the project — a stale note from an earlier session, harmless but worth a one-line correction next time this file is touched for a real update.
- If a future case-study-detail feature is added, the `.img-slot--photo` + `<picture>` pattern already documented in HANDOFF §6 is ready to reuse as-is.

## Reusable pattern for LEGACRAFT共通資産
- The **`CLAUDE.md` / `PROJECT.md` / `DONE.md` operating framework** in this repo is itself a polished, reusable process template for autonomous LP production (already designed for copy-to-new-project use per CLAUDE.md §9) — a strong candidate to promote directly into a shared LEGACRAFT starter kit.
- The **image pipeline** (Pillow JPEG q84 + WebP q82, `<picture>` WebP-first with JPEG fallback, `images/_source/` backup convention) documented in HANDOFF §6/§11 is a ready-made, project-agnostic checklist for any future LP/portfolio image work.
- The **mobile-first mobile-cta + section-padding CSS specificity gotcha** documented in HANDOFF §8 (`section[class]` generic rule beating `.fv{padding:0}`) is a useful cautionary pattern to carry into future full-bleed-hero LP builds.
