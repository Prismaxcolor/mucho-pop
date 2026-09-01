import puppeteer from 'puppeteer';

const [, , url, outPath, width, height] = process.argv;

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await page.setViewport({ width: Number(width) || 390, height: Number(height) || 844 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, 300));
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();
console.log('saved', outPath);
