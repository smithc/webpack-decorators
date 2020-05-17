import { createProxy } from 'webpack-decorators';

import * as ReactDOM from '___react-dom-original___';
export * from '___react-dom-original___';

const reactDOMProxy = createProxy(ReactDOM, 'react-dom');

export default reactDOMProxy;