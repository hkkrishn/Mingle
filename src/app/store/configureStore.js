import {createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';



export const configureStore = (preloadedState) => {
  const middlewares = [];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancer = [middlewareEnhancer];
  const composedEnhancer = composeWithDevTools(...storeEnhancer);
  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancer
  )

 //Hot relading mechanizm for redux (Live Updates) 
if(process.env.NODE_ENV !== 'production'){
  if(module.hot){
    module.hot.accept('../reducers/rootReducer.js',()=>{
      const newRootReducer = require('../reducers/rootReducer').default;
      store.replaceReducer(newRootReducer)
    })
  }
}

  return store;

}