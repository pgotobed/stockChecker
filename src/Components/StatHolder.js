import React, { Component } from 'react';

export class StatHolder extends Component {
  render(){

    let buyDecision = <div id='noSelection' className="ResultTab">Please select a stock to analyse</div>;

    if (this.props.buy){
      buyDecision = <div id='buyStock' className="ResultTab">Recommend buying the stock now</div>
    }
    else if(this.props.sell){
      buyDecision = <div id='sellStock' className="ResultTab">Recommend selling the stock now</div>
    }
    else if(!this.props.sell && !this.props.buy){
      buyDecision = <div id='neutralStock' className="ResultTab">Recomend neither buying or selling</div>
    }

    let finalInfo = null;
    if(this.props.stockSelected) {
      let currentPrice = <div id="currentPrice" className="ResultTab">Current Price:
        ${this.props.results['currentPrice'].toFixed(2)}</div>;
      let prevClose = <div id="prevClose" className="ResultTab">Previous Close:
        ${this.props.results['prevClose'].toFixed(2)}</div>;
      let highStop = <div id="highStop" className="ResultTab">Buy at:
        ${this.props.results['highStop'].toFixed(2)}</div>;
      let lowStop = <div id="lowStop" className="ResultTab">Sell at: ${this.props.results['lowStop'].toFixed(2)}</div>;
      finalInfo = [buyDecision, currentPrice, prevClose, highStop, lowStop]
    }

    return(
      <div id='resultHolder'>
        { finalInfo }
      </div>
    )
  }
}