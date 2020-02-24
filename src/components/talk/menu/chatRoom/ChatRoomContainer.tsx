import React from 'react';
import ChatRoom from './ChatRoom';
import * as firebase from 'firebase/app';
import 'firebase/database';

export default function ChatRoomContainer() {
  const database = firebase.database();
  console.log(database);
  return <ChatRoom />;
}
