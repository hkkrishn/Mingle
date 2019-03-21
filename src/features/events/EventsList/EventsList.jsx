import React, { Component } from 'react';
import EventListItem from './EventsListItem'

class EventsList extends Component {
  
  render() {
    const {events,onEventOpen} = this.props;
    return (
           <div>
            
             {events.map((event)=>(
               <EventListItem key = {event.id} event = {event} onEventOpen = {onEventOpen}/>
             ))}
           </div>
    );
  }
}

export default EventsList;