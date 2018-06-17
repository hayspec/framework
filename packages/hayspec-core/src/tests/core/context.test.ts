import test from 'ava';
import { Context } from '../..';

interface Data {
  id: number;
  name: string;
}

test('methods `set()` and `get()` manages values', async (t) => {
  const context = new Context<Data>();
  context.set('id', 100);
  context.set('name', 'foo');
  const id = context.get('id'); // typescript should show `integer` type
  const name = context.get('name'); // typescript should show `string` type
  t.is(id, 100);
  t.is(name, 'foo');
});

test('method `pass()` passes the test', async (t) => {
  const context = new Context<Data>();
  context.pass();
  context.pass('foo');
  t.deepEqual(context.messages, [
    {
      type: 'TestMessage',
      name: null,
      assertion: 'pass',
      status: 1,
    },
    {
      type: 'TestMessage',
      name: 'foo',
      assertion: 'pass',
      status: 1,
    },
  ]);
});

test('method `fail()` fails the test', async (t) => {
  const context = new Context<Data>();
  context.fail();
  context.fail('foo');
  t.deepEqual(context.messages, [
    {
      type: 'TestMessage',
      name: null,
      assertion: 'fail',
      status: 2,
    },
    {
      type: 'TestMessage',
      name: 'foo',
      assertion: 'fail',
      status: 2,
    },
  ]);
});

test('method `truthy()` asserts that value is truthy', async (t) => {
  const context = new Context<Data>();
  context.truthy(true);
  context.truthy(false, 'foo');
  t.deepEqual(context.messages, [
    {
      type: 'TestMessage',
      name: null,
      assertion: 'truthy',
      status: 1,
    },
    {
      type: 'TestMessage',
      name: 'foo',
      assertion: 'truthy',
      status: 2,
    },
  ]);
});

test('method `falsy()` asserts that value is falsy', async (t) => {
  const context = new Context<Data>();
  context.falsy('false');
  context.falsy('true', 'foo');
  t.deepEqual(context.messages, [
    {
      type: 'TestMessage',
      name: null,
      assertion: 'falsy',
      status: 1,
    },
    {
      type: 'TestMessage',
      name: 'foo',
      assertion: 'falsy',
      status: 2,
    },
  ]);
});

test('method `true()` asserts that value is true', async (t) => {
  const context = new Context<Data>();
  context.true(true);
  context.true(false, 'foo');
  t.deepEqual(context.messages, [
    {
      type: 'TestMessage',
      name: null,
      assertion: 'true',
      status: 1,
    },
    {
      type: 'TestMessage',
      name: 'foo',
      assertion: 'true',
      status: 2,
    },
  ]);
});

test('method `false()` asserts that value is false', async (t) => {
  const context = new Context<Data>();
  context.false(false);
  context.false(true, 'foo');
  t.deepEqual(context.messages, [
    {
      type: 'TestMessage',
      name: null,
      assertion: 'false',
      status: 1,
    },
    {
      type: 'TestMessage',
      name: 'foo',
      assertion: 'false',
      status: 2,
    },
  ]);
});

test('method `is()` asserts that two values are equal', async (t) => {
  const context = new Context<Data>();
  context.is('foo', 'foo');
  context.is(100, 200, 'foo');
  t.deepEqual(context.messages, [
    {
      type: 'TestMessage',
      name: null,
      assertion: 'is',
      status: 1,
    },
    {
      type: 'TestMessage',
      name: 'foo',
      assertion: 'is',
      status: 2,
    },
  ]);
});

test('method `not()` asserts that two values are not equal', async (t) => {
  const context = new Context<Data>();
  context.not('foo', 'bar');
  context.not(100, 100, 'foo');
  t.deepEqual(context.messages, [
    {
      type: 'TestMessage',
      name: null,
      assertion: 'not',
      status: 1,
    },
    {
      type: 'TestMessage',
      name: 'foo',
      assertion: 'not',
      status: 2,
    },
  ]);
});

test('method `throws()` asserts that function throws an error', async (t) => {
  const context = new Context<Data>();
  context.throws(() => { throw new Error(); });
  await context.throws(() => Promise.reject(), 'foo');
  context.throws(() => { return; }, 'foo');
  await context.throws(() => Promise.resolve());
  t.deepEqual(context.messages, [
    {
      type: 'TestMessage',
      name: null,
      assertion: 'throws',
      status: 1,
    },
    {
      type: 'TestMessage',
      name: 'foo',
      assertion: 'throws',
      status: 1,
    },
    {
      type: 'TestMessage',
      name: 'foo',
      assertion: 'throws',
      status: 2,
    },
    {
      type: 'TestMessage',
      name: null,
      assertion: 'throws',
      status: 2,
    },
  ]);
});

test('method `notThrows()` asserts that function does not throw an error', async (t) => {
  const context = new Context<Data>();
  context.notThrows(() => { return; });
  await context.notThrows(() => Promise.resolve(), 'foo');
  context.notThrows(() => { throw new Error(); }, 'foo');
  await context.notThrows(() => Promise.reject());
  t.deepEqual(context.messages, [
    {
      type: 'TestMessage',
      name: null,
      assertion: 'notThrows',
      status: 1,
    },
    {
      type: 'TestMessage',
      name: 'foo',
      assertion: 'notThrows',
      status: 1,
    },
    {
      type: 'TestMessage',
      name: 'foo',
      assertion: 'notThrows',
      status: 2,
    },
    {
      type: 'TestMessage',
      name: null,
      assertion: 'notThrows',
      status: 2,
    },
  ]);
});

test('method `regex()` asserts that string maches regular expression', async (t) => {
  const context = new Context<Data>();
  context.regex(/bar/, 'foo bar baz');
  context.regex(/zed/, 'foo bar baz', 'zed');
  t.deepEqual(context.messages, [
    {
      type: 'TestMessage',
      name: null,
      assertion: 'regex',
      status: 1,
    },
    {
      type: 'TestMessage',
      name: 'zed',
      assertion: 'regex',
      status: 2,
    },
  ]);
});

test('method `notRegex()` asserts that string does not maches regular expression', async (t) => {
  const context = new Context<Data>();
  context.notRegex(/bar/, 'foo bar baz');
  context.notRegex(/zed/, 'foo bar baz', 'zed');
  t.deepEqual(context.messages, [
    {
      type: 'TestMessage',
      name: null,
      assertion: 'notRegex',
      status: 2,
    },
    {
      type: 'TestMessage',
      name: 'zed',
      assertion: 'notRegex',
      status: 1,
    },
  ]);
});

test('method `deepEqual()` asserts that two objects are equal', async (t) => {
  const context = new Context<Data>();
  context.deepEqual({ a: 1 }, { a: 1 });
  context.deepEqual({ a: 1 }, { a: 2 }, 'foo');
  t.deepEqual(context.messages, [
    {
      type: 'TestMessage',
      name: null,
      assertion: 'deepEqual',
      status: 1,
    },
    {
      type: 'TestMessage',
      name: 'foo',
      assertion: 'deepEqual',
      status: 2,
    },
  ]);
});

test('method `notDeepEqual()` asserts that two objects are equal', async (t) => {
  const context = new Context<Data>();
  context.notDeepEqual({ a: 1 }, { a: 2 });
  context.notDeepEqual({ a: 1 }, { a: 1 }, 'foo');
  t.deepEqual(context.messages, [
    {
      type: 'TestMessage',
      name: null,
      assertion: 'notDeepEqual',
      status: 1,
    },
    {
      type: 'TestMessage',
      name: 'foo',
      assertion: 'notDeepEqual',
      status: 2,
    },
  ]);
});
