import React, { useCallback, useEffect } from 'react';
import Login from './Login';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { getUserToken } from 'api/github/oauth';
import { useDispatch } from 'react-redux';
import { loginStart } from 'modules/login';

export default function LoginContainer() {
  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  const dispatch = useDispatch();

  const getUserTokenData = useCallback(async (code: string) => {
    const data = await getUserToken(code);
    try {
      const tokenData = qs.parse(data, { ignoreQueryPrefix: true });
      dispatch(loginStart(tokenData.access_token));
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  useEffect(() => {
    getUserTokenData(query.code);
  }, [query.code, getUserTokenData]);

  return <Login />;
}
