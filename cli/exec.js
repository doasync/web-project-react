#!/usr/bin/env node

/* eslint-disable dot-notation,no-console */

const fsExtra = require('fs-extra');
const path = require('path');

const argv = require('./argv');

const ignoreFiles = [
  'node_modules',
  'cli',
  'package.json',
  'package-lock.json',
  'README.md',
  'LICENSE',
];

if (argv.eject) {
  const root = path.resolve(`${__dirname}/..`);
  const destination = process.cwd();

  if (!argv.bare) {
    const fromPackageObj = fsExtra.readJsonSync(`${root}/package.json`);
    const toPackageObj = fsExtra.readJsonSync(`${destination}/package.json`);

    toPackageObj.scripts = {
      ...fromPackageObj.scripts,
      ...toPackageObj.scripts,
    };

    delete fromPackageObj.dependencies['yargs'];
    delete fromPackageObj.dependencies['fs-extra'];

    toPackageObj.dependencies = {
      ...fromPackageObj.dependencies,
      ...toPackageObj.dependencies,
    };

    toPackageObj.devDependencies = {
      ...fromPackageObj.devDependencies,
      ...toPackageObj.devDependencies,
    };

    toPackageObj.browserslist = fromPackageObj.browserslist;

    fsExtra.writeJsonSync(`${destination}/package.json`, toPackageObj, { spaces: 2 });
    console.log('* ', `${destination}/package.json`);
  }

  if (!argv.lock) {
    fsExtra.removeSync(`${destination}/package-lock.json`);
    console.log('- ', `${destination}/package-lock.json`);
  }

  fsExtra.copySync(root, destination, {
    filter: (from) => {
      const file = path.relative(root, from);
      if (!ignoreFiles.includes(file)) {
        if (file) {
          console.log('+ ', file);
        }
        return true;
      }
      return false;
    },
  });

  console.log('\nDone! React project is ejected... Run `npm -i`');
}
