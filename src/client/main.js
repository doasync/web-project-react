// @flow

// Entry point

import * as React from 'react';
import ReactDOM from 'react-dom';
import invariant from 'fbjs/lib/invariant';
import { appRoot } from './dom-elements';
import { App } from '~/app';

import '~/styles/main.scss';

const { hot } = module;

// Assert condition to be true
invariant(appRoot != null, 'No root element');

const renderApp = async () => {
  ReactDOM.render(<App />, appRoot);
};

// Hot reloading
if (hot) {
  hot.accept('./app', renderApp);
}

// noinspection JSIgnoredPromiseFromCall
renderApp();
