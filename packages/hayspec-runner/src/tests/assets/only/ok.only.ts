import { Spec } from '@hayspec/spec';

const spec = new Spec();

spec.only('hasOnly() returns true', async (ctx) => {
    await ctx.sleep(1000);
});

export default spec;
