import test from 'ava';
import * as util from 'util';
import * as cproc from 'child_process';

const exec = util.promisify(cproc.exec);

test('runs tests', async (t) => {
  const command = './bin/hayspec test --require ts-node/register --match ./src/tests/assets/**/*.hay.*';
  const { stdout, stderr } = await exec(command);
  t.true(stdout.indexOf('src/tests/assets/foo.hay.ts') !== -1);
  t.true(stderr === '');
});

test('initializes current folder', async (t) => {
  const command = `mkdir -p ./node_modules/.tmp/test; cd ./node_modules/.tmp/test; ../../../bin/hayspec init --name foo --description bar`;
  const { stdout, stderr } = await exec(command);
  t.true(stdout.indexOf('Continue by running the commands below:') !== -1);
  t.true(stderr === '');
});
