'use strict';

const fs = require('fs');

// eslint-disable-next-line security/detect-non-literal-fs-filename
const root = fs.realpathSync(`${__dirname}/..`); // resolve any symlinks etc.

const src = `${root}/src`;
const dist = `${root}/dist`;

const config = `${root}/config`;
const modules = `${root}/node_modules`;
const appModules = `${root}/packages`;

const entryJs = `${src}/client/entry.js`;
const indexHtml = `${src}/server/index.html`;
const publicFiles = `${src}/static`;
const copyPublic = dist;

const packageJson = `${root}/package.json`;
const env = `${root}/.env`;
const envRef = `${root}/.env.ref`;

const records = `${config}/info/records.json`;

const output = {
  assets: '[path][name].[hash:6].[ext]',
  js: 'js/[name].[chunkhash:6].js',
  jsChunks: 'js/[name].[chunkhash:6].js',
  devJs: 'js/[name].js',
  devJsChunks: 'js/[name].js',
};

module.exports = {
  root,
  config,
  modules,
  appModules,
  src,
  publicFiles,
  copyPublic,
  dist,
  entryJs,
  indexHtml,
  packageJson,
  output,
  records,
  env,
  envRef,
};
