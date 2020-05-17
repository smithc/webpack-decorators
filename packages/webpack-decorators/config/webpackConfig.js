const reactDecoratorConfig = {
  resolve: {
    alias: {
      react$: require.resolve(`webpack-decorators-react`),
      "___react-original___$": require.resolve(`react`),
    },
  },
};

const reactDomDecoratorConfig = {
  resolve: {
    alias: {
      "react-dom$": require.resolve(`webpack-decorators-react-dom`),
      "___react-dom-original___$": require.resolve(`react-dom`),
    },
  },
};

export {
    reactDecoratorConfig,
    reactDomDecoratorConfig
};