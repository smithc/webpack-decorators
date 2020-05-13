import { interceptorConfig } from './interceptorConfig';

import * as React from '___react-original___';

export * from '___react-original___';

let reactProxy = {}; 

const functionInterceptor = (targetFunction) => {
    const originalFunction = function() {
        // Remove the first parameter, which is the 'next' function call
        const args = Array.prototype.slice.call(arguments, 1);
        return React[targetFunction].apply(null, args);
    }.bind(null);

    return function() {
        const args = Array.prototype.slice.call(arguments);
        // return (args) => {}

        // TODO: memoize this callChain resolution
        // For each decorator, pipeline the 'original' function call
        const callChain = interceptorConfig.react.decorators.reduce((prev, cur) => {
            const pipelinedFunction = function() {
                // const args = Array.prototype.slice.call(arguments, 1);
                return cur[targetFunction].bind(null, prev).apply(null, arguments);
            };
            return pipelinedFunction;
        }, function() { return originalFunction.bind(null, undefined).apply(null, arguments) });

        return callChain.apply(null, args);
    };
};

// Create interceptor for each function defined in 'interceptorConfig'
Object.getOwnPropertyNames(React)
    .filter(prop => interceptorConfig.react.interceptedFunctions.has(prop))
    .forEach(prop => reactProxy[prop] = functionInterceptor.call(null, prop).bind(null));

export default {
    ...React,
    ...reactProxy
};
// export { default } from '___react-original___';