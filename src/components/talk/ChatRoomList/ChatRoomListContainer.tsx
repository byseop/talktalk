import React, { useEffect } from 'react';
import ChatRoomList from './ChatRoomList';
import { SelectableMenu } from '../menu/types';
import useFirebase from 'src/utils/hooks/useFirebase';
import useDatabase from 'src/utils/hooks/useDatabase';

type ChatRoomContainerProps = {
  selectedMenu: SelectableMenu;
};


export default function ChatRoomListContainer({
  selectedMenu
}: ChatRoomContainerProps) {
  const database = useDatabase();
  const [snapshot] = useFirebase(database.ref('users').limitToFirst(1));
  useEffect(() => {
    console.log(snapshot);
  }, [snapshot])
  return <ChatRoomList selectedMenu={selectedMenu} />;
}
