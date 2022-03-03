import TelegramApi from "node-telegram-bot-api";
import getDollarNow from "./helper/getDollarNow.js";
import getNumberFn from "./helper/getNumber.js";
import config from "./config.js";

const bot = new TelegramApi(config.TOKEN, { polling: true });

let dollarOld = "0";
let users = [];

setInterval(() => {
  for (let i = 0; i < users.length; i++) {
    getDollarNow().then((dollar) => {
      const first = getNumberFn(dollar);
      const second = getNumberFn(dollarOld);
      const changes = second - first || (second - first) % 1;
      if (Math.abs(changes) >= users[i].change) {
        bot.sendMessage(
          users[i].id,
          `US dollar: ${dollar.trim()}.`
        );
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
      "You are welcomed by an exchange rate tracking bot. \nTo see the current dollar exchange rate, you can send /dollar. \nIf you want to get a dollar every time it changes, you can send /follow\nPS Try you  send /javascript."
    );
  } else if (text === "/info") {
    bot.sendMessage(id, "https://quote.rbc.ru/ticker/59111");
    const user = users.find((u) => u.id === id);
    if (!user) {
      bot.sendMessage(
        id,
        "You haven't followed yet. Enter the command /follow."
      );
    } else {
      bot.sendMessage(
        id,
        `Now the dollar exchange rate sent when the value changes to ${user.change}.`
      );
    }
  } else if (text === "/dollar") {
    getDollarNow().then((dollar) => {
      bot.sendMessage(id, `US dollar: ${dollar.trim()}.`);
      dollarOld = dollar;
    });
  } else if (text === "/follow") {
    const user = users.find((u) => u.id === id);
    if (!user) {
      users.push({ id, change: 0.2 });
      bot.sendMessage(id, "Done.");
    } else {
      bot.sendMessage(id, "You have already been subscribed :).");
    }
  } else {
    bot.sendMessage(id, "Send /dollar.");
  }
});
