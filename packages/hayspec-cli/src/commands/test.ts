import { Runner } from '@hayspec/runner';
import { Spec, Stage } from '@hayspec/core';
import { DefaultReporter } from '@hayspec/reporter';

/**
 * Runs tests.
 */
export default async function (argv) {
  const { match } = argv;
  const reporter = new DefaultReporter();
  const stage = new Stage(reporter);
  const test = new Spec(stage);

  const runner = new Runner();
  await runner.require(...match);
  runner.results.forEach((result) => {
    const message = result.file.substr(process.cwd().length + 1);
    test.spec(message, result.spec);
  });

  await test.perform();
}
