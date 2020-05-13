
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
};

export { interceptorConfig, registerDecorator };