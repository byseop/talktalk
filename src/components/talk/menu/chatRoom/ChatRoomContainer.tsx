import React, { useEffect } from 'react';
import ChatRoom from './ChatRoom';
import { SelectableMenu } from '../types';
import useFirebase from 'src/utils/hooks/useFirebase';

type ChatRoomContainerProps = {
  selectedMenu: SelectableMenu;
};


export default function ChatRoomContainer({
  selectedMenu
}: ChatRoomContainerProps) {
  const [snapshot] = useFirebase();
  useEffect(() => {
    console.log(snapshot);
  }, [snapshot])
  return <ChatRoom selectedMenu={selectedMenu} />;
}
