import React from 'react';
import Menu from './Menu';
import { UserDataTypes } from 'src/modules/login/types';

type MainContainerPropsType = {
  user: UserDataTypes;
};

export default function MenuContainer({ user }: MainContainerPropsType) {
  const handleLogout = () => {
    window.localStorage.removeItem('lUser');
    window.location.href = '/';
  }

  return <Menu user={user} handleLogout={handleLogout} />;
}
