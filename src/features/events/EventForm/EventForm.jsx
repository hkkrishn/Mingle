import React, { Component } from 'react';
import {Form,Segment,Button} from 'semantic-ui-react';

//we need to make a decision
const emptyEvent = {
        title:'',
        date:'',
        city:'',
        venue:'',
        hostedBy:'',
}
class EventForm extends Component {
  state = {
    event:emptyEvent,
  }
  componentDidMount(){
    if(this.props.selectedEvent !== null){
      this.setState({event:this.props.selectedEvent})
    }
  }

  componentWillReceiveProps(nextProps){
       if(nextProps.selectedEvent !== this.props.selectedEvent){
         this.setState({
           event:nextProps.selectedEvent || emptyEvent
         })
       }
  }

  onFormSubmit = (e) =>{
    e.preventDefault();
    console.log('Form Submitted')
    if(this.state.event.id){
      this.props.updateEvent(this.state.event)
    }else{
      this.props.createEvent(this.state.event)
    }
    //console.log(this.state.event)
      

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
               <Button onClick = {handleCancel} type="button">Cancel</Button>
             </Form>
           </Segment>
             
    );
  }
}

export default EventForm;