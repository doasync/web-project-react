'use strict';

const fs = require('fs');

const { version } = require('../package');

// eslint-disable-next-line security/detect-non-literal-fs-filename
const root = fs.realpathSync(`${__dirname}/..`); // resolve any symlinks etc.

const rootUrl = '';
const urlPath = '';

const src = `${root}/src`;
const dist = `${root}/dist${urlPath}`;

const webpack = `${root}/webpack`;
const modules = `${root}/node_modules`;
const appModules = `${root}/packages`;

const mainJs = `${src}/client/main.js`;
const indexHtml = `${src}/server/index.html`;

const stylelintPattern = '+(**/*.css|**/*.scss|**/*.js|**/*.html)';
const packageJson = `${root}/package.json`;
const env = `${root}/.env`;
const envRef = `${root}/.env.ref`;

const records = `${webpack}/info/records.json`;

const cssAssetsDirs = ['css', 'assets'];
const injectAssets = [
  `css/main.css?${version}`,
];

const output = {
  css: 'css/[name].css',
  cssChunks: 'css/[id].css',
  assets: '[path][name].[hash:6].[ext]',
  js: 'js/[name].[chunkhash:6].js',
  jsChunks: 'js/[name].[chunkhash:6].js',
  devJs: 'js/[name].js',
  devJsChunks: 'js/[name].js',
};

module.exports = {
  rootUrl,
  urlPath,
  root,
  modules,
  appModules,
  src,
  dist,
  mainJs,
  indexHtml,
  packageJson,
  output,
  records,
  env,
  envRef,
  stylelintPattern,
  cssAssetsDirs,
  injectAssets,
};
