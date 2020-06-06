"use strict";

/*          F i r e B a s e   S e r v e r l e s s   F u n c t i o n          */
/*~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~($)~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~*/

// M o d u l e s :
const ccxt = require("ccxt");
require("dotenv").config();

// V a r i a b l e s :
let symbol = 'BTCUSDT';

// I n s t a n t i a t e  T h e  E x c h a n g e :
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
    
    // F e t c h  B T C  B a l a n c e 
    let binanceBalance = await exchange.fetchBalance();
    let amount = binanceBalance.BTC.free * 0.01;
    console.log(`BTC Available Balance: ${binanceBalance.BTC.free}`);

    // P l a c e  O r d e r
    const placeResult = await binance.createMarketSellOrder(symbol, amount);
    const id = placeResult["id"];
    console.log('Binance Response: ', placeResult);

  } catch (error) {
    console.log(error);
  }
  // process.exit();
})();

/*~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~($)~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~*/

