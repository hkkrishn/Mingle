import {CREATE_EVENT,DELETE_EVENT,UPDATE_EVENT } from './EventConstants';

export const createEvent = (event) =>{
  return{
    type:CREATE_EVENT,
    payload:{
      event
    }
  }
}

export const updateEvent = (event) =>{
  return{
    type:UPDATE_EVENT,
    payload:{
      event
    }
  }
}

export const deleteEvent = (eventId) =>{
  return{
    type:DELETE_EVENT,
    payload:{
      eventId
    }
  }
}