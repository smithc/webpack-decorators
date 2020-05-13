const decorator = {
  createElement: function (originalFunc, ...args) {
    const type = args[0];
    const config = args[1];
    const children = args[2];

    console.debug(`[decorator]: Decorated React.createElement... ${type.toString()}, ${config}`);
    
    return originalFunc(...args);
  },
};

export { decorator };