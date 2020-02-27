import React, { useCallback, useEffect, useState } from 'react';
import Login from './Login';
import { useLocation, Redirect } from 'react-router-dom';
import queryParams from 'src/utils/queryParams';
import { getUserToken } from 'src/api/github/oauth';
import { useDispatch } from 'react-redux';
import { loginStart } from 'src/modules/login';
import { useSelector } from 'react-redux';
import { RootState } from 'src/modules';
import useFirebase from 'src/utils/hooks/useFirebase';
import useDatabase from 'src/utils/hooks/useDatabase';

export default function LoginContainer() {
  const location = useLocation();
  const code = queryParams(location.search, 'code');

  const { data } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [isLogin, setLogin] = useState<boolean>(false);

  const database = useDatabase();
  const [, userFirebaseUpdate] = useFirebase(database.ref('users'));

  const getUserTokenData = useCallback(
    async (code: string) => {
      const data = await getUserToken(code);
      try {
        const tokenData = queryParams(data, 'access_token');
        dispatch(loginStart(tokenData as string));
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (code) {
      // If a query exists, you get a token.
      getUserTokenData(code);
    } else {
      // Else back to '/'.
      window.location.href = '/';
    }
  }, [code, getUserTokenData]);

  useEffect(() => {
    if (data) {
      setLogin(true);
      userFirebaseUpdate({ [`user-${data.id}`]: data });
    }
  }, [data, userFirebaseUpdate]);

  return (
    <>
      <Login />
      {isLogin && <Redirect to="/talk" />}
    </>
  );
}
