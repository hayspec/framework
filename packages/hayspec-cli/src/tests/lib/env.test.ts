import test from 'ava';
import { getConfig } from '../../lib/env';

test('method `getConfig` returns package.json hayspec configuration', async (t) => {
  t.deepEqual(getConfig(), {
    name: '',
    description: '',
    require: ['ts-node/register'],
    match: ['./src/**/*.hay.*'],
  });
});

test('method `getConfig` merges reveived configuration', async (t) => {
  t.deepEqual(getConfig({
    extension: [],
    require: ['bar'],
    match: ['foo'],
  }), {
    name: '',
    description: '',
    require: ['bar'],
    match: ['foo'],
  });
});
