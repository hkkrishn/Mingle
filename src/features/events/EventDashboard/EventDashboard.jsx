import {connect  } from 'react-redux';
import React, { Component } from 'react';
import {Grid,Button} from 'semantic-ui-react';
import EventList from '../EventsList/EventsList'
import EventForm from '../EventForm/EventForm';
import {createEvent,deleteEvent,updateEvent  } from '../EventActions';
import cuid from 'cuid';
import 'semantic-ui-css'

const mapState = (state) =>({
  events:state.events
})

const actions = {
  createEvent,
  deleteEvent,
  updateEvent
}

class EventDashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      selectedEvent:null,
    };
  }


  handleFormOpen = () =>{
    console.log('Form Closed')
    this.setState({isOpen:true,selectedEvent:null,})
  }

  handleFormCancel = () =>{
    this.setState({isOpen:false})
  }

  handleCreateEvents = (newEvent) => {
    console.log('New Event Created');
    newEvent.id = cuid();
    newEvent.PhotoURL = '/assets/user.png'
    this.props.createEvent(newEvent); 
    this.setState({
      isOpen: false
    });
  }

  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId)
  }
  //this is going to return a new array with all the events that dont match eventId and store that in updatedEvents.
  

  handleOpenEvent = (eventToOpen) => () =>{
    this.setState({selectedEvent:eventToOpen,isOpen:true})

  }

  handleUpdateEvent = (updatedEvent) => {
    this.props.updateEvent(updateEvent);
    this.setState({
      isOpen:false,
      selectedEvent:null
    })
  }
  render() {
    const {selectedEvent} = this.state;
    const {events} = this.props;
    return (
      <Grid>
        <Grid.Column width = {10}>
          <EventList  onEventDelete = {this.handleDeleteEvent} onEventOpen = {this.handleOpenEvent} events = {events}/>
        </Grid.Column>
        <Grid.Column width = {6}>
          <Button onClick = {this.handleFormOpen} positive content="Create Event"/>      
          {this.state.isOpen && 
          <EventForm  updateEvent = {this.handleUpdateEvent}selectedEvent = {selectedEvent} handleCancel = {this.handleFormCancel} createEvent = {this.handleCreateEvents} onEventEdit = {this.handleEditEvent}/>
          }
          
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState,actions)(EventDashboard);