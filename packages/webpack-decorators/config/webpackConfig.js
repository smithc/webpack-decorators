const reactDecoratorConfig = {
  resolve: {
    alias: {
      react$: eval('require').resolve(`webpack-decorator-react`).ReactWrapper,
      "___react-original___$": require.resolve(`react`),
    },
  },
};

const reactDomDecoratorConfig = {
  resolve: {
    alias: {
      "react-dom$": eval('require').resolve(`webpack-decorator-react-dom`).ReactDOMWrapper,
      "___react-dom-original___$": require.resolve(`react-dom`),
    },
  },
};

export {
    reactDecoratorConfig,
    reactDomDecoratorConfig
};