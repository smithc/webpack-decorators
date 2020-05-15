# React Module Decorator

This library allows consumers to decorate the behavior of React via module proxies that are aliased through Webpack configuration.

# Setup
1. Install the package `npm install smithc/react-decorator`
2. Add the desired `react` or `react-dom` configs (examples in `reactDecoratorConfig`) to your webpack.config.js

```
resolve: {
  alias: {
    react$: require.resolve(`webpack-decorators-react`),
    "___react-original___$": require.resolve(`react`),
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

registerDecorator('react', decorator, 'createElement');
```
