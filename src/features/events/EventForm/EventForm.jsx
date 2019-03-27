import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Form,Segment,Button} from 'semantic-ui-react';
import { createEvent,updateEvent } from '../EventActions';
import cuid from 'cuid';

//we need to make a decision


const mapState = (state,ownProps) =>{
  const eventId = ownProps.match.params.id

  let event = {
        title:'',
        date:'',
        city:'',
        venue:'',
        hostedBy:'',

  }

  if(eventId && state.events.length > 0){
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return{
    event
  }
}

const actions = {
  createEvent,
  updateEvent
}

class EventForm extends Component {
  state = {
    event:Object.assign({},this.props.event),
  }
  

  

  onFormSubmit = (e) =>{
    e.preventDefault();
    console.log('Form Submitted')
    if(this.state.event.id){
      this.props.updateEvent(this.state.event)
      this.props.history.goBack();
    }else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      }
      this.props.createEvent(newEvent)
      this.props.history.push('/events')
    }

  }

  onInputChange = (e) =>{
    const newEvent = this.state.event;
    newEvent[e.target.name] = e.target.value//destructure asssingment
    this.setState({event: newEvent})
      console.log(this.state.event)
      
  }
  
  render() {
    const {handleCancel} = this.props;
    //const {createEvents} = this.props;
    const{event}  = this.state;
    return (
      <Segment>
             <Form onSubmit = {this.onFormSubmit}>
               <Form.Field>
                 <label>Event Title</label>
                 <input name = 'title' onChange = {this.onInputChange}  placeholder="Event Title" value = {event.title} />
               </Form.Field>
               <Form.Field>
                 <label>Event Date</label>
                 <input name = 'date' onChange = {this.onInputChange} type="date" placeholder="Event Date" value= {event.date} />
               </Form.Field>
               <Form.Field>
                 <label>City</label>
                 <input name = 'city' onChange = {this.onInputChange} placeholder="City event is taking place" value = {event.city} />
               </Form.Field>
               <Form.Field>
                 <label>Venue</label>
                 <input name = 'venue' onChange = {this.onInputChange} placeholder="Enter the Venue of the event" value = {event.venue} />
               </Form.Field>
               <Form.Field>
                 <label>Hosted By</label>
                 <input name = 'hostedBy' onChange = {this.onInputChange} placeholder="Enter the name of person hosting" value = {event.hostedBy} />
               </Form.Field>
               <Button positive type="submit" onClick ={this.onFormSubmit}>
                 Submit
               </Button>
               <Button onClick = {this.props.history.goBack} type="button">Cancel</Button>
             </Form>
           </Segment>
             
    );
  }
}

export default connect(mapState,actions)(EventForm);