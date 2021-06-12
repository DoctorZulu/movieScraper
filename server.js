import express from "express";
import cors from "cors";
import request from "request";
import * as cheerio from "cheerio";
/* external */
import vendorMovieRating from "./controllers/vendorMovieRating.js"

const app = express();
/* app.use(cors({ credentials: true, origin: whitelist }));
app.use(express.json()); */

app.get("/", function (request, response) {
  response.send("Welcome to IMDB Crawler");
});

/* API Routes */

app.get('/api/movieRating', vendorMovieRating);


let options = {
  url: "http://www.google.com/ncr",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16",
  },
};

request(options, function () {
  request(
    "https://www.google.com/search?q=cruella+movie+review",
    function (error, response, body) {
      let $ = cheerio.load(body);
      $("div").each(function () {
        let link = $(this);
        let text = link.text();
        let movie;

        /* console.log(text.match(/^Rating/)); */
        if (
          text.startsWith("Rating") &&
          text.includes(")") &&
          text.includes("/")
        ) {
          //console.log(text.substring(0,25));
          movie = text.substring(0,25);
          console.log(movie)
          return;
        }
      });
    }
  );
});

const PORT = 4000;



app.listen(PORT, function () {
  console.log(`Server is live on ${PORT}`);
});
