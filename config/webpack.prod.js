'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const paths = require('./paths');

const testModules = (...names) => chunk => chunk.resource && names.some(
  name => name && chunk.resource.startsWith(`${paths.modules}/${name}/`),
);

// -----------------------------Rules-------------------------------------------
const rules = [{
  oneOf: [
    // JS files from "src"
    {
      test: /\.js$/,
      include: paths.src,
      use: [
        'babel-loader',
        {
          loader: 'eslint-loader',
          options: {
            failOnError: true,
          },
        },
      ],
    },
    // Fallback to the "file" loader for all unmatched modules
    {
      exclude: [/\.js$/, /\.html$/, /\.json$/], // fixing conflicts with other loaders
      use: {
        loader: 'file-loader',
        options: {
          context: paths.src,
          name: paths.output.assets,
        },
      },
    },
    // No more loaders after file-loader
  ],
}];

// ----------------------------Plugins------------------------------------------
const plugins = [
  new CleanWebpackPlugin([paths.dist], { root: paths.root }),
  new CopyWebpackPlugin([
    { from: paths.publicFiles, to: paths.copyPublic },
  ]),
  new HtmlWebpackPlugin({
    inject: 'body',
    template: paths.indexHtml,
  }),
  new DotenvWebpackPlugin({
    path: paths.env,
    safe: paths.envRef,
    systemvars: true,
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /\/moment$/),
  new webpack.IgnorePlugin(/^\.\/languages$/, /\/numbro$/),
];

// ------------------------- Production config ---------------------------------
module.exports = merge(commonConfig, {
  mode: 'production',
  entry: {
    main: paths.entryJs,
  },
  bail: true,
  devtool: false,
  output: {
    filename: paths.output.js,
    chunkFilename: paths.output.jsChunks,
  },
  module: {
    rules,
  },
  plugins,
  optimization: {
    noEmitOnErrors: true,
    runtimeChunk: 'single',
    concatenateModules: true,
    minimize: true,
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: false,
        uglifyOptions: {
          output: {
            ascii_only: true,
            comments: false,
          },
          compress: {
            comparisons: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxAsyncRequests: 16,
      maxInitialRequests: 6,
      cacheGroups: {
        polyfills: {
          test: testModules(
            'core-js',
          ),
          reuseExistingChunk: true,
        },
        react: {
          test: testModules(
            'react',
            'react-dom',
            'fbjs',
            'object-assign',
          ),
        },
      },
    },
  },
  recordsPath: paths.records,
  stats: {
    modules: false,
  },
});
