// @flow

import * as React from 'react';

// Import views
import { Home } from '~/home';

// Root component
export function Root () {
  return (
    // <Router>
    <Home greeting="Hello world!" />
    // </Router>
  );
}
