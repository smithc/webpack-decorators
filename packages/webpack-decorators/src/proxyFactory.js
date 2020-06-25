import { functionInterceptor } from './interceptor';
import { registerConfigChangeCallback } from './config/interceptorConfig';

export const createProxy = (module, moduleName) => {
    const moduleProxy = {
        ...module
    };

    // Create interceptor for each function defined in 'interceptorConfig'
    const initializeDecorators = (...interceptedFunctions) => {
        Object.getOwnPropertyNames(module)
            .filter(prop => interceptedFunctions.includes(prop) && typeof module[prop] === 'function')
            .forEach(prop => {
                moduleProxy[prop] = functionInterceptor.call(this, module, moduleName, prop);
                Object.setPrototypeOf(moduleProxy[prop], Object.getPrototypeOf(module[prop]));
                Object.assign(moduleProxy[prop].prototype, module[prop].prototype);
            });
    };

    // To support late-binding of decorators, we'll virtualize all exported functions
    // (for those cases when an exported function is 'pinned' or cached)
    initializeDecorators(...Object.getOwnPropertyNames(module));
    registerConfigChangeCallback(moduleName, initializeDecorators);

    return moduleProxy;
};

export default createProxy;