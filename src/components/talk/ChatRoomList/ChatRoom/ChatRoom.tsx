import React from 'react';
import styled from 'styled-components';
import palette from 'src/styles/palette';

export default function ChatRoom() {
  return (
    <ChatRoomWrap />
  );
}

const ChatRoomWrap = styled.div`
  position: absolute;
  height: 100%;
  width: calc(100% - 700px);
  right: 0;
  top: 0;
  background: ${palette.teal.tertiray};
`