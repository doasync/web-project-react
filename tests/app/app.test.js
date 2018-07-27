
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '~/app';

describe('App', () => {
  const container = document.createElement('div');

  it('renders without crashing', () => {
    ReactDOM.render(<App />, container);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('renders "Hello world!"', () => {
    ReactDOM.render(<App />, container);
    expect(container.textContent).toBe('Hello world!');
  });
});
