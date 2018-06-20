import test from 'ava';
import * as util from 'util';
import * as cproc from 'child_process';

const exec = util.promisify(cproc.exec);

test('runs tests', async (t) => {
  const command = './bin/hayspec --require ts-node/register --match ./src/tests/assets/**/*.hay.*';
  const { stdout, stderr } = await exec(command);
  t.true(stdout.indexOf('src/tests/assets/foo.hay.ts') !== -1);
  console.log(stderr);
  t.true(stderr === '');
});
