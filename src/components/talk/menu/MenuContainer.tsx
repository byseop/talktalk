import React, { useEffect } from 'react';
import Menu from './Menu';
import { UserDataTypes } from 'src/modules/login/types';
import { useSpring } from 'react-spring';
import { easeExpOut } from 'd3-ease';

type MainContainerPropsType = {
  user: UserDataTypes;
};

export default function MenuContainer({ user }: MainContainerPropsType) {
  console.log(user);
  const [menuSpring, setMenuSpring] = useSpring(() => ({
    transform: 'translateX(-100%)',
    config: {
      easing: easeExpOut,
      duration: 1000
    }
  }));

  useEffect(() => {
    setMenuSpring({
      transform: 'translateX(0)'
    });
  }, [setMenuSpring]);

  return <Menu user={user} menuSpring={menuSpring} />;
}
