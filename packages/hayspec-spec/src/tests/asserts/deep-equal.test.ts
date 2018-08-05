import test from 'ava';
import deepEqual from '../../asserts/deep-equal';

test('succeeds for equal values', async (t) => {
  t.true(deepEqual(true, true));
  t.true(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 }));
  t.true(deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }));
  t.true(deepEqual({ a: { b: { c: { d: false } } } }, { a: { b: { c: { d: false } } } }));
});

test('fails for not equal values', async (t) => {
  t.false(deepEqual(true, false));
  t.false(deepEqual({ a: 1, b: '2' }, { b: 2, a: 1 }));
  t.false(deepEqual({ a: [1, { b: '2' }] }, { a: [1, { b: 2 }] }));
  t.false(deepEqual({ a: { b: { c: { d: true } } } }, { a: { b: { c: { d: false } } } }));
});
