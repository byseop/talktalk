import React, { useCallback, useEffect, useState } from 'react';
import Login from './Login';
import { useLocation, Redirect } from 'react-router-dom';
import qs from 'qs';
import { getUserToken } from 'src/api/github/oauth';
import { useDispatch } from 'react-redux';
import { loginStart } from 'src/modules/login';

export default function LoginContainer() {
  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  const dispatch = useDispatch();

  const [isLogin, setLogin] = useState<boolean>(false);

  const getUserTokenData = useCallback(
    async (code: string) => {
      const data = await getUserToken(code);
      try {
        const tokenData = qs.parse(data, { ignoreQueryPrefix: true });
        dispatch(loginStart(tokenData.access_token));
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (query.code) {
      // If a query exists, you get a token.
      getUserTokenData(query.code);
      setLogin(true);
    } else {
      // Else back to '/'.
      window.location.href = '/';
    }
  }, [query.code, getUserTokenData]);

  return (
    <>
      <Login />
      {isLogin && <Redirect to="/talk" />}
    </>
  );
}
