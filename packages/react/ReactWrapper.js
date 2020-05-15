import { interceptorConfig, functionInterceptor, registerConfigChangeCallback } from 'webpack-decorators';

import * as React from '___react-original___';

export * from '___react-original___';

const reactProxy = {
    ...React
};

// Create interceptor for each function defined in 'interceptorConfig'
const initializeDecorators = () => {
    Object.getOwnPropertyNames(React)
        .filter(prop => interceptorConfig.react.interceptedFunctions.has(prop))
        .filter(prop => typeof React[prop] === 'function')
        .forEach(prop => {
            reactProxy[prop] = functionInterceptor.call(this, React, prop);
            Object.setPrototypeOf(reactProxy[prop], Object.getPrototypeOf(React[prop]));
            Object.assign(reactProxy[prop].prototype, React[prop].prototype);
        });
};

initializeDecorators();
registerConfigChangeCallback('react', initializeDecorators);

export default reactProxy;