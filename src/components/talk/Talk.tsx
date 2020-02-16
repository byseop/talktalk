import React from 'react';
import styled from 'styled-components';
import MenuContainer from './menu';
import { UserDataTypes } from 'src/modules/login/types';

const TalkWrap = styled.div`
  .side_menu {
    height: 100vh;
  }
`;

type TalkPropsType = {
  user: UserDataTypes;
};

export default function Talk({ user }: TalkPropsType) {
  return (
    <TalkWrap>
      <div className="side_menu">
        <MenuContainer user={user} />
      </div>
    </TalkWrap>
  );
}
