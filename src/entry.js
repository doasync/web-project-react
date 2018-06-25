// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';

const rootElement = document.getElementById('root');

if (rootElement == null) {
  throw new Error('No root element');
}

const renderApp = async () => {
  const { App } = await import('~/app' /* webpackChunkName: "app" */);

  ReactDOM.render(<App greeting="Hello" />, rootElement);
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
