import React, { Component } from 'react';
import { List,Image } from 'semantic-ui-react'

class EventsListAttendee extends Component {
  render() {
    const{attendee} = this.props;
    // to write comments in JSX use /* blah */
    //with semantic UI react components when we want an image but use as something else
    return (
      <List.Item>
          <Image as = 'a' size = 'mini' circular src = {attendee.photoURL}/>
      </List.Item>
    );
  }
}

export default EventsListAttendee;