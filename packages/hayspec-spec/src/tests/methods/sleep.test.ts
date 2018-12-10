import test from 'ava';
import { sleep } from '../../methods/sleep';

test('continues with timeout', async (t) => {
  const start = Date.now();
  await sleep(2000);
  t.true(Date.now() >= start + 2000);
});
