// import test from 'ava';

// test.skip('xxxx', async (t) => {});


import * as sleep from 'sleep-promise';
import { Spec } from '../..';


export const colors = new Spec();

colors.test('has white doors', async (context, stage) => {
  context.is(await sleep(2000).then(() => true), true, 'foo');
});

colors.test('has green doors', async (context, stage) => {
  context.is(await sleep(2000).then(() => true), true, 'foo');
});


export const weights = new Spec();

weights.test('is too heavy', async (context, stage) => {
  context.is(await sleep(1000).then(() => true), true, 'foo');
});

weights.spec('colors', colors);

weights.test('is too light', async (context, stage) => {
  context.is(await sleep(1000).then(() => true), true, 'foo');
});


export const spec = new Spec();

spec.test('has cars', async (context, stage) => {
  await sleep(1000);
});

spec.skip('has cars', async (context, stage) => {
  await sleep(1000);
});

spec.spec('weights', weights);

spec.test('has trucks', async (context, stage) => {
  await sleep(1000);
});

spec.perform();
