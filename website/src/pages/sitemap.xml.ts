import surahs from '../data/surahs.json';

export const prerender = true;

const SITE = import.meta.env.SITE || 'https://example.pages.dev';

export async function GET() {
  const paths = [
    '/',
    '/quran/',
    ...surahs.map((surah) => `/quran/surah/${surah.slug}/`)
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${SITE}${path}</loc></url>`).join('\n')}
</urlset>`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
