'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const paths = require('./paths');

// -----------------------------Rules-------------------------------------------
const rules = [{
  oneOf: [
    // JS files from "src"
    {
      test: /\.js$/,
      include: paths.src,
      use: {
        loader: 'babel-loader',
        options: {
          // cacheDirectory: true // WARNING: can cause babel-loader errors
        },
      },
    },
    // Fallback to the "file" loader for all unmatched modules
    {
      exclude: [/\.js$/, /\.html$/, /\.json$/],
      use: {
        loader: 'file-loader',
        options: {
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
    { from: paths.staticFiles, to: paths.dist },
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
  new webpack.HotModuleReplacementPlugin(),
];

// -------------------------- Development config -------------------------------
module.exports = merge(commonConfig, {
  mode: 'development',
  output: {
    pathinfo: true,
    filename: paths.output.devJS,
    chunkFilename: paths.output.devChunks,
  },
  module: {
    // noParse: function... <- Skip parsing (if no import, require, define)
    rules,
  },
  plugins,
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    contentBase: paths.dist,
    publicPath: '/',
    open: true,
    compress: true,
    clientLogLevel: 'error',
    historyApiFallback: {
      disableDotRule: true,
    },
    host: 'localhost',
    port: 8000,
  },
  optimization: {
    concatenateModules: false,
    minimize: false,
  },
});
