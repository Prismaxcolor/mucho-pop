import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });

const target = await page.evaluate(() => {
  const el = document.querySelector('#propuesta');
  const rect = el.getBoundingClientRect();
  return { top: window.scrollY + rect.top };
});
await page.evaluate((y) => window.scrollTo(0, y + 100), target.top);
await new Promise((r) => setTimeout(r, 500));

await page.screenshot({ path: 'tools/qa-out/spotlight-before.png' });

await page.mouse.move(300, 400, { steps: 5 });
await page.mouse.move(500, 500, { steps: 15 });
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: 'tools/qa-out/spotlight-after.png' });

console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'CONSOLE_ERRORS: none');
await browser.close();
