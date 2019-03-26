 import {combineReducers} from 'redux';
 import testReducer from '../../features/testarea/testReducer';
 import eventReducer from '../../features/events/EventReducer';
 // root reducer combines multiple reducers together and passes them onto the store.

 const rootReducer = combineReducers({
   test:testReducer,
   events:eventReducer
 })

 export default rootReducer