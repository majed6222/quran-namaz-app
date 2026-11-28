# Technical Audit — Quran & Namaz App

Audit date: 2026-11-28
Audited ref: `main`
Repository: https://github.com/majed6222/quran-namaz-app

## Scope and safety

- The default `main` branch was read for inspection only.
- A separate `astro-migration` branch was created from `main`.
- No files on `main` were modified.
- No existing application files have been edited or deleted.
- This is a source-level inspection, not a local build or runtime test. The repository has not been cloned or executed in this audit environment.

## Repository snapshot

The root directory currently exposes two files:

| File | Observed size | Role |
|---|---:|---|
| `index.html` | 387,443 bytes | Single-file application: markup, inline CSS, JavaScript, content metadata and feature logic |
| `sw.js` | 1,948 bytes | Service worker for app-shell and font caching |

Default branch: `main`. Repository visibility: public.

## Existing application architecture

### Front end

- Single-page application implemented in a large `index.html`.
- Inline CSS with responsive layout, light/dark themes, accessibility states and print styles.
- Client-side hash routing, e.g. `#/surah/1`, with a route dispatcher and dynamically rendered views.
- Bengali interface and Arabic text support.

### Identified features from source inspection

- Quran index and 114-surah metadata.
- Surah reader, ayah navigation, translations, transliteration option and tajweed display.
- Tafsir and selected asbab al-nuzul content.
- Reciter selection and ayah-by-ayah audio player, including playback controls and alternate audio source.
- Namaz lessons, prayer tutorials and prayer recitations.
- Dua categories and dua content.
- Hifz/revision, quiz/flashcards, goals, reading progress and streak tracking.
- Bookmarks, notes, recent history and settings.
- Prayer times and Qibla-related interface.
- Offline downloads, reports, review labels and privacy/about/verification views.
- Local backup/export and restore flows are present in the source.

### Storage

- Small preferences and user state use `localStorage` under the `hqn_` key prefix.
- Larger Quran/translation/audio caches use IndexedDB database `hqn`, with `kv` and `audio` object stores.
- Existing code includes a migration path from older localStorage cache keys into IndexedDB.
- The current implementation has no account requirement or server-side user database.

### External dependencies observed

- Quran text/translation/tafsir: Quran.com API v4.
- Optional English transliteration: alquran.cloud.
- Recitation audio: everyayah.com, with an alternate cdn.islamic.network source.
- Google Fonts are loaded conditionally.
- External data availability and licensing/terms need a separate review before public content redistribution or pre-bundling.

### Service worker

- Cache names observed: `hqn-shell-v2` and `hqn-fonts-v1`.
- Same-origin GET requests use a cache-first/network-fallback strategy.
- Google Fonts are cached separately.
- Service worker comments state that Quran data and audio are managed by the app in IndexedDB.
- A notification-click handler exists, but this alone does not establish a complete push-notification subscription/delivery system.

## Key migration risks

1. The app is a monolith. Rewriting it in one pass risks regressions across many interconnected features.
2. Existing localStorage key names and IndexedDB schema are user data contracts. Preserve them unless a tested migration is introduced.
3. Existing hash URLs may be used in bookmarks or shared links. Keep the current app working while adding SEO routes separately.
4. Quran/translation/tafsir/audio data sources must not be silently replaced or redistributed without verifying source terms and attribution requirements.
5. Prayer calculation, religious text and fiqh content require domain-specific verification; migration must not alter their meaning.
6. The existing service worker has cache lifecycle behavior that must be tested before changing cache names or scope.
7. The current source has not yet been built or tested in a browser in this environment.

## Recommended non-destructive approach

- Keep `main` as the untouched production baseline.
- Do all migration work on `astro-migration`.
- Add Astro as a separate website layer first.
- Reuse the existing source and data only through explicit, tested extraction; do not duplicate or hand-retype Quran text.
- Keep the legacy app available at a stable route while SEO pages are introduced.
- Preserve local-first storage and provide export/import before considering optional sync.
- Use pull requests for review; do not merge to `main` without explicit approval.

## Next audit tasks

- Complete a full inventory of all inline data arrays and feature modules.
- Identify the exact boot sequence, service-worker registration and IndexedDB upgrade/version strategy.
- Run a local baseline test of the current app before migration.
- Confirm the existing app's deployment URL and any existing manifest/icon assets not present in the repository root listing.
