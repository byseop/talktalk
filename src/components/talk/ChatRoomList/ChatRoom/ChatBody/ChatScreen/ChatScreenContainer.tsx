import ChatScreen from './ChatScreen';
import React, { useEffect, useState, useCallback } from 'react';
import useDatabase from 'src/utils/hooks/useDatabase';

export default function ChatScreenContainer({ id }: { id: string }) {
  const db = useDatabase();
  const [chatData, setChatData] = useState();
  const [chatCount, setChatCount] = useState<number>(30);
  const [isShowMore, setShowMore] = useState<boolean>(false);

  const downloadChats = useCallback(() => {
    db.ref(`chats/chat${id}`)
      .limitToLast(chatCount)
      .on(
        'value',
        (snapshot) => {
          setChatData(snapshot.val());
          if (chatCount === snapshot.numChildren()) {
            setShowMore(true);
          } else setShowMore(false);
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
    });
  }, []);

  useEffect(() => {
    downloadChats();

    return () => offChats();
  }, [downloadChats, offChats]);

  return <ChatScreen chatData={chatData} more={more} isShowMore={isShowMore} />;
}
