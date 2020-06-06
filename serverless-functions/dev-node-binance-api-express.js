var express = require('express')
var app = express()
const ccxt = require ('ccxt')
require('dotenv').config();

// V a r i a b l e s
const port = 80  // change this to process.env.PORT || 80 for serverless

// I n s t a n t i a t e  E x c h a n g e 
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_APIKEY,
  APISECRET: process.env.BINANCE_SECRET,
  useServerTime: true,
  recvWindow: 4000,
  verbose: false,
  test: true,//----------------------------------------! test mode
  reconnect: true
});

//  T e s t  M o d e
console.log ("Test Mode: ", binance.getOption('test'));

app.use(express.json({ extended: false })) // for parsing application/json

async function btcUsdtPrice (req, res, next) {
  let ticker = await binance.prices();
  req.btcUsdtPrice = ticker.BTCUSDT;
  next();
}

function getBalances(req, res, next) {
  binance.balance((error, balances) => {
    if (error) return console.error(error);
    next();
  });
}

app.use(getBalances);  //----------------------------------------!
app.use(btcUsdtPrice); //----------------------------------------!

app.post('/', function (req, res, next) {
  let { body } = req;

  if( body.direction == 'buy' ) {
    let max = req.usdtBalance
      binance.marketBuy('BTCUSDT', max);//----get usdt balance------------------------------------!
    }

  else if( body.direction == 'sell' ) {
    binance.marketSell('BTCUSDT', min);
  }

  else if( body.direction == 'stop' ) {
    let max = req.btcBalance
    console.log(`Stop: ${max} BTC`);
    binance.marketSell('BTCUSDT', max);//----------------------------------------!
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