import React, { Component } from 'react';
import EventListItem from './EventsListItem'

class EventsList extends Component {
  render() {
    return (
           <div>
             <EventListItem/>
             <EventListItem/>
             <EventListItem/>
             <EventListItem/>
           </div>
    );
  }
}

export default EventsList;