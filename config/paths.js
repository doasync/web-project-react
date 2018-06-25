'use strict';

const fs = require('fs');

const root = fs.realpathSync(`${__dirname}/..`); // resolve any symlinks etc.

const src = `${root}/src`;
const dist = `${root}/dist`;

const config = `${root}/config`;
const modules = `${root}/node_modules`;
const appModules = `${root}/lib`;

const entryJs = `${src}/entry.js`;
const indexHtml = `${src}/index.html`;
const staticFiles = `${src}/static`;

const packageJson = `${root}/package.json`;
const env = `${root}/.env`;
const envRef = `${root}/.env.ref`;

const records = `${config}/info/records.json`;

const output = {
  assets: 'assets/[name].[hash:6].[ext]',
  js: 'js/[name].[chunkhash:6].js',
  chunks: 'js/[name].[chunkhash:6].js',
  devJS: 'js/[name].js',
  devChunks: 'js/[name].js',
};

module.exports = {
  root,
  config,
  modules,
  appModules,
  src,
  staticFiles,
  dist,
  entryJs,
  indexHtml,
  packageJson,
  output,
  records,
  env,
  envRef,
};
