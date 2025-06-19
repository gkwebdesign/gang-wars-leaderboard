const puppeteer = require('puppeteer');
const fs = require('fs');

const leaderboardUrl = 'http://localhost:3000'; // Or wherever your leaderboard is served
const outputImage = 'public/leaderboard.png';

async function takeScreenshot() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(leaderboardUrl, { waitUntil: 'networkidle0' });
  await page.setViewport({ width: 800, height: 600 });
  await page.screenshot({ path: outputImage });
  await browser.close();
  console.log(`✅ Screenshot saved: ${outputImage}`);
}

takeScreenshot().catch(err => console.error(err));
