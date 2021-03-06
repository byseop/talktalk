import React, { useMemo, memo, useEffect } from 'react';
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

export default function ChatScreen({
  chatData,
  isControlMode,
}: {
  chatData: any;
  isControlMode: boolean;
}) {
  const data: ChatDataTypes[] | undefined =
    chatData && ((Object.values(chatData) as unknown) as ChatDataTypes[]);
  const { user } = useSelector((state: RootState) => state);
  const userId = useMemo<number | undefined>(() => {
    return user.data?.id;
  }, [user]);

  useEffect(() => {
    const el = document.getElementById('screen');
    if (el && !isControlMode) {
      el.scrollTop = el.scrollHeight;
    }
  }, [chatData, isControlMode]);

  return (
    <ChatScreenCon>
      {userId &&
        data?.map((chat) => (
          <Chat chatData={chat} key={chat.chatId} userId={userId} />
        ))}
    </ChatScreenCon>
  );
}

const Chat = memo(
  ({ chatData, userId }: { chatData: ChatDataTypes; userId: number }) => {
    const { message, time, userInfo } = chatData;
    return (
      <SpeechBubble
        className={`chat_line ${userId === userInfo.id ? 'mine' : 'oppo'}`}
        data-chat-id={chatData.chatId}
      >
        <div className="profile">
          <div className="avartar">
            <img src={userInfo.avartar} alt={userInfo.name} />
          </div>
          <span className="name">{userInfo.name}</span>
        </div>
        <div className="bubble">
          <span>{message}</span>
          <div className="time">{moment(time).format('M월 D일 HH시 mm분')}</div>
        </div>
      </SpeechBubble>
    );
  }
);

const ChatScreenCon = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;

  .more {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: #96f2d7;
    border-radius: 0.4rem;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.12);
    padding: 0.24rem 1.2rem;
    color: #333;
    border: none;
    cursor: pointer;
  }
`;

const SpeechBubble = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  &.mine {
    align-items: flex-end;
    .bubble {
      background: #fff;
      .time {
        left: auto;
        right: 100%;
        margin-right: 0.5rem;
      }
    }
    .profile {
      .name {
        order: -1;
      }
    }

    & + .mine {
      .profile {
        display: none;
      }
    }
  }
  &.oppo {
    & + .oppo {
      .profile {
        display: none;
      }
    }
  }
  .bubble {
    max-width: 40%;
    font-size: 1rem;
    border-radius: 0.4rem;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.12);
    padding: 0.7rem;
    margin: 0 1rem;
    background: #96f2d7;
    position: relative;
    word-break: break-all;

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

  .profile {
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
    .avartar {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .name {
      font-size: 1rem;
      margin: 0 1rem;
    }
  }
`;
