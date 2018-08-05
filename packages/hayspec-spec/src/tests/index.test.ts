import test from 'ava';
import * as hayspec from '..';

test('exposes Spec class', async (t) => {
  t.is(!!hayspec.Spec, true);
});

test('exposes Stage class', async (t) => {
  t.is(!!hayspec.Stage, true);
});

test('exposes Context class', async (t) => {
  t.is(!!hayspec.Context, true);
});
