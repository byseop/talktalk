import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import MainConatiner from './routes/main';
import LoginContainer from './routes/login';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={MainConatiner} />
        <Route path="/login" component={LoginContainer} />
      </Switch>
    </div>
  )
};

export default App;
