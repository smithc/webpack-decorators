const { createProxy } = require('webpack-decorators');
const ReactDOMServer = require('___react-dom-server-original___');

const reactDOMServerProxy = createProxy(ReactDOMServer, 'react-dom/server');

module.exports = reactDOMServerProxy;

Object.getOwnPropertyNames(reactDOMServerProxy).forEach(prop => {
    module.exports[prop] = reactDOMServerProxy[prop];
});

module.exports.default = reactDOMServerProxy;