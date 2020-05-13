const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "reactDecorator",
    libraryTarget: "umd",
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
    },
    "___react-original___": {
      commonjs: "___react-original___",
      commonjs2: "___react-original___",
      amd: "___react-original___",
    },
    "___react-dom-original___": {
      commonjs: "___react-dom-original___",
      commonjs2: "___react-dom-original___",
      amd: "___react-dom-original___",
    },
  },
};
