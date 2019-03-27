import React, { Component } from 'react';
import EventListItem from './EventsListItem'

class EventsList extends Component {
  
  render() {
    const {events,onEventDelete} = this.props;
    return (
           <div>
            
             {events.map((event)=>(
               <EventListItem key = {event.id} event = {event} onEventDelete ={onEventDelete}/>
             ))}
           </div>
    );
  }
}

export default EventsList;