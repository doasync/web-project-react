'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FlowWebpackPlugin = require('flow-webpack-plugin');

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const paths = require('./paths');

const testModules = (...names) => chunk => chunk.resource && names.some(
  name => name && chunk.resource.startsWith(`${paths.modules}/${name}/`),
);

// -----------------------------Rules-------------------------------------------
const rules = [{
  oneOf: [
    // Skipp all CSS/Sass files
    {
      test: [/\.css$/, /\.scss$/],
      use: 'null-loader',
    },
    // JS files from "src"
    {
      test: /\.js$/,
      include: paths.src,
      use: [
        'babel-loader',
        {
          loader: 'eslint-loader',
          options: {
            emitWarning: false,
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
  new CleanWebpackPlugin([paths.dist], {
    root: paths.root,
    exclude: paths.cssAssetsDirs,
  }),
  new HtmlWebpackPlugin({
    inject: 'body',
    template: paths.indexHtml,
  }),
  new HtmlWebpackIncludeAssetsPlugin({
    assets: paths.injectAssets,
    append: false,
  }),
  new DotenvWebpackPlugin({
    path: paths.env,
    safe: paths.envRef,
    systemvars: false,
  }),
  new StyleLintPlugin({
    context: paths.src,
    emitErrors: true,
    failOnError: true,
    files: paths.stylelintPattern,
  }),
  new FlowWebpackPlugin({
    failOnError: true,
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /\/moment$/),
  new webpack.IgnorePlugin(/^\.\/languages$/, /\/numbro$/),
];

// ------------------------- Production config ---------------------------------
module.exports = merge(commonConfig, {
  mode: 'production',
  entry: {
    main: paths.mainJs,
  },
  bail: true,
  devtool: false,
  output: {
    publicPath: `${paths.rootUrl}${paths.urlPath}/`,
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
  },
  recordsPath: paths.records,
  stats: {
    modules: false,
  },
});
