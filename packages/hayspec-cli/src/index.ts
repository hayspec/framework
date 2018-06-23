import * as yargs from 'yargs';
import testHandler from './commands/test';

/**
 * Interface definition.
 */
const { argv } = yargs
  .usage('Usage: $0 --help')
  .option('require', {
    array: true,
    description: 'Require dependencies',
  })
  .option('match', {
    array: true,
    description: 'Match pattern',
    default: ['src/**/*.test.*'],
  });

/**
 * Upgrading environment.
 */
if (Array.isArray(argv.require)) {
  argv.require.forEach((v) => require(v));
}

/**
 * Running tests.
 */
testHandler(argv);
