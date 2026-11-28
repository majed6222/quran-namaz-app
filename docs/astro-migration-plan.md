# Non-destructive Astro Migration Plan

## Architecture decisions

- Website framework: Astro static site generation.
- Data model: local-first; no account or mandatory cloud database.
- Existing app: retain as the feature-rich application engine during migration.
- Hosting target: Cloudflare Pages free tier, subject to current plan limits.
- Development branch: `astro-migration`.
- Production baseline: `main`; no direct changes.

## Delivery sequence

### Milestone 0 — Baseline and safety
- Preserve the current `main` branch.
- Record current source inventory and feature list.
- Establish a reproducible local test/build procedure.
- Capture screenshots or manual test results for critical flows.

### Milestone 1 — Astro shell
- Add a standalone `website/` Astro project.
- Build a Bengali-first responsive site shell, navigation and metadata.
- Do not import or rewrite the existing app yet.
- Verify static build output.

### Milestone 2 — Content model and SEO pages
- Extract only verified metadata/content from the existing source.
- Create typed content schemas for surah metadata, duas and lessons.
- Generate individual static routes for each content item.
- Add canonical URLs, Open Graph metadata, sitemap and robots.txt.
- Preserve source attribution and licensing metadata.

### Milestone 3 — Existing app integration
- Keep the current app accessible as a distinct app route or entry point.
- Reuse existing feature logic where technically safe.
- Avoid changing localStorage keys, IndexedDB database/object-store names or backup format.
- Test old hash links and internal navigation.

### Milestone 4 — Local-first PWA
- Review manifest and service-worker scope.
- Add installability and offline caching without deleting existing user caches.
- Provide user-controlled content/audio downloads.
- Test cache upgrades, offline launch and data export/import on supported browsers.

### Milestone 5 — QA and deployment
- Run static build and link checks.
- Test desktop/mobile layouts and key existing features.
- Validate SEO metadata and sitemap.
- Deploy preview from `astro-migration` to Cloudflare Pages.
- Only propose production cutover after user review.

## Non-negotiable safeguards

- Never commit migration changes directly to `main`.
- Never delete or replace the original `index.html` or `sw.js` during early milestones.
- Never overwrite user data or change storage keys without a versioned migration and backup.
- Never fabricate Quran text, hadith references, translations or scholarly approvals.
- No backend or account system is required for the initial local-first release.
