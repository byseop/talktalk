import axios from 'axios';

export async function getUser(token: string) {
  const response = await axios({
    method: 'get',
    baseURL: 'https://api.github.com',
    url: '/user',
    headers: {
      'Authorization': `token ${token}`
    }
  });

  try {
    const data = response.data;
    return data;
  } catch (e) {
    console.error(e);
  }
}
