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
- Quran index route
- Static Surah Al-Fatihah introduction route
- Shared layout, title, description and canonical URL

The Surah page is metadata-only. Quran Arabic text, translations and tafsir will only be integrated from verified existing data and sources after content/licensing review.

## Deployment

Configure the hosting provider with:
- Root directory: `website`
- Build command: `npm run build`
- Output directory: `dist`

Set the `SITE_URL` environment variable to the actual production URL before deployment. Until then, the build uses the placeholder `https://example.pages.dev`; replace the same placeholder in `website/public/robots.txt` before publishing. Canonical URLs and the sitemap use the configured Astro site URL.
