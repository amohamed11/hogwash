import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cablecar from 'redux-cablecar';
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/index';

const persistConfig = {
  key: 'root',
  storage: storageSession
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, composeWithDevTools(
  applyMiddleware(thunk, cablecar)
));

store.dispatch({type: "CONNECT"});

export const persistor = persistStore(store);
export default store;
