import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { alreadyLogin } from 'src/modules/login';
import Main from './Main';

export default function MainConatiner() {
  const dispatch = useDispatch();

  useEffect(() => {
    // User information is already stored on the localStorage
    // Dispatch the data to reducer module.
    const localStorageUser = window.localStorage.getItem('lUser');
    localStorageUser && dispatch(alreadyLogin(JSON.parse(localStorageUser)));
  }, [dispatch]);

  return <Main />;
}
