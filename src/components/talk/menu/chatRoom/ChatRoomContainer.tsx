import React, { useEffect } from 'react';
import ChatRoom from './ChatRoom';
import { SelectableMenu } from '../types';
import useDatabase from 'src/utils/hooks/useDatabase';

type ChatRoomContainerProps = {
  selectedMenu: SelectableMenu;
};

export default function ChatRoomContainer({
  selectedMenu
}: ChatRoomContainerProps) {
  const database = useDatabase();
  return <ChatRoom selectedMenu={selectedMenu} />;
}
