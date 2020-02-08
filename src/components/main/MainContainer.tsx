import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSpring } from 'react-spring';
import { easeExpOut } from 'd3-ease';
import { alreadyLogin } from 'src/modules/login';
import { RootState } from 'src/modules';
import Main from './Main';

export default function MainConatiner() {
  const dispatch = useDispatch();
  const login = useSelector((state: RootState) => state.user);
  const { data } = login;

  const [opacity, setOpacity] = useSpring(() => ({
    to: { opacity: 1 },
    config: {
      easing: easeExpOut,
      duration: 2000
    },
  }));

  useEffect(() => {
    // User information is already stored on the localStorage
    // Dispatch the data to reducer module.
    const localStorageUser = window.localStorage.getItem('lUser');
    if (localStorageUser) {
      dispatch(alreadyLogin(JSON.parse(localStorageUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    // When user login, run animation
    data && setOpacity({ to: { opacity: 0 }, delay: 1000 });
  }, [data, setOpacity]);

  return <Main loginSuccessStyle={opacity} />;
}
