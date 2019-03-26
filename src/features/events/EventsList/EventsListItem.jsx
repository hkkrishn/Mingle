import React, { Component } from 'react'
import {Link  } from 'react-router-dom';
import {Segment,Item,Button,Icon,List } from 'semantic-ui-react';
import EventListAttendee from './EventsListAttendee'

export default class EventsListItem extends Component {
  render() {
    const {event,onEventOpen,onEventDelete} = this.props;

    return (
      <Segment.Group>
              <Segment>
                <Item.Group>
                  <Item>
                    <Item.Image size="tiny" circular src ={event.hostPhotoURL} />
                    <Item.Content>
                      <Item.Header as="a">{event.title}</Item.Header>
                      <Item.Description>
                        Hosted by <a  href = "/">{event.hostedBy}</a>
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
              <Segment>
                <span>
                  <Icon name="clock" /> {event.date} |
                  <Icon name="marker" /> {event.venue}
                </span>
              </Segment>
              <Segment secondary>
                <List horizontal>

                {event.attendees&&event.attendees.map((person)=>(
               <EventListAttendee key = {person.id} attendee = {person}/>
             ))}
                </List>
              </Segment>
              <Segment clearing>
                <span>{event.description}</span>
                <Button onClick = {onEventDelete(event.id)} as="a" color="red" floated="right" content="Delete" />
                <Button  as={Link} to ={`/events/${event.id}`} color="teal" floated="right" content="View" />
                
              </Segment>
            </Segment.Group>
    )
  }
}
