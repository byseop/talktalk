import React, { memo } from 'react';
import ChatRoomListRow from './ChatRoomListRow';
import { ChatRoomTypes } from '../ChatRoomListContainer';

const ChatRoomListRowContainer = memo(({ data }: { data: ChatRoomTypes }) => {
  return <ChatRoomListRow data={data} />;
});

export default ChatRoomListRowContainer;
