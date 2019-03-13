import React, { Component } from 'react';
import { StockHeader } from './StockHeader'
import { StatHolder} from './StatHolder';
import { Controls } from "./Controls";

export class InformationWindow extends Component {
  render(){
    //{'information for stock ID ' + this.props.id + '\n' + this.props.results}
    let sell = this.props.results['sell'];
    let buy = this.props.results['buy'];
    let stockSelected = this.props.id !== 'No Selected Stock';

    return (
      <div>
        <StockHeader stockSelected={stockSelected} id={this.props.id} />
        <StatHolder
          stockSelected={stockSelected}
          sell={sell}
          buy={buy}
          results={this.props.results}
        />
        <Controls
          onDayChange={this.props.onDayChange}
          onRangeChange={this.props.onRangeChange}
          onSelectChange={this.props.onSelectChange}
          value={this.props.value}
        />
      </div>
    );
  }
}
/*
<SiteHeader
          title={ stockSelected ? 'Showing analyse of: ' + this.props.id : 'Please select a stock in the lefthand menu'}
          id='analHeader'
        />
 */