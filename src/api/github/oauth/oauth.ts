import axios, { AxiosRequestConfig } from 'axios';

export async function getUserToken(code: string) {
  // let config: AxiosRequestConfig = {
  //   method: 'post',
  //   url: '/login/oauth/access_token',
  //   params: {
  //     client_id: REACT_APP_CLIENT_ID,
  //     client_secret: REACT_APP_CLIENT_SECRET,
  //     code
  //   }
  // };

  // process.env.NODE_ENV === 'production' &&
  //   (config = { ...config, baseURL: 'https://github.com' });

  // const response = await axios({ ...config });

  const response = await fetch('/.netlify/functions/get-access-token');

  try {
    const result = await response.json();
    console.log(result)
    return result;
  } catch (e) {
    console.log('error-')
    console.error(e);
  }
}
