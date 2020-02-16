import React, { useEffect } from 'react';
import Talk from './Talk';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/modules';
import { alreadyLogin } from 'src/modules/login';

export default function TalkContainer() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { data } = user;

  useEffect(() => {
    // User information is already stored on the localStorage
    // Dispatch the data to reducer module.
    const localStorageUser = window.localStorage.getItem('lUser');
    if (localStorageUser) {
      dispatch(alreadyLogin(JSON.parse(localStorageUser)));
    }
  }, [dispatch]);

  if (data) {
    return <Talk user={data} />;
  }
  return null;
}
