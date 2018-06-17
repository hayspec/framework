import test from 'ava';
import { Reporter } from '../../core/reporter';

test('provides `handle()` method', async (t) => {
  const reporter = new Reporter();
  t.is(typeof reporter.handle, 'function');
});
