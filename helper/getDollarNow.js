import request from "request";
import cheerio from "cheerio";
import config from "../config.js";

export default function getDollarNow(URL) {
  return new Promise((resolve, reject) => {
    request(config.URL, (req, res, body) => {
      if (!body)
        reject({ message: "The site with need information has been deleted" });
      const $ = cheerio.load(body);
      const dollarContent = $(".chart__info__sum").text();
      resolve(dollarContent);
    });
  });
}
