var express = require('express')
var app = express()
const Binance = require('node-binance-api');
require('dotenv').config();

const port = 80
const min = 0.0016

// B i n a n c e - N o d e - A P I   O p t i o n s
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_APIKEY,
  APISECRET: process.env.BINANCE_SECRET,
  useServerTime: true,
  recvWindow: 4000,
  verbose: false,
  test: true,
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

app.use(getBalances);
app.use(btcUsdtPrice);

app.post('/', function (req, res, next) {
  let { body } = req;
  console.log(body);
  console.log(`BTC Current Price: ${req.btcUsdtPrice}`);
  console.log(`USDT Available Balance: ${req.usdtBalance}`);
  console.log(`BTC Available Balance: ${req.btcBalance}`);
  let ticker = body.ticker;
  if( body.direction == 'buy' ) {
    let y = parseFloat(req.btcUsdtPrice);
    let x = parseFloat(req.usdtBalance).toFixed(2);
    let price = parseFloat(body.price);
    let stopPrice = parseFloat(body.stop);
    let quantity = x/y * 1000;
    quantity = Math.floor(quantity).toFixed(8);
    quantity = quantity / 1000;
    //console.log(`Price : ${price}  Stop: ${stopPrice}  Quantity: ${quantity}  Ticker: ${ticker}`)
    if(quantity >= min) {
      console.log(`Buy: ${quantity} BTC`);
      binance.marketBuy('BTCUSDT', quantity);
      /*binance.buy("BTCUSDT", quantity, price, {stopPrice: stopPrice, type: type});
      binance.marketBuy("BTCUSDT", quantity, (error, response) => {
        // if(error) => console.log(error); 
        console.info("Market Buy response", response);
        console.info("order id: " + response.orderId);

      }
      */
    }
  }
  else if( body.direction == 'sell' ) {
    if(req.btcBalance >= min) {
      console.log(`Sell: ${min} BTC`);
      binance.marketSell('BTCUSDT', min);
    }
  }

  else if( body.direction == 'stop' ) {
    let max = req.btcBalance
    console.log(`Stop: ${max} BTC`);
    binance.marketSell('BTCUSDT', max);

  }
  else {
    console.log(`${body} ERROR`);
  }
  console.log(body)
  res.status(200).end();
})

app.listen(port, function(){
  console.log(`listening on *:${port}`);
});