import puppeteer from 'puppeteer';

const [, , selector, outPath, width, height] = process.argv;

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: Number(width) || 1440, height: Number(height) || 900 });

const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 300));

await page.evaluate((sel) => {
  const el = document.querySelector(sel);
  const rect = el.getBoundingClientRect();
  window.scrollTo(0, window.scrollY + rect.top + rect.height * 0.02);
}, selector);

await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: outPath });

console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'CONSOLE_ERRORS: none');
await browser.close();
