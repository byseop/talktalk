import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainConatiner from '../main';
import LoginContainer from '../login';

export default function RoutesComponent() {
  return (
    <Switch>
      <Route path="/" exact component={MainConatiner} />
      <Route path="/login" component={LoginContainer} />
    </Switch>
  );
}
