import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { isNumeric } from "../Backend/isNumeric";
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

export class Controls extends Component {
  constructor(props){
    super(props);
    this.state = {
      dayValue: 20,
      dayError: false,
      rangeError: false,
      usePrevStop: true,
    };
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
  }

  handleDayChange(event){
    const value = event.target.value;
    if(isNumeric(value) && parseFloat(value) >= 10 && parseFloat(value) <= 98){
      this.setState({
        dayValue: event.target.value,
        dayError: false,
      });
      this.props.onDayChange(value);
    }
    else{
      this.setState({
        dayError: true,
      });
    }
  }

  handleRangeChange(event){
    const value = event.target.value;
    if(!isNumeric(value) || parseFloat(value) < 1){
      this.setState({
        rangeError: true,
      });
    }
    else{
      this.setState({
        rangeError: false,
      });
      this.props.onRangeChange(value);
    }
  }

  render(){
    const textFieldStyle = {
      margin: 20
    };

    return(
      <div>
        <TextField
          error={this.state.dayError}
          style={textFieldStyle}
          helperText="10 to 98"
          defaultValue={this.state.dayValue}
          label='Days to Average'
          onChange={this.handleDayChange}
        />
        <TextField
          error={this.state.rangeError}
          style={textFieldStyle}
          helperText="1 or higher"
          defaultValue='2'
          label='Range Threshold'
          onChange={this.handleRangeChange}
        />
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Decision Point</FormLabel>
          <RadioGroup value={this.props.value} onChange={this.props.onSelectChange}>
            <FormControlLabel value={true} control={<Radio />} label='Use previous close' />
            <FormControlLabel value={false} control={<Radio />} label='Use current price' />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}