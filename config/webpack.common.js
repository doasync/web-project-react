'use strict';

const paths = require('./paths');
const nodeLibsBrowser = require('./node-libs-browser');

// --------------------------Common config--------------------------------------
module.exports = {
  context: paths.root,
  entry: {
    main: paths.entryJs,
  },
  resolve: {
    modules: ['node_modules', paths.appModules],
    extensions: ['.js', '.json'],
    alias: {
      '~': paths.src,
    },
  },
  output: {
    path: paths.dist,
    publicPath: '/',
  },
  module: {
    wrappedContextCritical: true,
    strictExportPresence: true,
  },
  performance: {
    hints: false,
  },
  optimization: {
    noEmitOnErrors: true,
    namedModules: true, // better gzipped
    namedChunks: true,
  },
  node: nodeLibsBrowser,
};
