const { createProxy } = require('webpack-decorators');
const React = require('___react-original___');

const reactProxy = createProxy(React, 'react');

module.exports = reactProxy;

Object.getOwnPropertyNames(reactProxy).forEach(prop => {
    module.exports[prop] = reactProxy[prop];
});

module.exports.default = reactProxy;