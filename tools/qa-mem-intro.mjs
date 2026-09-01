import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('https://www.meminteriores.com', { waitUntil: 'domcontentloaded', timeout: 30000 });

for (let i = 0; i < 10; i += 1) {
  await page.screenshot({ path: `tools/qa-out/mem-intro-${i}.png`, clip: { x: 500, y: 250, width: 450, height: 200 } });
  await new Promise((r) => setTimeout(r, 300));
}

await browser.close();
