import test from 'ava';
import * as util from 'util';
import * as cproc from 'child_process';

const exec = util.promisify(cproc.exec);

test('initializes current folder', async (t) => {
  const command = `mkdir -p ./node_modules/.tmp/test; cd ./node_modules/.tmp/test; ../../../bin/hayspec init --name foo --description bar; echo code: $?`;
  const { stdout, stderr } = await exec(command);
  t.true(stdout.indexOf('Continue by running the commands below:') !== -1);
  t.true(stdout.indexOf('code: 0') !== -1);
  t.true(stderr === '');
});

test('runs valid tests', async (t) => {
  const command = './bin/hayspec test --require ts-node/register --match ./src/tests/assets/**/valid.hay.*; echo code: $?';
  const { stdout, stderr } = await exec(command);
  t.true(stdout.indexOf('src/tests/assets/valid.hay.ts') !== -1);
  t.true(stdout.indexOf('src/tests/assets/invalid.hay.ts') === -1);
  t.true(stdout.indexOf('code: 0') !== -1);
  t.true(stderr === '');
});

test('runs invalid tests', async (t) => {
  const command = './bin/hayspec test --require ts-node/register --match ./src/tests/assets/**/invalid.hay.*; echo code: $?';
  const { stdout, stderr } = await exec(command);
  t.true(stdout.indexOf('src/tests/assets/valid.hay.ts') === -1);
  t.true(stdout.indexOf('src/tests/assets/invalid.hay.ts') !== -1);
  t.true(stdout.indexOf('code: 1') !== -1);
  t.true(stderr === '');
});
