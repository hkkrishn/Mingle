 import {combineReducers} from 'redux';
 import testReducer from '../../features/testarea/testReducer';
 import eventReducer from '../../features/events/EventReducer';
 import {reducer as FormReducer  } from 'redux-form'
 import modalReducer from '../../features/modals/modalReducer';
 import authReducer from '../../features/auth/authReducer';
 // root reducer combines multiple reducers together and passes them onto the store.

 const rootReducer = combineReducers({
   form:FormReducer,
   test:testReducer,
   events:eventReducer,
   modals:modalReducer,
   auth:authReducer
 })

 export default rootReducer