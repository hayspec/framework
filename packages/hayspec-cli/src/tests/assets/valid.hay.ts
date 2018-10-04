import { Spec } from '@hayspec/spec';

const spec = new Spec();

spec.test('foo', async (context) => {
  context.true(true);
});

spec.test('bar', async (context) => {
  context.true(true);
  context.true(true);
});

export default spec;
