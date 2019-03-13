import React, { Component } from 'react';
import './App.css';
import { SiteHeader } from './Components/SiteHeader';
import { StockList } from './Components/StockList';
import { StockButton} from "./Components/StockButton";
import { InformationWindow} from "./Components/InformationWindow";
import { getStockInfo } from "./Backend/getStockInfo";
import { calculateStockResults} from "./Backend/calculateStockResults";
import { ReadStocks, SaveStocks } from './Backend/stockCookies';
import { StockChart} from "./Components/StockChart";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: ReadStocks(),
      selectedStock: 'No Selected Stock',
      stockInfo: '',
      stockData: '',
      dayValue: 20,
      rangeValue: 2,
      useClose: true,
    };
    this.handleStockChange = this.handleStockChange.bind(this);
    this.handleStockClick = this.handleStockClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleStockChange(stock){
    let updatedArray = this.state.stocks.concat(stock.toUpperCase());
    this.setState((prevState, props) => ({
      stocks: updatedArray,
    }));
    SaveStocks(updatedArray);
    this.handleStockClick(stock.toUpperCase());
  }

  async handleStockClick(stockId){
    if(this.state.selectedStock !== stockId){
      try {
        let stockInfo = await getStockInfo(stockId, this.state.dayValue, this.state.rangeValue, this.state.useClose);
        this.setState({
          stockInfo: stockInfo[0],
          stockData: stockInfo[1],
        })
      } catch (error) {
        alert('Problem getting stock data: \n');
      }
    }
    this.setState({
      selectedStock: stockId,
    });
  }

  handleDelete(stock){
    let index = this.state.stocks.indexOf(stock.toUpperCase());
    let updatedArray = this.state.stocks;
    updatedArray.splice(index, 1);
    this.setState({
      stocks: updatedArray
    });
    SaveStocks(updatedArray);
  }

  handleRangeChange(range){
    this.setState({
      rangeValue: range,
      stockInfo: calculateStockResults(this.state.stockData, this.state.dayValue, range, this.state.useClose),
    });
  }

  handleDayChange(day){
    this.setState({
      dayValue: day,
      stockInfo: calculateStockResults(this.state.stockData, day, this.state.rangeValue, this.state.useClose),
    });
  }

  handleSelectChange(){
    this.setState((prevState, props) => ({
      useClose: !prevState.useClose,
      stockInfo: calculateStockResults(prevState.stockData, prevState.dayValue, prevState.rangeValue, !prevState.useClose)
    }));
  }

  render() {
    return (
      <div className="App">
        <SiteHeader title="Should I Buy?" />
        <div id="leftBar" >
          <StockList
            id="StockList"
            stocks={this.state.stocks}
            onStockClick={this.handleStockClick}
            onDeleted={this.handleDelete}/>
          <StockButton
            onStockChange={this.handleStockChange}
            stocks={this.state.stocks}/>
        </div>
        <div id="mainScreen">
          <InformationWindow
            id={this.state.selectedStock}
            results={this.state.stockInfo}
            onRangeChange={this.handleRangeChange}
            onDayChange={this.handleDayChange}
            onSelectChange={this.handleSelectChange}
            value={this.state.useClose}/>
          <StockChart
            StockIsSelected={this.state.selectedStock !== 'No Selected Stock'}
            StockData={this.state.stockData}
            LowStop={this.state.stockInfo['lowStopSeries']}
            HighStop={this.state.stockInfo['highStopSeries']}/>
        </div>
      </div>
    );
  }
}

export default App;
