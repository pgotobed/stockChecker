import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

export class StockButton extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
    };
    this.changeStock = this.changeStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  changeStock(){
    if(this.state.value !== '') {
      this.props.onStockChange(this.state.value);
      this.setState({
        value: '',
      });
    }
  }

  handleChange(event){
    this.setState({
      value: event.target.value,
    });
  }

  render(){
    return(
      <div>
        <TextField style={{margin: 12}} onChange={this.handleChange} label="Add Stock" value={this.state.value}/>
        <Button raised={true} color="primary" style={{margin: 12}} onClick={this.changeStock} disabled={this.props.stocks.includes(this.state.value.toUpperCase()) || this.state.value === '' }>
          Add Stock
        </Button>
      </div>
    );
  }
}