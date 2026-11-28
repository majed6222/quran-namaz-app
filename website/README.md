# Quran & Namaz — Astro website

This folder contains the initial static Astro website layer. The existing application at the repository root is intentionally untouched.

## Local development

```sh
cd website
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

Astro outputs static files to `dist/`.

## Current scope

- Bengali-first home page
- Quran index route listing all 114 Surahs
- 114 statically generated Surah metadata pages
- XML sitemap and robots.txt
- Shared layout, title, description and canonical URL

Surah pages currently show metadata extracted from the existing app's `SR` dataset: Arabic/Bengali names, transliteration, ayah count and revelation category. The metadata has been checked for 114 entries, unique slugs and sequential numbering. Quran Arabic ayah text, translations, tafsir and audio are not yet embedded in these SEO pages; they will only be integrated after source and licensing review.

## Deployment

Configure the hosting provider with:
- Root directory: `website`
- Build command: `npm run build`
- Output directory: `dist`

Set the `SITE_URL` environment variable to the actual production URL before deployment. Until then, the build uses the placeholder `https://example.pages.dev`. Canonical URLs and the sitemap use the configured Astro site URL.
