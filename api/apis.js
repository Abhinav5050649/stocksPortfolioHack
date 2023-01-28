const express = require('express');
const async = require('hbs/lib/async');

const time_series_weekly_Adjusted =  (req, res)=>{
    return time_series_weekly_Adjusted_url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=IBM&apikey=7GS96CNUZ6GG8B4K';
}

const time_series_monthly_Adjusted = async(req, res)=>{
    
return time_series_monthly_Adjusted_url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo';
}



const news_sentiments = (req, res)=>{
 return news_sentiments_url = 'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=7GS96CNUZ6GG8B4K';
}

const inflation = (req, res)=>{
 return inflation_url = 'https://www.alphavantage.co/query?function=INFLATION&apikey=7GS96CNUZ6GG8B4K';

}
const cpi = (req, res)=>{
    return  cpi_url = 'https://www.alphavantage.co/query?function=CPI&interval=monthly&apikey=7GS96CNUZ6GG8B4K';

}

module.exports = {time_series_monthly_Adjusted, time_series_weekly_Adjusted, news_sentiments, inflation,cpi};
