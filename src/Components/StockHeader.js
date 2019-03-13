import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

export class StockHeader extends Component {
  render() {
    return (
      <div id='stockHeader' >
        <Paper elevation={4}>
          <Typography type="headline" component="h3">
            { this.props.stockSelected ? 'Showing analyse of: ' + this.props.id : 'Please select a stock in the lefthand menu'}
          </Typography>
        </Paper>
      </div>
    );
  }
}