import React, { createContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from '../pages/Home';
import store from '../store/index';
import { ActionCableContext } from "../services/CableContext";

// import consumer from "../channels/consumer";
// import "../channels/index";

// const cable = consumer.subscriptions.subscriptions[0];
const cable = "NANI";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ActionCableContext.Provider value={cable}>
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <Home />{' '}
            </Route>
          </Switch>
        </BrowserRouter>
      </ActionCableContext.Provider>
    </Provider>
  );
};

export default App;
