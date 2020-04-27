import React from 'react';
import styled from 'styled-components';
import palette from 'src/styles/palette';

export type ChatRoomPropsTypes = {
  handleCloseChatroom: () => void;
};

export default function ChatRoom({
  handleCloseChatroom
}: ChatRoomPropsTypes) {
  return <ChatRoomWrap></ChatRoomWrap>;
}

const ChatRoomWrap = styled.div`
  position: absolute;
  height: 100%;
  width: calc(100% - 700px);
  right: 0;
  top: 0;
  background: ${palette.teal.tertiray};
`;
