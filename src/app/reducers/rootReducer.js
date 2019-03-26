 import {combineReducers} from 'redux';
 import testReducer from '../../features/testarea/testReducer';
 // root reducer combines multiple reducers together and passes them onto the store.

 const rootReducer = combineReducers({
   test:testReducer,

 })

 export default rootReducer