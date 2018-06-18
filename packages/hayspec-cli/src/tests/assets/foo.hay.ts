import { Spec } from '@hayspec/core';

const spec = new Spec();

spec.test('foo', async (context) => {
  context.is(true, true);
});

spec.test('bar', async (context) => {
  context.is(true, true);
  context.is(true, true);
  context.is(true, false);
});

export default spec;
