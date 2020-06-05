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
      });
    // F e t c h  B T C  B a l a n c e 
    let binanceBalance = await exchange.fetchBalance();
    console.log(binanceBalance.BTC.free);
  } catch (error) {
    console.log(error);
  }
})();