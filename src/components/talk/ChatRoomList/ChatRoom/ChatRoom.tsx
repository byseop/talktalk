import React from 'react';
import styled from 'styled-components';
import palette from 'src/styles/palette';
import { ChatroomDataTypes } from 'src/components/talk/ChatRoomList';
import ChatBodyContainer from './ChatBody';

export type ChatRoomPropsTypes = {
  handleCloseChatroom: () => void;
  data: ChatroomDataTypes | null;
};

export default function ChatRoom({
  handleCloseChatroom,
  data
}: ChatRoomPropsTypes) {
  if (!data) return null;
  const { title, id } = data;
  return (
    <ChatRoomWrap>
      <div className="top_bar">
        <div className="btn_back">
          <button type="button" onClick={handleCloseChatroom}>
            <i className="fas fa-arrow-left" />
          </button>
        </div>
        <h2>{title}</h2>
      </div>
      <div className="chat_body">
        <ChatBodyContainer id={id} />
      </div>
    </ChatRoomWrap>
  );
}

const ChatRoomWrap = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: calc(100% - 700px);
  right: 0;
  top: 0;
  background: ${palette.teal.tertiray};
  
  .top_bar {
    padding: 2rem;
    height: 4rem;
    position: relative;

    h2 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 2rem;
      color: #555;
      margin: 0;
    }

    .btn_back {
      position: absolute;
      right: 2rem;
      top: 50%;
      transform: translateY(-50%);

      button {
        display: flex;
        width: 2rem;
        height: 2rem;
        justify-content: center;
        align-items: center;
        background: none;
        cursor: pointer;
        border: none;
        border-radius: 4px;

        &:hover {
          background: ${palette.teal.secondary};
        }
      }
    }
  }

  .chat_body {
    flex: 1;
    max-height: calc(100% - 8rem);
  }
`;
