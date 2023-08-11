import puppeteer from 'puppeteer';

import { LINK } from './config/config.js';
import getOrderID from './services/getOrderID.js';

async function startScript() {
  console.log('Script was started!');

  const browser = await puppeteer.launch({
    maxTargetConcurrency: 1,
    headless: true,
    defaultViewport: {
      width: 800,
      height: 600,
    },
  });

  const page = await browser.newPage();
  console.log('Browser has been successfully opened!');

  let orderID;

  await page.goto(LINK);
  await page.waitForSelector('.want-card');

  const element = await page.$('.want-card');
  orderID = await element.evaluate((el) => el.getAttribute('data-id'));

  getOrderID(page, orderID, browser);
}

startScript();

export default startScript;
