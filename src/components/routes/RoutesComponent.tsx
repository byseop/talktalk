import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainConatiner from '../main';
import LoginContainer from '../login';
import TalkContainer from '../talk';

export default function RoutesComponent() {
  return (
    <Switch>
      <Route path="/" exact component={MainConatiner} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/talk" component={TalkContainer} />
    </Switch>
  );
}
