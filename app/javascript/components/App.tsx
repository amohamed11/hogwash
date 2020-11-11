import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home';

export const App = (props) => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/"><Home cable={props.cable}/> </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
