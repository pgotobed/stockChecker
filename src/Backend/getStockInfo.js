import { calculateStockResults } from './calculateStockResults'

const apiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=';
const apiKey = 'SVKBF571CHLQOR47';

export async function getStockInfo(stockId, days, range, useClose) {
  const finalUrl = apiUrl + stockId + '&apikey=' + apiKey;
  try {
    let response = await fetch(finalUrl);
    if(response.ok){
      let jsonResponse = await response.json();
      let data = calculateStockResults(jsonResponse["Time Series (Daily)"], days, range, useClose);
      return [data, jsonResponse["Time Series (Daily)"]];
    }
  }
  catch(error){
    alert('Problem is: ' + error);
    console.log(error);
  }
}
