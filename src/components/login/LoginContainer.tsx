import React, { useCallback, useEffect, useState } from 'react';
import Login from './Login';
import { useLocation, Redirect } from 'react-router-dom';
import queryParams from 'src/utils/queryParams';
import { getUserToken } from 'src/api/github/oauth';
import { useDispatch } from 'react-redux';
import { loginStart } from 'src/modules/login';
import { useSelector } from 'react-redux';
import { RootState } from 'src/modules';

export default function LoginContainer() {
  const location = useLocation();
  const code = queryParams(location.search, 'code');

  const { data } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [isLogin, setLogin] = useState<boolean>(false);

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
    data && setLogin(true);
  }, [data]);

  return (
    <>
      <Login />
      {isLogin && <Redirect to="/talk" />}
    </>
  );
}
