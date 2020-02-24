import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ChatRoom from 'src/components/talk/menu/chatRoom';

export default function MenuRoutes() {
  return (
    <Switch>
      <Route path="/talk/chatroom" exact component={ChatRoom} />
    </Switch>
  )
}