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

## Progress update — 28 November 2026

- [x] Astro shell and Bengali-first layout added under `website/`.
- [x] Static metadata pages generated for all 114 surahs.
- [x] Sitemap and robots.txt added (replace the example domain before deployment).
- [x] First Quran reader integration added to each surah page: Arabic Uthmani text, selectable Bengali translation where available, font-size controls, ayah copy and device-local bookmarks.
- [ ] Run and pass `npm run build` in a network-enabled environment.
- [ ] Verify Quran.com/alquran.cloud API responses, translation metadata and rendered text against trusted printed editions.
- [x] Add the initial ayah-by-ayah audio player and opt-in tajweed color display (implementation added; source verification and browser testing remain pending).
- [ ] Add tafsir and reading-progress integration after source/licensing review.
- [ ] Integrate the existing Namaz and Dua modules and preserve legacy user data.
- [ ] Complete mobile/browser, accessibility, offline and backup/restore tests.
- [ ] Set the real `SITE_URL`, deploy a preview, and obtain user approval before production cutover.

The new reader currently depends on an internet connection. It does not yet provide offline Quran text, audio playback, tajweed highlighting or tafsir. Bookmarks are stored locally in the browser under a new key and are not synchronized between devices.

### Step 1 — Ayah-by-ayah audio player (implementation added)

- [x] Added eight reciter options matching the existing application's reciter folder identifiers.
- [x] Added EveryAyah per-ayah MP3 URL construction using zero-padded three-digit surah and ayah numbers.
- [x] Added per-ayah Listen buttons, previous/next controls, continuous playback, playback speed and browser-native seek/volume controls.
- [x] Remember selected reciter locally in the browser.
- [ ] Test the actual MP3 URLs for all eight reciters; folder availability can vary.
- [ ] Test playback, sequential transition, errors and mobile browser behavior.
- [ ] Confirm audio hosting terms/attribution before public release.

Implementation reference: `website/src/pages/quran/surah/[slug].astro`.

This is an implementation milestone only; no successful browser playback or production build has yet been confirmed.

### Build validation automation

- [x] Added `.github/workflows/astro-build.yml` to run `npm install` and `npm run build` on pushes to `astro-migration` that change the website, and via manual dispatch.
- [ ] Confirm the first GitHub Actions run completes successfully. The workflow file is committed, but its run result has not yet been confirmed.


### Step 2 — Tajweed color display (implementation added)

- [x] Added an opt-in “তাজবিদের রং দেখান” control to each Surah reader page.
- [x] Fetches Quran.com API v4 `uthmani_tajweed` data only when the user enables the feature.
- [x] Maps recognized tajweed rule classes to a Bengali color legend.
- [x] Compares each color-coded ayah's text with the plain Uthmani ayah before applying colors; a mismatch leaves that ayah uncolored.
- [x] Builds the display using DOM nodes and text nodes rather than inserting the API markup as raw HTML.
- [ ] Verify the API response and text-matching behavior across short and long Surahs.
- [ ] Review the color mapping/legend with a qualified tajweed teacher; colors are learning aids, not a substitute for instruction.
- [ ] Test toggle behavior, mobile layout, accessibility and network/API failure handling in a browser.

Implementation reference: `website/src/pages/quran/surah/[slug].astro`.

The tajweed feature is implemented but not yet browser- or scholarly-verified. The GitHub Actions build passed for the first tajweed implementation commit; a subsequent small normalization fix is awaiting its own build run.
