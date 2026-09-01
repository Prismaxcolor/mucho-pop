import puppeteer from 'puppeteer';

const [, , url, outPath, widthArg, heightArg] = process.argv;
const width = Number(widthArg) || 1440;
const height = Number(heightArg) || 900;

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width, height });

const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: outPath, fullPage: true });

await browser.close();

if (consoleErrors.length) {
  console.log('CONSOLE_ERRORS:');
  consoleErrors.forEach((e) => console.log(' -', e));
} else {
  console.log('CONSOLE_ERRORS: none');
}
console.log('Screenshot saved to', outPath);
