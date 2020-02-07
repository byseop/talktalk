const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    // proxy('/login/oauth/access_token', {
    //   target: 'https://github.com',
    //   changeOrigin: true
    // }),
    proxy('/user', {
      target: 'https://api.github.com',
      changeOrigin: true
    }),
    proxy('/.netlify/functions/get-access-token', {
      target: 'http://localhost:9000',
      changeOrigin: true
    }),
  );
};
