import React, { Component } from 'react';
import { List,Image } from 'semantic-ui-react'

class EventsListAttendee extends Component {
  render() {
    // to write comments in JSX use /* blah */
    //with semantic UI react components when we want an image but use as something else
    return (
      <List.Item>
          <Image as = 'a' size = 'mini' circular src = 'https://randomuser.me/api/portraits/women/42.jpg'/>
      </List.Item>
    );
  }
}

export default EventsListAttendee;