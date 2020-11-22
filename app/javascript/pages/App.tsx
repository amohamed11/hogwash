import React, { createContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import cablecar from 'redux-cablecar';
import { PersistGate } from 'redux-persist/integration/react';

import Home from '../pages/Home';
import Game from '../pages/Game';
import Loading from '../components/Loading';
import store, { persistor } from '../store/index';
import { ActionCableContext } from '../services/CableContext';

const cable = cablecar.connect(store, 'GameChannel', {
  prefix: 'GAME',
});

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <ActionCableContext.Provider value={cable}>
          <BrowserRouter>
            <Switch>
              <Redirect from="/home" to="/" />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/game/:id">
                <Game />
              </Route>
            </Switch>
          </BrowserRouter>
        </ActionCableContext.Provider>
      </PersistGate>
    </Provider>
  );
};

export default App;
