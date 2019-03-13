export function calculateStockResults(response, days, range, useClose) {
  let parsedData = parseData(response);
  let extractedData = calculatedData(parsedData, days, range);
  //return determineAction(extractedData['series'], parsedData['series'][3]);
  return determineAction(extractedData, useClose);
}

export function parseData(response) {
  //open, high, low, close, volume
  let formatedData = {
    labels: [],
    open: [],
    high: [],
    low: [],
    close: [],
    series: [
      {
        name: 'open',
        data: []
      }, {
        name: 'high',
        data: []
      }, {
        name: 'low',
        data: []
      }, {
        name: 'close',
        data: []
      }/*, {
                name: 'volume',
                data: []
            }*/
    ]
  };
  for (let key in response) {
    if (response.hasOwnProperty(key)) {
      formatedData['labels'].unshift(key);
      formatedData['open'].unshift(response[key]['1. open']);
      formatedData['high'].unshift(response[key]['2. high']);
      formatedData['low'].unshift(response[key]['3. low']);
      formatedData['close'].unshift(response[key]['4. close']);
    }
  }
  return formatedData;
}

function calculatedData (historicalData, days, range) {
  let calculatedData = {
    labels: [],
    dhdl: [],//daily high minus low
    ycdh: [],//yesterday close - todays high
    ycdl: [],//yesterday close - todays low
    tradeRange: [],//max of all others
    avgTradeRange: [],//over x days
    stopLow: [],//close - range * avgTradeRange
    stopHigh: [],//close - range * avgTradeRange
    close: [],
  };

  const open = historicalData['open'];
  const high = historicalData['high'];
  const low = historicalData['low'];
  const close = historicalData['close'];
  for(let x = 0 ; x < open.length ; x++){
    const hL=high[x] - low[x];
    let ycDH = null, ycDL = null, avgTR = null, stopLow = null, stopHigh = null;
    if(x !== 0){
      ycDH=close[x-1] - high[x];
      ycDL=close[x-1] - low[x];
    }
    let tR = Math.max(hL,ycDH,ycDL);

    calculatedData['dhdl'].push(hL);
    calculatedData['ycdh'].push(ycDH);
    calculatedData['ycdl'].push(ycDL);
    calculatedData['tradeRange'].push(tR);
    calculatedData['labels'].push(historicalData['labels']);//same date range

    if(x >= days){
      avgTR = 0;
      for(let i = 0 ; i < days ; i++){
        avgTR += calculatedData['tradeRange'][x-i];
      }
      avgTR /= days;
      stopLow = parseFloat(close[x-1]) - (range * avgTR);
      stopHigh = parseFloat(close[x-1]) + (range * avgTR);
      calculatedData['avgTradeRange'].push(avgTR);
      calculatedData['stopLow'].push(stopLow);
      calculatedData['stopHigh'].push(stopHigh);
    }
    else{
      calculatedData['avgTradeRange'].push(null);
      calculatedData['stopLow'].push(null);
      calculatedData['stopHigh'].push(null);
    }
  }

  calculatedData['close'] = close;

  return calculatedData;
}

function determineAction(stopData, useClose){
  let closeMod = useClose ? 1 : 0;

  let actions = {
    'sell': false,
    'buy': false,
    'currentPrice': parseFloat(stopData['close'][stopData['close'].length - 1]),
    'prevClose': parseFloat(stopData['close'][stopData['close'].length - 2]),
    'highStop': parseFloat(stopData['stopHigh'][stopData['stopHigh'].length - 2 - closeMod]),
    'lowStop': parseFloat(stopData['stopLow'][stopData['stopLow'].length - 2 - closeMod]),
    'highStopSeries': stopData['stopHigh'],
    'lowStopSeries': stopData['stopLow'],
  };
  //-1: most recent data used/too early if before end of day
  //-2: last close used
  //-3: historical data used
  let decisionPoint = useClose ? actions['prevClose'] : actions['currentPrice'];
  if(actions['lowStop'] >= decisionPoint){
    actions['sell'] = true;
  }

  if(actions['highStop'] <= decisionPoint){
    actions['buy'] = true;
  }
  return actions;
}