import React, { useCallback } from 'react';
import ChatRoom from './ChatRoom';
import { useDispatch, useSelector } from 'react-redux';
import { chatClose } from 'src/modules/chatroom';
import { RootState } from 'src/modules';

export default function ChatRoomContainer() {
  const dispatch = useDispatch();
  const { chat } = useSelector((state: RootState) => state);

  const handleCloseChatroom = useCallback(() => {
    dispatch(chatClose());
  }, [dispatch]);

  return (
    <ChatRoom
      handleCloseChatroom={handleCloseChatroom}
      data={chat.data}
    />
  );
}
