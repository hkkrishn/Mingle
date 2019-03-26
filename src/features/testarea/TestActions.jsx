import {INCREMENT_COUNTER,DECREMENT_COUNTER  } from './TestConstants';


//the following is an example of a pure function ie no sideeffects
export const incrementCounter = () =>{
  return {
    type: INCREMENT_COUNTER,
    //can also have a payload
  }
}

export const decrementCounter =() =>{
  return {
    type:DECREMENT_COUNTER
  }
}