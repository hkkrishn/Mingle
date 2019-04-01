import React, { Component } from 'react';
import {connect} from 'react-redux';
import {reduxForm,Field  } from 'redux-form';
import {Form,Segment,Button,Grid,Header} from 'semantic-ui-react';
import { createEvent,updateEvent } from '../EventActions';
import TextInput from '../../../app/common/form/TextInput'
import TextArea from '../../../app/common/form/TextArea'
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
    return (
      <Grid>
        <Grid.Column width = {10}>

          <Segment>
            <Header sub color='teal' content = 'Event Details'/>
                <Form onSubmit = {this.onFormSubmit}>
                  <Field 
                  name='title' 
                  type='text' 
                  component={TextInput} 
                  placeholder = 'Give your event a name'/>
                  <Field 
                  name='category' 
                  type='text' 
                  component={TextInput} 
                  placeholder = 'What is your event about?'/>
                  <Field 
                  name='description' 
                  type='text' 
                  component={TextArea}
                  rows = {3}
                  placeholder = 'Tell us about your event'/>
                  <Header sub color='teal'content = 'Event Location Details'/>
                  <Field name='city' type='text' component={TextInput} placeholder = 'Event City'/>
                  <Field name='venue' type='text' component={TextInput} placeholder = 'Event Venue'/>
                  <Field name='date' type='text' component={TextInput} placeholder = 'Event Date'/>
                  <Button positive type="submit" onClick ={this.onFormSubmit}>
                    Submit
                  </Button>
                  <Button onClick = {this.props.history.goBack} type="button">Cancel</Button>
                </Form>
              </Segment>
        </Grid.Column>
      </Grid>
             
    );
  }
}

export default connect(mapState,actions)(reduxForm({form:'eventForm'})(EventForm));