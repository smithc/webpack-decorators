const reactDecoratorConfig = {
  resolve: {
    alias: {
      react$: require.resolve(`./ReactWrapper`),
      "___react-original___$": require.resolve(`react`),
    },
  },
};

const reactDomDecoratorConfig = {
  resolve: {
    alias: {
      "react-dom$": require.resolve(`./ReactDOMWrapper`),
      "___react-dom-original___$": require.resolve(`react-dom`),
    },
  },
};

export {
    reactDecoratorConfig,
    reactDomDecoratorConfig
};