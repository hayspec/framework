// import test from 'ava';

// test.skip('foo', async (t) => {
//   t.pass();
// });


import { Spec, Stage } from '@hayspec/core';
import { MemoryReporter } from '../../reporters/memory';

const reporter = new MemoryReporter();
const stage = new Stage(reporter);

const colors = new Spec(stage);
colors.test('has white doors', async (context, stage) => {
  context.is(true, true, 'foo');
});
colors.test('has green doors', async (context, stage) => {
  context.is(true, true, 'foo');
});

export const weights = new Spec(stage);
weights.test('is too heavy', async (context, stage) => {
  context.is(true, true, 'foo');
});
weights.spec('colors', colors);
weights.test('is too light', async (context, stage) => {
  context.is(true, true, 'foo');
});

export const base = new Spec(stage);
base.test('has cars', async (context, stage) => {
  context.is(true, true, 'foo');
});
base.skip('has cars', async (context, stage) => {
  context.is(true, true, 'foo');
});
base.spec('weights', weights);
base.test('has trucks', async (context, stage) => {
  context.is(true, true, 'foo');
});
base.perform();
