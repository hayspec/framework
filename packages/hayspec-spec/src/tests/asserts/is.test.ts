import test from 'ava';
import is from '../../asserts/is';

test('succeeds for equal values', async (t) => {
  t.true(is(1, 1));
  t.true(is(0, 0));
  t.true(is(true, true));
  t.true(is(false, false));
  t.true(is('foo', 'foo'));
});

test('fails for not equal values', async (t) => {
  t.false(is(1, 0));
  t.false(is(1, '1'));
  t.false(is('1', 1));
  t.false(is(false, true));
  t.false(is('foo', 'bar'));
});
