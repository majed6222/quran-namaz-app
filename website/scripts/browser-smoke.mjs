import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const origin = 'http://127.0.0.1:4321';
const server = spawn(process.execPath, ['./node_modules/astro/astro.js', 'preview', '--host', '127.0.0.1', '--port', '4321'], {
  cwd: process.cwd(),
  stdio: ['ignore', 'pipe', 'pipe']
});
let serverOutput = '';
server.stdout.on('data', chunk => { serverOutput += chunk.toString(); });
server.stderr.on('data', chunk => { serverOutput += chunk.toString(); });

let browser;
try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    if (server.exitCode !== null) throw new Error('Astro preview exited early.\n' + serverOutput);
    try {
      const response = await fetch(origin);
      if (response.ok) { ready = true; break; }
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  if (!ready) throw new Error('Astro preview did not become ready.\n' + serverOutput);

  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));

  const home = await page.goto(origin, { waitUntil: 'domcontentloaded' });
  if (!home?.ok()) throw new Error('Homepage did not return HTTP 200.');
  if (!(await page.locator('h1').first().textContent()).includes('আল-কুরআন')) throw new Error('Homepage heading is missing.');
  const fatihahLink = page.locator('a[href="/quran/surah/al-fatihah/"]');
  if (!(await fatihahLink.count())) throw new Error('Homepage Al-Fatihah link is missing or incorrect.');
  await fatihahLink.click();
  await page.waitForURL('**/quran/surah/al-fatihah/');

  const readerControls = ['#load-reader', '#toggle-tajweed', '#load-tafsir', '#quran-audio', '#ayah-list', '#reader-status'];
  for (const selector of readerControls) {
    if (!(await page.locator(selector).count())) throw new Error('Reader control missing: ' + selector);
  }

  await page.goto(origin + '/quran/', { waitUntil: 'domcontentloaded' });
  const surahLinks = page.locator('a[href^="/quran/surah/"]');
  const count = await surahLinks.count();
  if (count !== 114) throw new Error('Expected 114 Surah links, found ' + count + '.');

  if (errors.length) throw new Error('Browser page errors: ' + errors.join(' | '));
  console.log('Browser smoke test passed: homepage, Al-Fatihah route, reader controls, 114 Surah links, mobile viewport.');
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}
