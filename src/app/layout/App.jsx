import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard'
import NavBar from '../../features/nav/NavBar/NavBar';
import {Container} from 'semantic-ui-react'
import './App.css';
import EventForm from '../../features/events/EventForm/EventForm';
import EventDetailedPage from '../../features/events/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashBoard/PeopleDashBoard';
import UserDetailed from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import HomePage from '../../features/home/HomePage'
import TestComponent from '../../features/testarea/TestComponent';


//Initialize routes to the multiple pages below!
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route  exact path = '/' component = {HomePage} />
        </Switch>

        <Route path = "/(.+)" render = {() =>(
        <div>
          <NavBar/>
          <Container className = "main">
            <Switch>
              <Route path = '/events' component = {EventDashboard} />
              <Route path = '/test' component = {TestComponent} />
              <Route path="/event/:id" component={EventDetailedPage} />
              <Route path = '/people' component = {PeopleDashboard} /> 
              <Route path = '/profile/:id' component = {UserDetailed} /> 
              <Route path = '/settings' component = {SettingsDashboard} /> 
              <Route path = '/createEvent' component = {EventForm} />  
            </Switch>
          </Container>
        </div>
        )}/>
      </div>
      
    );
  }
}

export default App;
