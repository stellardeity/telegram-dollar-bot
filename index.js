const TelegramApi = require("node-telegram-bot-api");
const fetch = require("node-fetch");
const token = "2138642011:AAHQO3s7OleGMT-Tg3-MJPCLBXOk7JtaIiE";

const bot = new TelegramApi(token, { polling: true });

bot.on("message", async ({ text, chat: { id } }) => {
  if (text === "money") {
    const res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    const json = await res.json();
    const usd = json.Valute.USD;
    bot.sendMessage(id, `${usd.Name}: ${usd.Value}`);
  }
});
