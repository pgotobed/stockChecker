import React, { Component } from 'react';
import { ListItem, ListItemText,ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

export class StockComponent extends Component {
  render(){
    return(
      <ListItem button>
        <ListItemText primary={this.props.stock} onClick={() => this.props.onStockClick()}/>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <DeleteIcon onClick={() => this.props.onDeleted()}/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}