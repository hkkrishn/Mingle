import React, { Component } from 'react';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard'
import NavBar from '../../features/nav/NavBar/NavBar';
import {Container} from 'semantic-ui-react'
import './App.css';

class App extends Component {
  render() {
    return (
      
      <div>
        <NavBar/>
        <Container className = "main">
          <EventDashboard/> 
        </Container>
      </div>
    );
  }
}

export default App;
