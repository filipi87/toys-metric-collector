/*eslint-env commonjs*/
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    const contexts = ['/agents', '/auth', '/mediarouter', '/chats', '/email', '/incoming-service', '/settings', '/dashboard', '/socialmedia'];
    const proxyMiddleware = createProxyMiddleware({ target: 'http://localhost/' });
    contexts.forEach(context => app.use(context, proxyMiddleware));
};
