import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

export type ChatDataTypes = {
  type: 'MINE' | 'OPPONENT';
  text: string;
  time: Date;
};

const dummyMine: ChatDataTypes = {
  type: 'MINE',
  text: 'HIHIHI',
  time: new Date()
};
const dummyOpponent: ChatDataTypes = {
  type: 'OPPONENT',
  text: 'OPP!!!',
  time: new Date()
};

export default function ChatScreen() {
  return (
    <ChatScreenCon>
      <Chat chatData={dummyMine} />
      <Chat chatData={dummyOpponent} />
    </ChatScreenCon>
  );
}

function Chat({ chatData }: { chatData: ChatDataTypes }) {
  const { type, text, time } = chatData;
  return (
    <SpeechBubble className={type === 'MINE' ? 'mine' : 'oppo'}>
      <div className="bubble">
        <span>{text}</span>
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
