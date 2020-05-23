const { createProxy } = require('webpack-decorators');
const ReactDOM = require('___react-dom-original___');

const reactDOMProxy = createProxy(ReactDOM, 'react-dom');

module.exports = reactDOMProxy;

Object.getOwnPropertyNames(reactDOMProxy).forEach(prop => {
    module.exports[prop] = reactDOMProxy[prop];
});

module.exports.default = reactDOMProxy;