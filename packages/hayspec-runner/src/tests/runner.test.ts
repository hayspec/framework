import test from 'ava';
import { Runner } from '..';

test('method `load` loads spec files based on pattern', async (t) => {
  const runner = new Runner();
  await runner.require('./src/tests/assets/**/*.hay.ts');
  t.is(runner.specs.length, 2);
});
