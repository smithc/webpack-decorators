
const interceptorConfig = {
    react: {
        interceptedFunctions: new Set([
            'createElement'
        ]),
        decorators: []
    },
    'react-dom': {
        interceptedFunctions: new Set([
            'render', 
            'hydrate'
        ]),
        decorators: []
    }
};

const configCallbacks = {};

const registerConfigChangeCallback = (module, callback) => {
    const moduleCallbacks = configCallbacks[module] = (configCallbacks[module] || []);
    moduleCallbacks.push(callback);
}

const onConfigChange = (module, ...targetFunctions) => {
    if (Array.isArray(configCallbacks[module])) {
        configCallbacks[module].forEach(callback => callback(...targetFunctions));
    }
};

const registerDecorator = (moduleName, decorator, ...targetFunctions) => {
    if (!interceptorConfig.hasOwnProperty(moduleName)) {
        // do something here
        console.debug(`Unable to intercept module; module '${moduleName}' doesn't exist`);
        return;
    }

    interceptorConfig[moduleName].decorators.push(decorator);

    targetFunctions.forEach(func => 
        interceptorConfig[moduleName].interceptedFunctions.add(func)
    );

    // Rebuild call-chains for affected functions
    onConfigChange(moduleName, ...targetFunctions);
};

export { interceptorConfig, registerDecorator, registerConfigChangeCallback };