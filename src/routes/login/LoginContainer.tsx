import React, { useCallback, useEffect } from 'react';
import Login from './Login';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { getUserToken } from 'api/github/oauth';

export default function LoginContainer() {
  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  const loginUser = useCallback(async code => {
    const data = await getUserToken(code);
    try {
      console.log(qs.parse(data, { ignoreQueryPrefix: true }));
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    loginUser(query.code);
  }, [query.code, loginUser]);

  return <Login />;
}
