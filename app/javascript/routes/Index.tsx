import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Game from '../pages/Game';

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/game/:room_code" exact component={Game} />
    </Switch>
  </Router>
);
