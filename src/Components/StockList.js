import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import {StockComponent} from "./StockComponent";

const styles = theme => ({
  root: {
    width: '10%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
});

export class StockList extends Component{
  render() {
    let stockItems = [];
    const stockIds = this.props.stocks;

    for(let x = 0 ; x < stockIds.length ; x++){
      stockItems.push(<StockComponent stock={stockIds[x]} onStockClick={() => this.props.onStockClick(stockIds[x])} onDeleted={() => this.props.onDeleted(stockIds[x])}/>);
    }

    return (
      <div align="left">
        <List>
          {stockItems}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(StockList);