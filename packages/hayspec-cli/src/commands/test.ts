import { Runner } from '@hayspec/runner';
import { Spec, Stage } from '@hayspec/spec';
import { DefaultReporter } from '@hayspec/reporter';
import { getConfig } from '../lib/env';

/**
 * Runs tests.
 */
export default async function (argv) {
  const { match } = getConfig(argv);
  const reporter = new DefaultReporter();
  const stage = new Stage(reporter);
  const test = new Spec(stage);

  const runner = new Runner();
  await runner.require(...match);
  runner.results.forEach((result) => {
    const message = result.file.substr(process.cwd().length + 1);
    test.spec(message, result.spec);
  });

  try {
    await test.perform();
    process.exit(reporter.failedCount ? 1 : 0);
  } catch (e) {
    console.log(e);
    process.exit(2);
  }
}
