import React, { createContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import cablecar from 'redux-cablecar';

import Home from '../pages/Home';
import Game from '../pages/Game';
import store from '../store/index';
import { ActionCableContext } from "../services/CableContext";

const cable = cablecar.connect(store, 'GameChannel', {
  prefix: 'GAME'
});

export const App: React.FC = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
