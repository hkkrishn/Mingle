/* global google */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {reduxForm,Field  } from 'redux-form';
import Script from 'react-load-script';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate'
import {Form,Segment,Button,Grid,Header} from 'semantic-ui-react';
import { createEvent,updateEvent } from '../EventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import cuid from 'cuid';
import moment from 'moment'

//we need to make a decision


const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  };
};


const actions = {
  createEvent,
  updateEvent
}

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];
const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired({message: 'Please provide a category'}),
  description: composeValidators(
    isRequired({message: 'Please enter a description'}),
    hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
})

class EventForm extends Component {
  state  = {
    cityLatLng:{},
    venueLatLng: {},
    scriptLoaded:false,
  }
  handleCitySelect = (selectedCity) =>{
    geocodeByAddress(selectedCity)
    .then(results =>getLatLng(results[0]))
    .then(latlng =>{
      this.setState({cityLatLng:latlng})
    })
    .then(()=>{
      this.props.change('city',selectedCity)
    })

  };
  onFormSubmit = values => {
    values.date = moment(values.date).format()
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Hari'
      };
      this.props.createEvent(newEvent);
      this.props.history.push('/events');
    }
  };

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  //handleSubmit is a redux-Forms functions
  render() {
    const {invalid, submitting, pristine} = this.props;
    return (
      <Grid>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDzbphusfigdQaMcGNj8-lzpud6WvVHzyM&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width = {10}>

          <Segment>
            <Header sub color='teal' content = 'Event Details'/>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                  <Field 
                  name='title' 
                  type='text' 
                  component={TextInput} 
                  placeholder = 'Give your event a name'/>
                  <Field 
                  name='category' 
                  type='text' 
                  component={SelectInput} 
                  options = {category}
                  placeholder = 'What is your event about?'/>
                  <Field 
                  name='description' 
                  type='text' 
                  component={TextArea}
                  rows = {3}
                  placeholder = 'Tell us about your event'/>
                  <Header sub color='teal'content = 'Event Location Details'/>
                  <Field name='city' type='text' component={PlaceInput} options = {{types:['(cities)']}} placeholder='Event City' onSelect = {this.handleCitySelect}/>
                  {this.state.scriptLoaded&&
                 <Field name='venue' 
                 type='text' 
                 component={PlaceInput} 
                 options = {{
                   location: new google.maps.LatLng(this.state.cityLatLng),
                   radius:1000,
                   types:['establishment']}}
                 placeholder = 'Event Venue'/>}
                  <Field 
                  name='date' 
                  type='text' 
                  component={DateInput} 
                  dateFormat="MM/dd/yyyy HH:mm"
                  timeFormat = 'HH:mm'
                  showTimeSelect
                  placeholder = 'Date and Time of Event'/>
                  <Button disabled={invalid || submitting || pristine} positive type="submit">
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

export default connect(mapState, actions)(
  reduxForm({ form: 'eventForm', enableReinitialize: true,validate})(EventForm)
);