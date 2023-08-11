import createURL from './createURL.js';
import startScript from '../index.js';
import { DELAY } from '../config/config.js';

async function getOrderID(page, orderID, browser) {
  try {
    console.log('Getting last order ID...');

    await page.evaluate(() => {
      location.reload(true);
    });

    await page.waitForSelector('.want-card');

    const element = await page.$('.want-card');

    const newOrderID = await element.evaluate((el) =>
      el.getAttribute('data-id')
    );

    if (orderID != newOrderID) {
      console.log('There is a new order!');
      console.log('Sending the info in telegram...');

      const title = await element.$eval(
        '.wants-card__header-title > a[href]',
        (el) => el.innerHTML
      );
      const budget = await element.$eval(
        '.wants-card__price > span[lang]',
        (el) => parseInt(el.innerHTML.replace(/(&nbsp;|\s)/g, ''))
      );
      const link = 'https://kwork.ru/new_offer?project=' + newOrderID;
      const url = createURL(title, budget, link);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.ok === true) {
            console.log('Order info was successfully sended!');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.log('There is no new order :(');
    }

    orderID = await element.evaluate((el) => el.getAttribute('data-id'));
    setTimeout(getOrderID, DELAY, page, orderID, browser);
  } catch (error) {
    console.log('Something went wrong:', error);
    console.log('Reloading script...');
    await browser.close();
    await startScript();
  }
}

export default getOrderID;
