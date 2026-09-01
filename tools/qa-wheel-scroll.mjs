import puppeteer from 'puppeteer';

const [, , url, outPrefix, ticks] = process.argv;
const totalTicks = Number(ticks) || 8;

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto(url, { waitUntil: 'load', timeout: 30000 });
await page.mouse.move(720, 450);
await page.screenshot({ path: `${outPrefix}-0.png` });

for (let i = 1; i <= totalTicks; i += 1) {
  await page.mouse.wheel({ deltaY: 220 });
  await new Promise((r) => setTimeout(r, 250));
  await page.screenshot({ path: `${outPrefix}-${i}.png` });
  const scrollY = await page.evaluate(() => window.scrollY);
  console.log(`tick ${i}: window.scrollY = ${scrollY}`);
}

console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'CONSOLE_ERRORS: none');
await browser.close();
