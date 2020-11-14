import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home';

interface IProps {
  cable: any
}

export const App: React.FC<IProps> = (props) =>  {
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
