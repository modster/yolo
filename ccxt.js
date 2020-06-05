var express = require('express')
var app = express()
const ccxt = require ('ccxt')
require('dotenv').config();

// V a r i a b l e s
const port = 80  // change this to process.env.PORT || 80 for serverless

// I n s t a n t i a t e  E x c h a n g e 
// (see snippets)
const exchangeId = 'binance'
    , exchangeClass = ccxt[exchangeId]
    , exchange = new exchangeClass ({
        'apiKey': 'process.env.BINANCE_APIKEY',
        'secret': 'process.env.BINANCE_SECRET',
        'timeout': 5000,
        'verbose': true,
        'enableRateLimit': true,//----------------------------------------! E X T R A   C O M M A, tab spacing ?
    })

// T e s t
console.log (ccxt.exchanges)

// S o m e t h i n g //--------------------------------------------------------------!
app.use(express.json({ extended: false }))

// G e t  M e t h o d
// to do

// P o s t  M e t h o d
app.post('/', function (req, res, next) {
  let { body } = req;

  if( body.direction == 'buy' ) {
    let max = //-------------------------------------------------------------------!
    console.log(`Buy: ${max} USDT`);
    binance.marketBuy('BTCUSDT', max);
    }

  else if( body.direction == 'sell' ) {
    let min = //-----------------------------------------------------------------!
    console.log(`Sell: ${min} BTC`);
    binance.marketSell('BTCUSDT', min);
  }

  else if( body.direction == 'stop' ) {
    let max = req.btcBalance//--------------------------------------------------!
    console.log(`Stop: ${max} BTC`);
    binance.marketSell('BTCUSDT', max);
  }

  else {
    console.log(`${body} ERROR`);
  }

  //console.log(body) //------------------------------------------------------------!
  res.status(200).end();
});

app.listen(port, function(){
  console.log(`listening on *:${port}`);
});