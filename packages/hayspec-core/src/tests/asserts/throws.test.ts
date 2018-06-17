import test from 'ava';
import throws from '../../asserts/throws';

test('succeeds for values that throw', async (t) => {
  t.true(throws(() => { throw new Error() }));
  t.true(await throws(() => Promise.reject()));
});

test('succeeds for values that do not throw', async (t) => {
  t.false(throws(() => { return; }));
  t.false(await throws(() => Promise.resolve()));
});
