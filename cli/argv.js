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
  })
  .help()
  .alias('h', 'help')
  .version()
  .alias('v', 'version')
  .strict(true)
  .demandCommand(0, 0)
  .argv;
