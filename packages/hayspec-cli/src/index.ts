import * as yargs from 'yargs';
import initHandler from './commands/init';
import testHandler from './commands/test';
import { getConfig } from './lib/env';

/**
 * Interface definition.
 */
const { argv } = yargs
  .usage('Usage: $0 --help')
  .command('init', 'Initializes project directory.', (yargs) => yargs
    .option('name', {
      string: true,
      description: 'Project name',
    })
    .option('description', {
      string: true,
      description: 'Project description',
    }),
    initHandler)
  .command('test', 'Runs tests', (yargs) => yargs
    .option('match', {
      array: true,
      description: 'Match pattern',
    })
    .option('require', {
      array: true,
      description: 'Require dependencies',
    }),
    testHandler)
  .epilog('Copyright © Xpepermint 2018.')
  .help()
  .version();

/**
 * Upgrading environment.
 */
getConfig(argv).require.forEach((v) => require(v));
