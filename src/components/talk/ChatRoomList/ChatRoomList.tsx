import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { animated, useTransition } from 'react-spring';
import { SelectableMenu } from '../menu/types';
import { easeExpOut } from 'd3-ease';
import {
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
  IconButton,
  IIconProps,
} from '@fluentui/react';

const CHATROOM_SELECTION_OPTION: IDropdownOption[] = [
  {
    key: 'CHANNEL',
    text: '채널',
  },
  {
    key: 'DIRECT-MESSAGE',
    text: '다이렉트 메세지',
  },
];

const dropdownStyles: Partial<IDropdownStyles> = {
  root: {
    flex: 1,
    marginRight: 15,
  },
  dropdown: {
    padding: '1rem 0',
    boxSizing: 'border-box',
  },
  title: {
    background: 'transparent',
    border: 'none',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#555',
  },
  caretDownWrapper: {
    top: '50%',
    transform: 'translateY(-50%)',
  },
};

const plusIcon: IIconProps = {
  iconName: 'Add',
  styles: {
    root: {
      color: '#555',
    },
  },
};

type ChatRoomPropsTypes = {
  selectedMenu: SelectableMenu;
};

type selectedChatType = 'CHANNEL' | 'DIRECT-MESSAGE';

export default function ChatRoomList({ selectedMenu }: ChatRoomPropsTypes) {
  const [selectedType, setSelectedType] = useState<selectedChatType>('CHANNEL');
  const chatRoomTransition = useTransition(selectedMenu === 'chatroom', null, {
    from: {
      transform: 'translateX(-100%)',
    },
    enter: {
      transform: 'translateX(0)',
    },
    leave: {
      transform: 'translateX(-100%)',
    },
    config: {
      easing: easeExpOut,
      duration: 1000,
    },
  });

  const handleTypeChange = useCallback(
    (
      _event: React.FormEvent<HTMLDivElement>,
      item: IDropdownOption | undefined
    ) => {
      item && item.key && setSelectedType(item.key as selectedChatType);
    },
    []
  );

  return (
    <>
      {chatRoomTransition.map(({ item, key, props }) =>
        item ? (
          <ChatRoomWrap key={key} style={props}>
            <div className="room_title">
              <Dropdown
                options={CHATROOM_SELECTION_OPTION}
                defaultSelectedKey={selectedType}
                styles={dropdownStyles}
                onChange={handleTypeChange}
              />
              <IconButton iconProps={plusIcon} />
            </div>
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
  padding: 1rem;
  box-sizing: border-box;

  .room_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
