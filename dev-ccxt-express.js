"use strict";

var express = require("express");
var app = express();
const ccxt = require("ccxt");
require("dotenv").config();

// V a r i a b l e s
const port = 80;
// -------------------------------------------------------------------------- //
app.use(express.json({ extended: false }));
// P O S T  M e t h o d
app.post("/", function (req, res, next) {
  let { body } = req;

  if (body.side == "buy") {
    let max = 0.025 
    console.log(`Buy: ${max} USDT`);
    binance.marketBuy("BTCUSDT", max); // <----------------------------------- !
  } else if (body.side == "sell") {
    let min = 0.01
    console.log(`Sell: ${min} BTC`);
    binance.marketSell("BTCUSDT", min);  // <--------------------------------- !
  } else if (body.side == "stop") {
    // F e t c h  B a l a n c e
    let binanceBalance = await exchange.fetchBalance();
    console.log(binanceBalance);
    let max = binanceBalance.; // <-------------------------------------------- !
    console.log(`Stop: ${max} BTC`);
    binance.marketSell("BTCUSDT", max); // <---------------------------------- !
  } else {
    console.log(`${body} ERROR`);
  }
  //console.log(body) // <---------------------------------------------------- !
  res.status(200).end();
});

app.listen(port, function () {
  console.log(`listening on *:${port}`);
});


// -------------------------------------------------------------------------- //
(async () => {
  try {
    // I n s t a n t i a t e  E x c h a n g e
    const exchangeId = "binance",
      exchangeClass = ccxt[exchangeId],
      exchange = new exchangeClass({
        verbose: false,
        apiKey: process.env.BINANCE_APIKEY,
        secret: process.env.BINANCE_SECRET,
        timeout: 30000,
        enableRateLimit: true,
        options: {
          createMarketBuyOrderRequiresPrice: false,  // <----------------- ! OFF
        },
      });

  } catch (error) {
    console.log(error);
  }
})();
