import React, { memo, useCallback } from 'react';
import ChatRoomListRow from './ChatRoomListRow';
import { ChatRoomTypes } from '../ChatRoomListContainer';
import { useDispatch } from 'react-redux';
import { chatOpen } from 'src/modules/chatroom';

export type ChatRoomListRowContainerPropsType = {
  data: ChatRoomTypes;
};

const ChatRoomListRowContainer = memo(
  ({ data }: ChatRoomListRowContainerPropsType) => {
    const dispatch = useDispatch();
    
    const open = useCallback(() => {
      dispatch(chatOpen(data));
    }, [data, dispatch]);

    return <ChatRoomListRow data={data} open={open} />;
  }
);

export default ChatRoomListRowContainer;
