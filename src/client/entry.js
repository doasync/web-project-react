// @flow

// Entry point

import * as React from 'react';
import ReactDOM from 'react-dom';
import { appRoot } from './dom-elements';
import { App } from './app';

if (appRoot == null) {
  throw new Error('No root element');
}

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
