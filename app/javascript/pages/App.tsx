import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from '../pages/Home';
import store from '../store/index';

interface IProps {
  cable: any;
}

export const App: React.FC<IProps> = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Home />{' '}
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
