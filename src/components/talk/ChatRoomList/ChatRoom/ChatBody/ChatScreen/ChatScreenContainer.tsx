import ChatScreen from './ChatScreen';
import React, { useEffect, useState } from 'react';
import useDatabase from 'src/utils/hooks/useDatabase';

export default function ChatScreenContainer({ id }: { id: string }) {
  const db = useDatabase();
  const [chatData, setChatData] = useState();

  useEffect(() => {
    db.ref(`chats/chat${id}`).on('value', snapshot => {
      setChatData(snapshot.val());
    }, (error: any) => {
      console.log(error);
    });

    return () => {
      db.ref(`chats/chat${id}`).off();
    }
  }, [id, db]);

  return <ChatScreen chatData={chatData} />;
}
