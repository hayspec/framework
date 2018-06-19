import test from 'ava';

test.skip('foo', async (t) => {
  t.pass();
});


// import { Spec } from '@hayspec/core';
// import { DefaultReporter } from '../../reporters/default';

// const reporter = new DefaultReporter();

// const colors = new Spec();
// colors.test('correctly checks all the supported interfaces', async (context, stage) => {
//   context.is(true, true);
// });
// colors.test('returns correct balanceOf after mint', async (context, stage) => {
//   context.is(true, true);
//   context.is(true, true);
//   context.is(true, false);
// });

// export const weights = new Spec();
// weights.test('throws when trying to mint 2 NFTs with the same claim', async (context, stage) => {
//   context.is(true, true);
// });
// weights.spec('Contract: NFTokenMock', colors);
// weights.test('throws when trying to mint NFT to 0x0 address', async (context, stage) => {
//   context.is(true, true);
//   context.is(true, true);
//   context.is(true, true);
// });

// export const base = new Spec();
// base.test('throws when trying to get approval of non-existing NFT id', async (context, stage) => {
//   context.is(true, true);
// });
// base.skip('throws when trying to approve NFT ID which it does not own', async (context, stage) => {
//   context.is(true, true);
// });
// base.spec('Contract: NFTokenSpec', weights);
// base.test('throws when trying to approve NFT ID which it already owns', async (context, stage) => {
//   context.is(true, true);
// });

// base.stage.reporter = reporter;
// base.perform();
