/*eslint-env commonjs*/
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    const contexts = ['/calls'];
    const proxyMiddleware = createProxyMiddleware({ target: 'http://localhost/' });
    contexts.forEach(context => app.use(context, proxyMiddleware));
};
