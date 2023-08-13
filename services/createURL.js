import { TOKEN, CHAT_ID } from '../config/config.js';

function createURL(title, description, budget, maxBudget, link) {
  const text = encodeURIComponent(
    `
New order!

Title: ${title}

Description: ${description}

Budget: ${budget}
Max budget: ${maxBudget}

Link → ${link}`
  );

  const url =
    'https://api.telegram.org/bot' +
    TOKEN +
    '/sendMessage?chat_id=' +
    CHAT_ID +
    '&text=' +
    text;
  return url;
}

export default createURL;
