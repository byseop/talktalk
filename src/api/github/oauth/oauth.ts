import axios, { AxiosRequestConfig } from 'axios';

const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

export async function getUserToken(code: string) {
  let config: AxiosRequestConfig = {
    url: '/.netlify/functions/get-access-token',
    params: {
      client_id: REACT_APP_CLIENT_ID,
      client_secret: REACT_APP_CLIENT_SECRET,
      code
    }
  };

  const response = await axios({ ...config });

  try {
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
