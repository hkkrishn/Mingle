import React, { Component } from 'react';
import { connect } from 'react-redux';
import {incrementCounter, decrementCounter  } from './TestActions';
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
  render() {
    const {incrementCounter,decrementCounter,data} = this.props
    return (
      <div>
        <h1>Test Area</h1>
        <h3>The answer is: {data} </h3>
        <Button onClick = {incrementCounter} color = 'green' content = 'Increase' />
        <Button onClick = {decrementCounter} color = 'red' content = 'Decrease' />
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);