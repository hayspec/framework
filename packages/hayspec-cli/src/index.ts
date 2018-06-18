import * as args from 'args';
import { Runner } from '@hayspec/runner';
import { Spec } from '@hayspec/core';
import { DefaultReporter } from '@hayspec/reporter';

/**
 * Interface definition.
 */
args.option('require', 'Display program version.')
args.option('match', 'Test files match pattern.')

/**
 * Command parsing.
 */
const flags = args.parse(process.argv);

/**
 * Upgrading environment.
 */
if (typeof flags.require === 'string') {
  flags.require.split(',').forEach((v) => require(v));
}

/**
 * Running tests.
 */
(async function () {
  const pattern = flags.match || '**/*.test.*';

  const runner = new Runner();
  await runner.require(pattern);

  const test = new Spec();
  runner.results.forEach((result) => {
    const message = result.file.substr(process.cwd().length + 1);
    test.spec(message, result.spec);
  });

  const reporter = new DefaultReporter();
  test.stage.reporter = reporter;
  await test.perform();
    
})();
