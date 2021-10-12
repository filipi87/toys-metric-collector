/*eslint-env commonjs*/
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    const contexts = ['/calls'];
    const proxyMiddleware = createProxyMiddleware({ target: 'http://localhost:8543/' });
    contexts.forEach(context => app.use(context, proxyMiddleware));
};
