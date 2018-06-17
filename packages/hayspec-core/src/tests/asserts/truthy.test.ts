import test from 'ava';
import truthy from '../../asserts/truthy';

test('succeeds for true values', async (t) => {
  t.true(truthy(true));
  t.true(truthy('true'));
  t.true(truthy('TRUE'));
  t.true(truthy(1));
  t.true(truthy('1'));
  t.true(truthy('yes'));
  t.true(truthy('YES'));
  t.true(truthy('ok'));
  t.true(truthy('OK'));
  t.true(truthy('correct'));
  t.true(truthy('CORRECT'));
});

test('fails for false values', async (t) => {
  t.false(truthy(false));
  t.false(truthy('false'));
  t.false(truthy('FALSE'));
  t.false(truthy(0));
  t.false(truthy('0'));
  t.false(truthy('no'));
  t.false(truthy('NO'));
  t.false(truthy('bad'));
});
