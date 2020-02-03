// @ts-ignore: isolated modules error
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/login/oauth/access_token', {
      target: 'https://github.com',
      changeOrigin: true
    })
  );
};