import test from 'ava';
import { exec } from '../../methods/exec';

test('executes terminal command', async (t) => {
  const { stdout, stderr } = await exec('echo "foo"');
  t.true(stdout.indexOf('foo') !== -1);
  t.true(stderr === '');
});
