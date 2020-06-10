import ChatScreen from './ChatScreen';
import React, { useEffect, useState, useCallback } from 'react';
import useDatabase from 'src/utils/hooks/useDatabase';
import { ChatDataTypes } from './ChatScreen';

export default function ChatScreenContainer({
  id,
  isControlMode,
  setIsControlMode
}: {
  id: string;
  isControlMode: boolean;
  setIsControlMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const db = useDatabase();
  const [chatData, setChatData] = useState();
  const [chatCount, setChatCount] = useState<number>(30);
  const [snapshotCount, setSnapshotCount] = useState<number>();
  const [observeTarget, setObserverTarget] = useState<HTMLElement>();

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
          (document.querySelectorAll('.chat_line') as NodeListOf<
            HTMLElement
          >).forEach((element: HTMLElement) => {
            if (element.getAttribute('data-chat-id') === firstData.chatId) {
              setObserverTarget((prevState) => {
                const screen = document.getElementById('screen');
                if (screen && prevState && screen.scrollTop === 0) {
                  screen.scrollTop = prevState.offsetTop;
                }
                return element;
              });
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
        const el = document.getElementById('screen');
        if (
          snapshotCount &&
          snapshotCount > 0 &&
          snapshotCount === chatCount &&
          el
        ) {
          more();
        }
      }
    },
    [more, snapshotCount, chatCount]
  );

  useEffect(() => {
    let screenObserver: IntersectionObserver;
    setTimeout(() => {
      screenObserver = new IntersectionObserver(onIntersect, {
        threshold: 1,
        root: document.getElementById('screen')
      });
      observeTarget && screenObserver.observe(observeTarget);
    }, 300);

    return () => screenObserver && screenObserver.disconnect();
  }, [observeTarget, onIntersect]);

  useEffect(() => {
    downloadChats();
    return () => offChats();
  }, [downloadChats, offChats]);

  useEffect(() => {
    // 채팅방 전환시 기존 채팅내역 제거
    setChatData(undefined);
    setSnapshotCount(0);
    setChatCount(30);
    setIsControlMode(false);
  }, [id, setIsControlMode]);

  return <ChatScreen chatData={chatData} isControlMode={isControlMode} />;
}
