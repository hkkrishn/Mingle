import React, { Component } from 'react';
import { connect } from 'react-redux';
import {incrementCounter, decrementCounter  } from './TestActions';
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import {Button} from 'semantic-ui-react';


//Map state to Props
const mapState = (state) =>({
  data: state.test.data,
})

const actions = {
  incrementCounter,
  decrementCounter

}

//test refers to the testReducers

class TestComponent extends Component {
  state = {
    address:'',
    scriptLoaded:false
  }
handleScriptLoad= () =>{
  this.setState({scriptLoaded:true})
}

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }
  onChange = (address) => this.setState({address})
  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
    const {incrementCounter,decrementCounter,data} = this.props
    return (
      <div>
        <Script
          url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAbxHjZbf2F4Ecxz_KXF1jTvzXNnC-_smM&libraries=places'
          onLoad = {this.handleScriptLoad}
        />
        <h1>Test Area</h1>
        <h3>The answer is: {data} </h3>
        <Button onClick = {incrementCounter} color = 'green' content = 'Increase' />
        <Button onClick = {decrementCounter} color = 'red' content = 'Decrease' />
        <br/>
        <br/>
        <form onSubmit={this.handleFormSubmit}>
        {this.state.scriptLoaded && <PlacesAutocomplete inputProps={inputProps} />}
        <button type="submit">Submit</button>
      </form>
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);