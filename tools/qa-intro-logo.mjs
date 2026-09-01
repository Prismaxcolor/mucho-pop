import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });

for (let i = 0; i < 8; i += 1) {
  await page.screenshot({ path: `tools/qa-out/intro-${i}.png`, clip: { x: 0, y: 60, width: 700, height: 260 } });
  await new Promise((r) => setTimeout(r, 250));
}

console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'CONSOLE_ERRORS: none');
await browser.close();
