import { Spec } from '@hayspec/core';
import * as example from '..';

const spec = new Spec();

spec.test('method `isHay` returns `true`', (ctx) => {
  const isHay = example.isHay();
  ctx.true(isHay);
});

export default spec;
