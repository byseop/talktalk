import React, { useMemo } from 'react';
import ChatRoomList from './ChatRoomList';
import { SelectableMenu } from '../menu/types';
import useFirebase from 'src/utils/hooks/useFirebase';
import useDatabase from 'src/utils/hooks/useDatabase';
import { UserDataTypes } from 'src/modules/login/types';

type ChatRoomContainerProps = {
  selectedMenu: SelectableMenu;
};

export type ChatRoomTypes = {
  id: string;
  createDate: string;
  title: string;
  des: string;
  host: UserDataTypes;
};

export default function ChatRoomListContainer({
  selectedMenu
}: ChatRoomContainerProps) {
  const database = useDatabase();
  const [channels] = useFirebase(database.ref('channels') /*.limitToFirst(1)*/);

  const chatInProgress = useMemo<{
    channels: ChatRoomTypes[];
    directMessage: [];
  }>(() => {
    return {
      channels: channels.data ? Object.values(channels.data) : [],
      directMessage: [
        // TODO: Add direct message
      ]
    };
  }, [channels]);

  const loading = useMemo<boolean>(() => {
    if (!channels.loading /* && !dm loading */) return true;
    return false;
  }, [channels.loading]);

  return (
    <ChatRoomList selectedMenu={selectedMenu} chatInProgress={chatInProgress} loading={loading} />
  );
}
