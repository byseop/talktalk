import React from 'react';
import Menu from './Menu';
import { UserDataTypes } from 'src/modules/login/types';

type MainContainerPropsType = {
  user: UserDataTypes;
};

export default function MenuContainer({ user }: MainContainerPropsType) {
  return <Menu user={user} />;
}
