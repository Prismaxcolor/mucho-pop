import puppeteer from 'puppeteer';

const [, , url, outPrefix, widthArg, heightArg, stepsArg] = process.argv;
const width = Number(widthArg) || 1440;
const height = Number(heightArg) || 900;
const steps = Number(stepsArg) || 4;

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width, height });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 }).catch((e) => console.log('goto warn:', e.message));
await new Promise((r) => setTimeout(r, 1500));

const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
const totalScroll = Math.max(scrollHeight - height, height * (steps - 1));

for (let i = 0; i < steps; i += 1) {
  const y = Math.round((totalScroll / (steps - 1)) * i);
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${outPrefix}-${i}.png` });
  console.log(`saved ${outPrefix}-${i}.png at scrollY=${y}`);
}

await browser.close();
