import React, { useState, useCallback, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { animated, useTransition } from 'react-spring';
import { SelectableMenu } from '../menu/types';
import {
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
  IconButton,
  IIconProps
} from '@fluentui/react';
import CreateChatRoomContainer from './CreateChatRoom';
import animation from 'src/styles/animation';

const CHATROOM_SELECTION_OPTION: IDropdownOption[] = [
  {
    key: 'CHANNEL',
    text: '채널'
  },
  {
    key: 'DIRECT-MESSAGE',
    text: '다이렉트 메세지'
  }
];

const dropdownStyles: Partial<IDropdownStyles> = {
  root: {
    flex: 1,
    marginRight: 15
  },
  dropdown: {
    padding: '1rem 0',
    boxSizing: 'border-box'
  },
  title: {
    background: 'transparent',
    border: 'none',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#555'
  },
  caretDownWrapper: {
    top: '50%',
    transform: 'translateY(-50%)'
  }
};

const plusIcon: IIconProps = {
  iconName: 'Add',
  styles: {
    root: {
      color: '#555'
    }
  }
};

const { panel } = animation;

type ChatRoomPropsTypes = {
  selectedMenu: SelectableMenu;
};

export type SelectedChatType = 'CHANNEL' | 'DIRECT-MESSAGE';
type SelectedPanel = 'CREATE_PANEL' | 'CHAT_PANEL';

export default function ChatRoomList({ selectedMenu }: ChatRoomPropsTypes) {
  const [selectedType, setSelectedType] = useState<SelectedChatType>('CHANNEL');
  const [selectedPanel, setSelectedPanel] = useState<
    SelectedPanel | undefined
  >();

  const isSelectedMenuChatRoom = useMemo(() => {
    if (selectedMenu === 'chatroom') return true;
    return false;
  }, [selectedMenu]);

  const chatRoomTransition = useTransition(isSelectedMenuChatRoom, null, panel);

  // const createPanelTransition = useTransition(
  //   isSelectedMenuChatRoom && selectedPanel === 'CREATE_PANEL',
  //   null,
  //   panel
  // );

  const handleTypeChange = useCallback(
    (
      _event: React.FormEvent<HTMLDivElement>,
      item: IDropdownOption | undefined
    ) => {
      item && item.key && setSelectedType(item.key as SelectedChatType);
    },
    []
  );

  useEffect(() => {
    !isSelectedMenuChatRoom && setSelectedPanel(undefined);
  }, [isSelectedMenuChatRoom]);

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
              <IconButton
                iconProps={plusIcon}
                onClick={() => setSelectedPanel('CREATE_PANEL')}
              />
            </div>
          </ChatRoomWrap>
        ) : null
      )}
      {isSelectedMenuChatRoom && selectedPanel === 'CREATE_PANEL' && (
        <CreatorWrap>
          <CreateChatRoomContainer />
        </CreatorWrap>
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
  z-index: 1;

  .room_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const CreatorWrap = styled(animated.div)`
  position: absolute;
  height: 100%;
  width: calc(100vw - 700px);
  left: 700px;
  top: 0;
  /* z-index: 20; */
`;
