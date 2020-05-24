
const interceptorConfig = {
    react: {
        interceptedFunctions: new Set(),
        decorators: []
    },
    'react-dom': {
        interceptedFunctions: new Set(),
        decorators: []
    }
};

const getModuleConfiguration = (moduleName) => {
    const defaultConfig = { 
        interceptedFunctions: new Set(),
        decorators: []
     };
    return { ...defaultConfig, ...interceptorConfig[moduleName] };
}

const addModuleConfiguration = (moduleName) => {
    if (!interceptorConfig[moduleName]) {
        interceptorConfig[moduleName] = {
            interceptedFunctions: new Set(),
            decorators = []
        };
    }
}

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
    addModuleConfiguration(moduleName);

    interceptorConfig[moduleName].decorators.push(decorator);

    targetFunctions.forEach(func => 
        interceptorConfig[moduleName].interceptedFunctions.add(func)
    );

    // Rebuild call-chains for affected functions
    onConfigChange(moduleName, ...targetFunctions);
};

export { getModuleConfiguration, registerDecorator, registerConfigChangeCallback };