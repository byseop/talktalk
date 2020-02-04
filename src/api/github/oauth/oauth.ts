import axios, { AxiosRequestConfig } from 'axios';

export async function getUserToken(code: string) {
  const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;
  let config: AxiosRequestConfig = {
    method: 'post',
    url: '/login/oauth/access_token',
    params: {
      client_id: REACT_APP_CLIENT_ID,
      client_secret: REACT_APP_CLIENT_SECRET,
      code
    }
  };

  process.env.NODE_ENV === 'production' &&
    (config = { ...config, baseURL: 'https://github.com' });

  const response = await axios({ ...config });

  try {
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
