import React, { useCallback } from 'react';
import ChatRoom from './ChatRoom';
import { useDispatch } from 'react-redux';
import { chatClose } from 'src/modules/chatroom';

export default function ChatRoomContainer() {
  const dispatch = useDispatch();

  const handleCloseChatroom = useCallback(() => {
    dispatch(chatClose());
  }, [dispatch]);

  return (
    <ChatRoom
      handleCloseChatroom={handleCloseChatroom}
    />
  );
}
