import request from "request";
import cheerio from "cheerio";
import TelegramApi from "node-telegram-bot-api";
const token = "2138642011:AAHQO3s7OleGMT-Tg3-MJPCLBXOk7JtaIiE";

const bot = new TelegramApi(token, { polling: true });
const URL = "https://quote.rbc.ru/ticker/59111";

request(URL, (err, res, body) => {
  const $ = cheerio.load(body);
  const userId = 648634090;
  let dollar = $(".chart__info__sum").text();
  let updateDollar = dollar;

  setInterval(() => {
    dollar = $(".chart__info__sum").text();

    if (updateDollar !== dollar) {
      updateDollar = dollar;
      bot.sendMessage(userId, `Current dollar rate is ${dollar}`);
    }
  }, 10000);

  bot.on("message", async ({ text }) => {
    switch (text) {
      case "/start":
        bot.sendMessage(
          userId,
          "You are welcomed by a bot for tracking the exchange rate. To see the current dollar exchange rate, send /dollar"
        );
        break;
      case "/follow":
        bot.sendMessage(userId, id);
        break;
      case "/dollar":
        bot.sendMessage(userId, `Доллар США: ${dollar}`);
        break;
      default:
        bot.sendMessage(userId, "send /dollar");
    }
  });
});
