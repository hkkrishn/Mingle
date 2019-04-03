import React, { Component } from 'react';
import { connect } from 'react-redux';
import {incrementCounter, decrementCounter  } from './TestActions';
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {Button  } from 'semantic-ui-react';
import { openModal } from '../modals/modalActions'




//Map state to Props
const mapState = (state) =>({
  data: state.test.data,
})

const actions = {
  incrementCounter,
  decrementCounter,
  openModal

}


//test refers to the testReducers

class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
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
    const {incrementCounter,decrementCounter,data,openModal} = this.props
    return (
      <div>
        <Script
          url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDzbphusfigdQaMcGNj8-lzpud6WvVHzyM&libraries=places'
          onLoad = {this.handleScriptLoad}
        />
        <h1>Test Area</h1>
        <h3>The answer is: {data} </h3>
        <Button onClick = {incrementCounter} color = 'green' content = 'Increase' />
        <Button onClick = {decrementCounter} color = 'red' content = 'Decrease' />
        <Button onClick={() =>{
          console.log('Button Clicked')
          openModal('TestModal', {data: 42})
        }} color = 'teal' content = 'Open Modal' />
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