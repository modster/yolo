var express = require('express')
var app = express()
const ccxt = require ('ccxt')
require('dotenv').config();

// V a r i a b l e s
const port = 80  // change this to process.environment.etc before going serverless

//const min = 0.01 // setting min notional manually for now
//const maxx= 0.025 // setting max notional manually for now

// T e s t
console.log (ccxt.exchanges)

app.use(express.json({ extended: false }))

app.post('/', function (req, res, next) {
  let { body } = req;

  if( body.direction == 'buy' ) {
    // the min and max should match the pine strategy
    let max = //----------------------------------------!
    console.log(`Buy: ${max} USDT`);
    binance.marketBuy('BTCUSDT', max);
    }

  else if( body.direction == 'sell' ) {
    let min = //----------------------------------------!
    console.log(`Sell: ${min} BTC`);
    binance.marketSell('BTCUSDT', min);
  }

  else if( body.direction == 'stop' ) {
    let max = req.btcBalance//----------------------------------------!
    console.log(`Stop: ${max} BTC`);
    binance.marketSell('BTCUSDT', max);
  }

  else {
    console.log(`${body} ERROR`);
  }

  console.log(body)
  res.status(200).end();
});

app.listen(port, function(){
  console.log(`listening on *:${port}`);
});