// @flow

// Entry point

import * as React from 'react';
import ReactDOM from 'react-dom';
import invariant from 'fbjs/lib/invariant';
import { appRoot } from './dom-elements';
import { App } from './app';

invariant(appRoot != null, 'No root element');

const renderApp = () => {
  ReactDOM.render(<App />, appRoot);
};

declare var module: {
  hot: {
    accept(paths: string, callback: () => void | Promise<void>): void;
  },
};

if (module.hot) {
  module.hot.accept('./app', renderApp);
}

// noinspection JSIgnoredPromiseFromCall
renderApp();
