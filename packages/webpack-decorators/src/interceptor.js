import { interceptorConfig } from './config/interceptorConfig';

export const functionInterceptor = (module, moduleName, targetFunction) => {
    const callChain = interceptorConfig[moduleName].decorators
        .filter(decorator => decorator.hasOwnProperty(targetFunction))
        .reduce((prev, cur) => {
            const pipelinedFunction = function() {
                return cur[targetFunction].bind(this, prev.bind(this)).apply(this, arguments);
            };
            return pipelinedFunction;
        }, module[targetFunction]);

    return function() {
        return callChain.apply(this, arguments);
    };
};

export default functionInterceptor;