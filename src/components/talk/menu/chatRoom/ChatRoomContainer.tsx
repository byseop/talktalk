import React from 'react';
import ChatRoom from './ChatRoom';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { SelectableMenu } from '../types';

type ChatRoomContainerProps = {
  selectedMenu: SelectableMenu;
};

export default function ChatRoomContainer({
  selectedMenu
}: ChatRoomContainerProps) {
  return <ChatRoom selectedMenu={selectedMenu} />;
}
