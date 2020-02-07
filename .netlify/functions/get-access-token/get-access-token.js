const axios = require('axios');

exports.handler = async function(event, context, callback) {
  const { code, client_id, client_secret } = event.queryStringParameters;
  const config = {
    method: 'POST',
    url: 'https://github.com/login/oauth/access_token',
    params: {
      code,
      client_id,
      client_secret
    }
  };

  const response = await axios({ ...config });
  console.log(response)
  try {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response.data)
    });
  } catch (e) {
    callback(new Error(e));
  }
};
