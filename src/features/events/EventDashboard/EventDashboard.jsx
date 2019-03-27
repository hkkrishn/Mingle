import {connect  } from 'react-redux';
import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import EventList from '../EventsList/EventsList'
import {deleteEvent} from '../EventActions';
import 'semantic-ui-css'

const mapState = (state) =>({
  events:state.events
})

const actions = {
  deleteEvent,

}

class EventDashboard extends Component {
  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId)
  }
  //this is going to return a new array with all the events that dont match eventId and store that in updatedEvents.
  

 
  render() {
   
    const {events} = this.props;
    return (
      <Grid>
        <Grid.Column width = {10}>
          <EventList  onEventDelete = {this.handleDeleteEvent}  events = {events}/>
        </Grid.Column>
        <Grid.Column width = {6}>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState,actions)(EventDashboard);