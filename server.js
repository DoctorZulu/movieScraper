import express from "express";
import cors from "cors";
import request from "request";
import * as cheerio from "cheerio";

var options = {
  url: "https://www.google.com/ncr",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16",
  },
};

const app = express();
/* app.use(cors({ credentials: true, origin: whitelist }));
app.use(express.json()); */

app.get("/", function (request, response) {
  response.send("Welcome to IMDB Crawler");
});

/* request(options, function () {
  request(
    "https://www.google.com/search?q=godzilla+vs+kong+movie+review",
    function (error, response, body) {
      var $ = cheerio.load(body);
      console.log("HELLO");
      console.log(body);

      $(".TzHB6b").each(function () {
        var review = $(this);
        var text = review.text();
      });
    }
  );
}); */

var options = {
  url: "http://www.google.com/ncr",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16",
  },
};
request(options, function () {
  request(
    "https://www.google.com/search?q=godzilla+vs+kong+movie+review",
    function (error, response, body) {
      var $ = cheerio.load(body);
      $("div").each(function () {
        var link = $(this);
        var text = link.text();
        console.log(text);
      });
    }
  );
});

const PORT = 4000;
app.listen(PORT, function () {
  console.log(`Server is live on ${PORT}`);
});
