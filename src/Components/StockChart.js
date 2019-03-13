import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { parseData} from "../Backend/calculateStockResults";
import { ChartControl } from "./ChartControl";

export class StockChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      close: true,
      open: false,
      high: false,
      low: false,
      stops: true,
    };
    this.onChartChange = this.onChartChange.bind(this);
  }

  onChartChange(name, checked){
    this.setState({
      [name]: checked,
    })
  }

  render(){

    const dataUnformated = parseData(this.props.StockData);
    let data = [];
    let max = dataUnformated['close'][0], min = dataUnformated['close'][0];
    let fullLength = dataUnformated['close'].length;

    for(let i = 0 ; i < fullLength ; i++){
      let closeValue = parseFloat(dataUnformated['close'][i]).toFixed(2);
      let openValue = parseFloat(dataUnformated['open'][i]).toFixed(2);
      let highValue = parseFloat(dataUnformated['high'][i]).toFixed(2);
      let lowValue = parseFloat(dataUnformated['low'][i]).toFixed(2);
      let highStop = null;
      let lowStop = null;
      if(i !== 0){
        highStop = this.props.HighStop[i - 1];//always check the previous days stops to compares todays data to
        lowStop = this.props.LowStop[i - 1];
      }

      let dataObject = {
        date: dataUnformated['labels'][i],
        close: closeValue,
        open: openValue,
        high: highValue,
        low: lowValue,
        highStop: highStop,
        lowStop: lowStop,
      };
      data.push(dataObject);
      let curMax = Math.max(closeValue,openValue,highValue,lowValue);
      if(max < curMax){max=curMax}
      if(min > curMax){min=curMax}
    }

    let chartOutput = '';
    let chartControls = '';
    if(this.props.StockIsSelected){
      chartOutput = (
        <div id='Chart'>
          <LineChart width={800} height={300} data={data}
                     margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="date"/>
            <YAxis domain={[parseFloat(min)-1, parseFloat(max)+1]} />
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            {this.state.stops ? <Line type="monotone" dataKey="highStop" stroke="#07DE16" dot={null} strokeDasharray="5 5" /> : null}
            {this.state.close ? <Line type="monotone" dataKey="close" stroke="#5800DE" dot={null}/> : null}
            {this.state.open ? <Line type="monotone" dataKey="open" stroke="#EE41C2" dot={null}/> : null}
            {this.state.high ? <Line type="monotone" dataKey="high" stroke="#12DE9E" dot={null}/> : null}
            {this.state.low ? <Line type="monotone" dataKey="low" stroke="#DE4800" dot={null}/> : null}
            {this.state.stops ? <Line type="monotone" dataKey="lowStop" stroke="#DE2902" dot={null} strokeDasharray="5 5" /> : null}
          </LineChart>
        </div>
      );

      chartControls = (
        <ChartControl close={this.state.close} open={this.state.open} low={this.state.low} high={this.state.high} stops={this.state.stops} handleChange={this.onChartChange} />
      );
    }

    return (
      <div id='StockChart' >
        {chartOutput}
        {chartControls}
      </div>
    );
  }
}
