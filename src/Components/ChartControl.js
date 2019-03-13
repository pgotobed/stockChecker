import React, { Component } from 'react';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

export class ChartControl extends Component {
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = name => (event, checked) => {
    this.props.handleChange(name, checked);
  };

  render(){
    return(
      <div id='ChartControl' >
        <FormControl component="fieldset">
          <FormLabel component='legend' >Chart Views</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.close}
                  onChange={this.handleChange('close')}
                  value='close'
                />
              }
              label="Close"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.open}
                  onChange={this.handleChange('open')}
                  value='open'
                />
              }
              label="Open"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.high}
                  onChange={this.handleChange('high')}
                  value='high'
                />
              }
              label="High"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.low}
                  onChange={this.handleChange('low')}
                  value='low'
                />
              }
              label="Low"
            />
            <FormControlLabel
            control={
              <Checkbox
                checked={this.props.stops}
                onChange={this.handleChange('stops')}
                value='stops'
              />
            }
            label="stops"
          />
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}