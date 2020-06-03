import React, { useCallback } from 'react';
import ChatInput from './ChatInput';
import useDatabase from 'src/utils/hooks/useDatabase';
import { useSelector } from 'react-redux';
import { RootState } from 'src/modules';

export default function ChatInputContainer({ id }: { id: string }) {
  const { data } = useSelector((state: RootState) => state.user);
  const database = useDatabase();

  const pushMessage = useCallback(
    (value: string) => {
      if (!data || !value) return;
      const newKey = database.ref(`chats/chat-${id}`).push().key;
      database.ref(`chats/chat${id}/${newKey}`).update({
        userInfo: {
          id: data.id,
          name: data.name,
          avartar: data.avatar_url
        },
        message: value,
        time: new Date(),
        chatId: newKey
      }, (error) => {
        console.error(error);
      });
    },
    [database, data, id]
  );
  return <ChatInput pushMessage={pushMessage} />;
}
