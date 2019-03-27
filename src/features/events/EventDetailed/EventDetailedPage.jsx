import React from 'react'
import {connect} from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChats from './EventDetailedChats';
import EventDetailedSideBar from './EventDetailedSideBar';

const mapState = (state,ownProps) =>{
  const eventId = ownProps.match.params.id;
  //stores the eventId in this in this var

  let event = {};

  if(eventId && state.events.length >0){
    event = state.events.filter(event => event.id === eventId)[0] //checks if we have events in our store
    //the filter returns a new array so we need to specificy the index
  }
  return{event}

}
const EventDetailedPage = ({event}) => {
  return (
    <Grid>
        <Grid.Column width = {10}>
        
            <EventDetailedHeader event = {event}/>
            <EventDetailedInfo event = {event} />
            <EventDetailedChats/>

        </Grid.Column>
        <Grid.Column width = {6}>
          <EventDetailedSideBar attendees = {event.attendees}/>
        </Grid.Column>
    </Grid>
    
  )
}

export default connect(mapState)(EventDetailedPage);

//This is a stateless functional component