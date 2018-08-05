import * as yargs from 'yargs';
import initHandler from './commands/init';
import testHandler from './commands/test';

/**
 * Interface definition.
 */
const { argv } = yargs
  .usage('Usage: $0 --help')
  .command('init', 'Initializes project directory.',  (yargs) => yargs
    .option('root', {
      string: true,
      description: 'Project root folder',
      default: '.',
    })
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
      default: ['./src/cro**/*.test.*'],
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
if (Array.isArray(argv.require)) {
  argv.require.forEach((v) => require(v));
}
