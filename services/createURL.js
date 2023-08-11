import { TOKEN, CHAT_ID } from '../config/config.js';

function createURL(title, budget, link) {
  const text = encodeURIComponent(
    `New order!\n\nTitle: ${title}\nBudget: ${budget}₽\nMax budget: ${
      budget * 3 + '₽'
    }\n\nLink -> ${link}
`
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
