import { createProxy } from 'webpack-decorators';

import * as React from '___react-original___';
export * from '___react-original___';

const reactProxy = createProxy(React, 'react');

export default reactProxy;