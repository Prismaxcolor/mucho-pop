import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });

for (let i = 0; i < 5; i += 1) {
  await page.mouse.wheel({ deltaY: 300 });
  await new Promise((r) => setTimeout(r, 250));
}
await new Promise((r) => setTimeout(r, 800));

await page.screenshot({ path: 'tools/qa-out/hover-before.png' });

const box = await page.evaluate(() => {
  const line = document.querySelector('.problema__line');
  const rect = line.getBoundingClientRect();
  return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
});
console.log('box', box);

await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: 'tools/qa-out/hover-after.png' });

await browser.close();
