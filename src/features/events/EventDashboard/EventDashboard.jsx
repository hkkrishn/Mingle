import React, { Component } from 'react';
import {Grid,Button} from 'semantic-ui-react';
import EventList from '../EventsList/EventsList'
import EventForm from '../EventForm/EventForm';
import cuid from 'cuid';
import 'semantic-ui-css'



const eventsData = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]

class EventDashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      events:eventsData,
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
    const updatedEvents = [...this.state.events,newEvent] 
    this.setState({
      events: updatedEvents,
      isOpen: false
    });
    console.log(this.state)
  }

  handleOpenEvent = (eventToOpen) => () =>{
    this.setState({selectedEvent:eventToOpen,isOpen:true})

  }

  handleUpdateEvent = (updatedEvent) => {
    this.setState({
      events:this.state.events.map(event => {
        if(event.id === updatedEvent.id){
          return Object.assign({},updatedEvent)
        } else{
          return event
        }
      }),
      isOpen:false,
      selectedEvent:null
    })
  }
  render() {
    const {selectedEvent} = this.state;
    return (
      <Grid>
        <Grid.Column width = {10}>
          <EventList onEventOpen = {this.handleOpenEvent} events = {this.state.events}/>
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

export default EventDashboard;