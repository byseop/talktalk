import ChatScreen from './ChatScreen';
import React, { useEffect, useState, useCallback } from 'react';
import useDatabase from 'src/utils/hooks/useDatabase';

export default function ChatScreenContainer({ id }: { id: string }) {
  const db = useDatabase();
  const [chatData, setChatData] = useState();
  const [chatCount, setChatCount] = useState(30);

  const downloadChats = useCallback(() => {
    db.ref(`chats/chat${id}`)
      .limitToLast(chatCount)
      .on(
        'value',
        (snapshot) => {
          setChatData(snapshot.val());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }, [id, db, chatCount]);

  const offChats = useCallback(() => {
    db.ref(`chats/chat${id}`).off();
  }, [db, id]);

  const more = useCallback(() => {
    setChatCount((count) => {
      return count + 30;
    })
  }, []);

  useEffect(() => {
    offChats();
    downloadChats();

    return () => offChats();
  }, [downloadChats, offChats])

  return <ChatScreen chatData={chatData} more={more} />;
}
