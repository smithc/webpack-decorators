# Webpack Module Decorator

This library allows consumers to decorate the behavior of JavaScript modules via module proxies that are aliased through Webpack configuration.

This library has behavior similar to native JavaScript decorator support, except that instead 
of requiring decorator annotations to be used within user-code, this library can inject your decorators dynamically into a proxied ES module.

This provides a level of metaprogramming support for scenarios where you may need to inject cross-cutting functionality 
into your codebase without requiring you to sprinkle annotations throughout the codebase (or even for situations where 
you may not own the code in question to begin with).

This repo currently supports two module proxies:
- `react` (in package `webpack-decorators-react`)
- `react-dom` (in package `webpack-decorators-react-dom`)

# Setup
1. Install the package `npm install webpack-decorators-react` or `npm install webpack-decorators-react-dom`
2. Add the desired `react` or `react-dom` configs (examples in `reactDecoratorConfig`) to your webpack.config.js

For react:
```
resolve: {
  alias: {
    react$: require.resolve(`webpack-decorators-react`),
    "___react-original___$": require.resolve(`react`),
  },
}
```

For react-dom:
```
resolve: {
  alias: {
    "react-dom$": require.resolve(`webpack-decorators-react-dom`),
    "___react-dom-original___$": require.resolve(`react-dom`),
  },
}
```

3. Register your custom decorators

```
const { registerDecorator } = require('webpack-decorators');

const decorator = {
  createElement: function(originalFunc, ...args) {
    console.log('[decorator]: Decorated React.createElement...');
    return originalFunc(...args);
  }
}

const decorator2 = {
  createElement: function(originalFunc, ...args) {
    console.log('[decorator2]: Decorated React.createElement...');
    return originalFunc(...args);
  },
  Component: function(originalFunc, ...args) {
    console.log('[decorator2]: Decorated React.Component...');
    return originalFunc(...args);
  }
}

registerDecorator('react', decorator, 'createElement');
registerDecorator('react', decorator2, 'createElement', 'Component');
```

>**_NOTE_:** decorators are pipelined and executed in the order in which they are defined.
> 
> Given the above order of registrations, when calling something like `React.createElement` in your code, the following call chain will result:
>
> 1. `decorator2.createElement`
> 2. `decorator.createElement`
> 3. `React.createElement` (original module)