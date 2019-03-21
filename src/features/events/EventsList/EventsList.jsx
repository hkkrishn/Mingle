import React, { Component } from 'react';
import EventListItem from './EventsListItem'

class EventsList extends Component {
  
  render() {
    const {events,onEventOpen,onEventDelete} = this.props;
    return (
           <div>
            
             {events.map((event)=>(
               <EventListItem key = {event.id} event = {event} onEventOpen = {onEventOpen} onEventDelete ={onEventDelete}/>
             ))}
           </div>
    );
  }
}

export default EventsList;