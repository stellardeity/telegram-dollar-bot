import request from "request";
import cheerio from "cheerio";
import TelegramApi from "node-telegram-bot-api";
const token = "2138642011:AAHQO3s7OleGMT-Tg3-MJPCLBXOk7JtaIiE";

const bot = new TelegramApi(token, { polling: true });

const URL = "https://quote.rbc.ru/ticker/59111";

request(URL, (err, res, body) => {
  const $ = cheerio.load(body);
  const dollar = $(".chart__info__sum").text();

  bot.on("message", async ({ text, chat: { id } }) => {
    switch (text) {
      case "/start":
        bot.sendMessage(
          id,
          "You are welcomed by a bot for tracking the exchange rate. To see the current dollar exchange rate, send /dollar"
        );
        break;
      case "/dollar":
        bot.sendMessage(id, `Доллар США: ${dollar}`);
        break;
      default:
        bot.sendMessage(
          id,
          "To see the current dollar exchange rate, send /dollar"
        );
    }
  });
});
