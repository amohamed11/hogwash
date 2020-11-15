import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';
import websockets from './middleware/websocket';

const store = createStore(rootReducer, applyMiddleware(thunk, websockets));

store.dispatch({type: "CONNECT"});

export default store;
