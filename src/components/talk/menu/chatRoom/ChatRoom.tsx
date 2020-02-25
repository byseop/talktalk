import React from 'react';
import styled from 'styled-components';
import { animated, useTransition } from 'react-spring';
import { SelectableMenu } from '../types';
import { easeExpOut } from 'd3-ease';

type ChatRoomPropsTypes = {
  selectedMenu: SelectableMenu;
};

export default function ChatRoom({ selectedMenu }: ChatRoomPropsTypes) {
  const chatRoomTransition = useTransition(selectedMenu === 'chatroom', null, {
    from: {
      transform: 'translateX(-100%)'
    },
    enter: {
      transform: 'translateX(0)'
    },
    leave: {
      transform: 'translateX(-100%)'
    },
    config: {
      easing: easeExpOut,
      duration: 1000
    }
  });

  console.log(selectedMenu);
  return (
    <>
      {chatRoomTransition.map(({ item, key, props }) =>
        item ? (
          <ChatRoomWrap key={key} style={props}>
            adf
          </ChatRoomWrap>
        ) : null
      )}
    </>
  );
}

const ChatRoomWrap = styled(animated.div)`
  position: absolute;
  left: 300px;
  top: 0;
  height: 100%;
  width: 400px;
  background: #96f2d7;
`;
