import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSpring } from 'react-spring';
import { easeExpOut } from 'd3-ease';
import { Redirect } from 'react-router-dom';
import { alreadyLogin } from 'src/modules/login';
import { RootState } from 'src/modules';
import Main from './Main';

export default function MainConatiner() {
  const dispatch = useDispatch();
  const login = useSelector((state: RootState) => state.user);
  const { data } = login;
  const [isLogin, setLogin] = useState<boolean>(false);

  const [opacity, setOpacity] = useSpring(() => ({
    opacity: 1,
    config: {
      easing: easeExpOut,
      duration: 2000
    }
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
    if (data) {
      setOpacity({
        opacity: 0,
        from: { opacity: 1 },
        delay: 1000,
        onRest: () => {
          data && setLogin(true);
        }
      });
    }
  }, [data, setOpacity]);

  return (
    <>
      <Main loginSuccessStyle={opacity} />
      {isLogin && <Redirect to="/talk" />}
    </>
  );
}
