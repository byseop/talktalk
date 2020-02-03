import axios from 'axios';

export async function getUserToken(code: string) {
  const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;
    const response = await axios({
      method: 'post',
      url: '/login/oauth/access_token',
      params: {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: REACT_APP_CLIENT_SECRET,
        code
      },
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      }
    });

    try {
      return response.data;
    } catch (e) {
      console.error(e);
    }
}