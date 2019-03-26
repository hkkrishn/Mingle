import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./TestConstants";
import { createReducer } from '../../app/common/util/reducerUtil'

const initialState = {
  data:420
}

export const incrementCounter = (state,payload) =>{
  return {...state,data:state.data+1};
}

export const decrementCounter = (state,payload) =>{
  return {...state,data:state.data-1};
}

// const testReducer = (state = initialState,action) =>{
//   switch(action.type){
//     case INCREMENT_COUNTER:
//       return {...state,data:state.data+1} //increments our data
//     case DECREMENT_COUNTER:
//         return {...state,data:state.data-1} // decrement data use spread operator as state is immutable and cannot be directly changed
//     default:
//         return state;    
//   }
// }

export default createReducer(initialState,{
  [INCREMENT_COUNTER]:incrementCounter,
  [DECREMENT_COUNTER]:decrementCounter
});