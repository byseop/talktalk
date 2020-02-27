import React, { useEffect } from 'react';
import ChatRoom from './ChatRoom';
import { SelectableMenu } from '../types';
import useFirebase from 'src/utils/hooks/useFirebase';
import useDatabase from 'src/utils/hooks/useDatabase';

type ChatRoomContainerProps = {
  selectedMenu: SelectableMenu;
};


export default function ChatRoomContainer({
  selectedMenu
}: ChatRoomContainerProps) {
  const database = useDatabase();
  const [snapshot] = useFirebase(database.ref('users').limitToFirst(1));
  useEffect(() => {
    console.log(snapshot);
  }, [snapshot])
  return <ChatRoom selectedMenu={selectedMenu} />;
}
