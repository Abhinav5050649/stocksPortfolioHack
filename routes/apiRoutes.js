const axios = require('axios');
const express = require('express');
const router = express.Router();


const {time_series_monthly_Adjusted, time_series_weekly_Adjusted, news_sentiments, inflation,cpi} = require('../api/apis');

router.get( '/get/timeseriesweekly', (req, res)=>{
  const company = req.body;

  if (res.headersSent) {
    return;
  }
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${company.company}&apikey=7GS96CNUZ6GG8B4K`)
    .then (response =>{
      res.status(200).json(response.data)
    })
    .catch(err =>{
      res.status(400).json ({err: err.message});
    
    });
router.get('/get/timeseriesmonthly', (req, res)=>{
  const company = req.body;
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${company.company}&apikey=7GS96CNUZ6GG8B4K`)
    .then(response =>{
      res.status(200).json(response.data)
      
    })
    .catch(err =>{
      res.status(400).json({err: err.message});
    } )
  });
  router.get('/get/newssentiments', (req, res)=>{
    const body = req.body;
    axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${body.tickers}&topics=${body.topic}&apikey=7GS96CNUZ6GG8B4K`)  
    .then(response =>{
      res.status(200).json(response.data)
      
    })
    .catch(err =>{
      res.status(400).json({err: err.message});
    } )
  });
  router.get('/get/inflation', (req, res)=>{
    axios.get('https://www.alphavantage.co/query?function=INFLATION&apikey=7GS96CNUZ6GG8B4K')
    .then(response =>{
      res.status(200).json(response.data)
    
    })
    .catch(err =>{
      res.status(400).json({err: err.message});
    } )
  });
  router.get('/get/cpi', (req, res)=>{
    axios.get('https://www.alphavantage.co/query?function=CPI&interval=semiannual&apikey=7GS96CNUZ6GG8B4K')
    .then(response =>{
      res.status(200).json(response.data)
      
    })
    .catch(err =>{
      res.status(400).json({err: err.message});
    } )
  });
  
});

module.exports = router;
