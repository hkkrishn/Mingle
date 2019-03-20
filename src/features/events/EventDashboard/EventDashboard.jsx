import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import EventList from '../EventsList/EventsList'
import 'semantic-ui-css'
import $ from 'jquery';


class EventDashboard extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width = {10}>
          <EventList/>
        </Grid.Column>
        <Grid.Column width = {6}>
          <h2>Right Column</h2>
          <p>Dingle is Ready to Mingle</p>
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;