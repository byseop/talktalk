import ChatScreen from './ChatScreen';
import React, { useEffect, useState, useCallback } from 'react';
import useDatabase from 'src/utils/hooks/useDatabase';
import { ChatDataTypes } from './ChatScreen';

export default function ChatScreenContainer({ id }: { id: string }) {
  const db = useDatabase();
  const [chatData, setChatData] = useState();
  const [chatCount, setChatCount] = useState<number>(30);
  const [snapshotCount, setSnapshotCount] = useState<number>();
  const [observeTarget, setObserverTarget] = useState<Element>();

  const downloadChats = useCallback(() => {
    db.ref(`chats/chat${id}`)
      .limitToLast(chatCount)
      .on(
        'value',
        (snapshot) => {
          setChatData(snapshot.val());
          const firstData =
            snapshot.val() &&
            (Object.values(snapshot.val())[0] as ChatDataTypes);
          document.querySelectorAll('.chat_line').forEach((element) => {
            if (element.getAttribute('data-chat-id') === firstData.chatId) {
              setObserverTarget(element);
            }
          });
          setSnapshotCount(snapshot.numChildren());
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

  const onIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        if (snapshotCount && snapshotCount > 0 && snapshotCount === chatCount)
          more();
      }
    },
    [more, snapshotCount, chatCount]
  );

  useEffect(() => {
    const screenObserver = new IntersectionObserver(onIntersect, {
      threshold: 1,
      root: document.getElementById('screen')
    });
    observeTarget && screenObserver.observe(observeTarget);

    return () => screenObserver && screenObserver.disconnect();
  }, [observeTarget, onIntersect]);

  useEffect(() => {
    downloadChats();
    return () => offChats();
  }, [downloadChats, offChats]);

  useEffect(() => {
    // 채팅방 전환시 기존 채팅내역 제거
    setChatData(undefined);
  }, [id]);

  return <ChatScreen chatData={chatData} />;
}
