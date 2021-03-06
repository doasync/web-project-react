'use strict';

const yargs = require('yargs');

module.exports = yargs
  .options({
    e: {
      alias: 'eject',
      describe: 'Eject files to the directory',
      type: 'boolean',
      demandOption: true,
      default: undefined,
    },
    l: {
      alias: 'lock',
      describe: 'Do not remove package-lock.json',
      type: 'boolean',
      default: false,
    },
    b: {
      alias: 'bare',
      describe: 'Do not merge package.json',
      type: 'boolean',
      default: false,
    },
    n: {
      alias: 'no-src',
      describe: 'Do not copy src folder',
      type: 'boolean',
      default: false,
    },
  })
  .help()
  .alias('h', 'help')
  .version()
  .alias('v', 'version')
  .strict(true)
  .demandCommand(0, 0)
  .argv;
