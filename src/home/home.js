// @flow

import * as React from 'react';

export type HomeProps = {
  greeting: string
}

// Root child
export function Home (props: HomeProps) {
  const { greeting } = props;
  return (
    <React.Fragment>
      {greeting}
    </React.Fragment>
  );
}
