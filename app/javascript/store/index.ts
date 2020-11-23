import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cablecar from 'redux-cablecar';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/index';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk, cablecar)
));

store.dispatch({type: "CONNECT"});

export default store;
