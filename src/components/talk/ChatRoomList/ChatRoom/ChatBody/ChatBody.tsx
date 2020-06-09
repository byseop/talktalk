import React, { useRef } from 'react';
import styled from 'styled-components';
import ChatInputContainer from './ChatInput';
import ChatSceenContainer from './ChatScreen';

export type ChatBodyPropsTypes = {
  id: string;
};

export default function ChatBody({ id }: ChatBodyPropsTypes) {
  const screenRef = useRef<HTMLDivElement>(null);
  return (
    <ChatBodyWrap>
      <div className="chat_screen" id="screen" ref={screenRef}>
        <ChatSceenContainer id={id} />
      </div>
      <div className="input_wrap">
        <ChatInputContainer id={id} />
      </div>
    </ChatBodyWrap>
  );
}

const ChatBodyWrap = styled.div`
  display: flex;
  flex-flow: column wrap;
  height: 100%;
  padding-bottom: 2rem;
  box-sizing: border-box;

  .chat_screen {
    flex: 1;
    overflow: auto;
    padding: 0 2rem 2rem;
  }

  .input_wrap {
    height: 6rem;
    display: flex;
    padding: 0 2rem;

    textarea {
      display: flex;
      flex: 1;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 1rem;
      resize: none;
      border: 1px solid #ccc;
    }

    button {
      display: flex;
      width: 100px;
      height: 100%;
      margin-left: 20px;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      font-weight: 500;
      background: #12b886;
      color: #fff;
      padding: 0;
      border: 1px solid #ccc;
    }
  }
`;
