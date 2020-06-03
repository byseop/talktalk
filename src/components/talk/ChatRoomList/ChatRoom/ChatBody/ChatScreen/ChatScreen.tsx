import React, { useMemo } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from 'src/modules';

export type ChatDataTypes = {
  message: string;
  time: Date;
  userInfo: {
    id: number;
    name: string;
    avartar: string;
  };
  chatId: string;
};

export default function ChatScreen({ chatData }: { chatData: any }) {
  const data: ChatDataTypes[] | undefined =
    chatData && ((Object.values(chatData) as unknown) as ChatDataTypes[]);
  const { user } = useSelector((state: RootState) => state);
  const userId = useMemo<number | undefined>(() => {
    return user.data?.id;
  }, [user]);
  return (
    <ChatScreenCon>
      {userId && data?.map((chat) => (
        <Chat chatData={chat} key={chat.chatId} userId={userId} />
      ))}
    </ChatScreenCon>
  );
}

function Chat({
  chatData,
  userId
}: {
  chatData: ChatDataTypes;
  userId: number;
}) {
  const { message, time, userInfo } = chatData;
  return (
    <SpeechBubble className={userId === userInfo.id ? 'mine' : 'oppo'}>
      <div className="bubble">
        <span>{message}</span>
        <div className="time">{moment(time).format('M월 D일 HH시 MM분')}</div>
      </div>
    </SpeechBubble>
  );
}

const ChatScreenCon = styled.div`
  display: flex;
  flex-flow: column;
`;

const SpeechBubble = styled.div`
  display: flex;
  &.mine {
    justify-content: flex-end;
    .bubble {
      background: #fff;
      .time {
        left: auto;
        right: 100%;
        margin-right: 0.5rem;
      }
    }
  }
  .bubble {
    max-width: 40%;
    font-size: 1rem;
    border-radius: 0.4rem;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.12);
    padding: 0.5rem;
    background: #96f2d7;
    position: relative;

    .time {
      position: absolute;
      left: 100%;
      bottom: 0;
      font-size: 0.25rem;
      color: #888;
      white-space: nowrap;
      margin-left: 0.5rem;
    }
  }
  & + & {
    margin-top: 1rem;
  }
`;
