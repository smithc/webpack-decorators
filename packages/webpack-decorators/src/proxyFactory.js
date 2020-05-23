import { functionInterceptor } from './interceptor';
import { interceptorConfig, registerConfigChangeCallback } from './config/interceptorConfig';

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

    initializeDecorators(...Array.from(interceptorConfig[moduleName].interceptedFunctions));
    registerConfigChangeCallback(moduleName, initializeDecorators);

    return moduleProxy;
};

export default createProxy;