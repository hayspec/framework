import test from 'ava';
import { Runner } from '..';

test('method `require` loads spec files based on pattern', async (t) => {
  const runner = new Runner();
  await runner.require('./src/tests/assets/**/*.all.ts');
  t.is(runner.results.length, 2);
});

test('method `require` loads files with only method', async (t) => {
  const runner = new Runner();
  await runner.require('./src/tests/assets/**/*.only.ts');
  t.is(runner.results.length, 1);
});
