import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, 300));

const btn = await page.$('.btn--primary');
const box = await btn.boundingBox();

await page.screenshot({ path: 'tools/qa-out/magnetic-before.png', clip: { x: box.x - 40, y: box.y - 40, width: box.width + 80, height: box.height + 80 } });

// Mueve el mouse hacia una esquina del botón (no el centro) para que el desplazamiento sea visible.
await page.mouse.move(box.x + box.width - 6, box.y + 6, { steps: 10 });
await new Promise((r) => setTimeout(r, 400));

await page.screenshot({ path: 'tools/qa-out/magnetic-after.png', clip: { x: box.x - 40, y: box.y - 40, width: box.width + 80, height: box.height + 80 } });

await browser.close();
console.log('done');
