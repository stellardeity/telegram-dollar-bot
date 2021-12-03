import TelegramApi from "node-telegram-bot-api";
import getDollarNow from "./getDollarNow.js";
import config from "./config.js";

const bot = new TelegramApi(config.TOKEN, { polling: true });
let dollarOld;
let users = [];

setInterval(() => {
  for (let i = 0; i < users.length; i++) {
    getDollarNow().then((dollar) => {
      if (dollar !== dollarOld) {
        bot.sendMessage(users[i], `The US dollar has been changed: ${dollar}`);
        dollarOld = dollar;
      }
    });
  }
}, 1000);

bot.on("message", async ({ text, chat: { id } }) => {
  if (!!text.match(/javascript/gi)) {
    bot.sendPoll(id, "Is JavaScript perfect?", ["Sure", "Of course"]);
  } else if (text === "/start") {
    bot.sendMessage(
      id,
      "You are welcomed by an exchange rate tracking bot. \nTo see the current dollar exchange rate, you can send /dollar. \nIf you want to get a dollar every time it changes, you can send /follow\nPS Try you  send /javascript "
    );
  } else if (text === "/info") {
    bot.sendMessage(id, "https://quote.rbc.ru/ticker/59111");
  } else if (text === "/dollar") {
    getDollarNow().then((dollar) => {
      bot.sendMessage(id, `The US dollar: ${dollar}`);
      dollarOld = dollar;
    });
  } else if (text === "/follow") {
    users.push(id);
    bot.sendMessage(id, "Done.");
  } else {
    bot.sendMessage(id, "Send /dollar");
  }
});
