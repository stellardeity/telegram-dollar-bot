const request = require("request");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const UserModel = require("./models.js");
const TelegramApi = require("node-telegram-bot-api");

const token = "2138642011:AAHQO3s7OleGMT-Tg3-MJPCLBXOk7JtaIiE";

const bot = new TelegramApi(token, { polling: true });
const URL = "https://quote.rbc.ru/ticker/59111";

request(URL, async (err, res, body) => {
  const $ = cheerio.load(body);
  let dollar = $(".chart__info__sum").text().trim();
  let updateDollar = dollar;

  await mongoose.connect(
    "mongodb+srv://antares:new_user31@telegram-bot.50pk9.mongodb.net/users",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  bot.setMyCommands([
    { command: "/start", description: "Start" },
    { command: "/dollar", description: "Getting the dollar rate" },
  ]);

  bot.on("message", async ({ text, chat: { id } }) => {
    switch (text) {
      case "/start":
        const user = await UserModel.findOne({ id });
        if (!user) {
          await UserModel.create({ id });
        }
        bot.sendMessage(
          id,
          "You are welcomed by a bot for tracking the exchange rate. To see the current dollar exchange rate, send /dollar"
        );
        break;
      case "/dollar":
        bot.sendMessage(id, `Доллар США: ${dollar}`);
        break;
      default:
        bot.sendMessage(id, "send /dollar");
    }
  });
});
