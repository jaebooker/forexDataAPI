require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { parse } = require('dotenv');
const express = require('express')
const app = express()
const port = process.env.PORT || 80

app.get('/', async (req, res) => {
  console.log(req.query);
  let stocks = await fetch(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/AAPL?apiKey=${process.env.API_KEY}`)
  let stocksResponse = await stocks.json();

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.send([
    {name: "AAPL", price: stocksResponse.ticker.day.c}
  ]);
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })