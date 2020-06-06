"use strict";
// -------------------------------------------------------------------------- //
const ccxt = require("ccxt");
require("dotenv").config();
// -------------------------------------------------------------------------- //
(async () => {
  try {
    const exchangeId = "binance",
      exchangeClass = ccxt[exchangeId],
      exchange = new exchangeClass({
        //'verbose': process.argv.includes ('--verbose'),
        verbose: false,
        apiKey: process.env.BINANCE_APIKEY,
        secret: process.env.BINANCE_SECRET,
        timeout: 30000,
        enableRateLimit: true,
        options: {
          createMarketBuyOrderRequiresPrice: false,
        },
      });
    // ---------------------------------------------------------------------- //
    // F e t c h  B T C  B a l a n c e 
    let binanceBalance = await exchange.fetchBalance();
    console.log(binanceBalance.BTC.free);

    // G e t  O r d e r B o o k
    const orderBook = await ocean.fetchOrderBook("REP/ZRX");
    console.log("REP/ZRX orderbook: ", orderBook);

    // placing order
    const placeResult = await ocean.createOrder(
      "REP/ZRX",
      "limit",
      "sell",
      "0.5",
      "30"
    );
    const id = placeResult["id"];
    console.log("result of placing order: ", placeResult);

    // ---------------------------------------------------------------------- //
  } catch (error) {
    console.log(error);
  }
})();