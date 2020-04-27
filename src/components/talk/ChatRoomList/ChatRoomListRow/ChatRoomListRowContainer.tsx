import React, { memo } from 'react';
import ChatRoomListRow from './ChatRoomListRow';
import { ChatRoomTypes } from '../ChatRoomListContainer';

export type ChatRoomListRowContainerPropsType = {
  data: ChatRoomTypes;
  handleJoinChat: () => void;
};

const ChatRoomListRowContainer = memo(
  ({ data, handleJoinChat }: ChatRoomListRowContainerPropsType) => {
    return <ChatRoomListRow data={data} handleJoinChat={handleJoinChat} />;
  }
);

export default ChatRoomListRowContainer;
