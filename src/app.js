// @flow

'use strict'; // eslint-disable-line strict, lines-around-directive

// React
import * as React from 'react';

const { Component } = React;

export type Props = {| greeting: string |}
export type State = {| name: string |}

// App
class App extends Component<Props, State> {
  state = {
    name: 'user',
  };

  render () {
    const { name } = this.state;
    const { greeting } = this.props;

    return (
      <div>
        {`${greeting} ${name}!`}
      </div>
    );
  }
}

export { App };
