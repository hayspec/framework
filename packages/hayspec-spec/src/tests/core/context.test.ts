import test from 'ava';
import { Context, Stage } from '../..';
import { Reporter } from '../../core/reporter';

const reporter = new Reporter();

interface Data {
  id: number;
  name: string;
}

test('methods `set()` and `get()` manages values', async (t) => {
  const stage = new Stage<Data>(reporter);
  const context = new Context<Data>(stage);
  context.set('id', 100);
  context.set('name', 'foo');
  const id = context.get('id'); // typescript should show `integer` type
  const name = context.get('name'); // typescript should show `string` type
  t.is(id, 100);
  t.is(name, 'foo');
});

test('methods `get()` inherits values from stage', async (t) => {
  const stage = new Stage<Data>(reporter);
  const context = new Context<Data>(stage);
  stage.set('id', 100);
  context.set('name', 'foo');
  const id = context.get('id'); // typescript should show `integer` type
  const name = context.get('name'); // typescript should show `string` type
  t.is(id, 100);
  t.is(name, 'foo');
});

test('method `pass()` passes the test', async (t) => {
  const stage = new Stage<Data>(reporter);
  const context = new Context<Data>(stage);
  const results = [
    context.pass(),
    context.pass('foo'),
  ];
  t.deepEqual(results, [
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'pass',
      success: true,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'pass',
      success: true,
    },
  ]);
});

test('method `fail()` fails the test', async (t) => {
  const stage = new Stage<Data>(reporter);
  const context = new Context<Data>(stage);
  const results = [
    context.fail(),
    context.fail('foo'),
  ];
  t.deepEqual(results, [
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'fail',
      success: false,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'fail',
      success: false,
    },
  ]);
});

test('method `truthy()` asserts that value is truthy', async (t) => {
  const stage = new Stage<Data>(reporter);
  const context = new Context<Data>(stage);
  const results = [
    context.truthy(true),
    context.truthy(false, 'foo'),
  ];
  t.deepEqual(results, [
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'truthy',
      success: true,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'truthy',
      success: false,
    },
  ]);
});

test('method `falsy()` asserts that value is falsy', async (t) => {
  const stage = new Stage<Data>(reporter);
  const context = new Context<Data>(stage);
  const results = [
    context.falsy('false'),
    context.falsy('true', 'foo'),
  ];
  t.deepEqual(results, [
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'falsy',
      success: true,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'falsy',
      success: false,
    },
  ]);
});

test('method `true()` asserts that value is true', async (t) => {
  const stage = new Stage<Data>(reporter);
  const context = new Context<Data>(stage);
  const results = [
    context.true(true),
    context.true(false, 'foo'),
  ];
  t.deepEqual(results, [
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'true',
      success: true,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'true',
      success: false,
    },
  ]);
});

test('method `false()` asserts that value is false', async (t) => {
  const stage = new Stage<Data>(reporter);
  const context = new Context<Data>(stage);
  const results = [
    context.false(false),
    context.false(true, 'foo'),
  ];
  t.deepEqual(results, [
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'false',
      success: true,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'false',
      success: false,
    },
  ]);
});

test('method `is()` asserts that two values are equal', async (t) => {
  const stage = new Stage<Data>(reporter);
  const context = new Context<Data>(stage);
  const results = [
    context.is('foo', 'foo'),
    context.is(100, 200, 'foo'),
  ];
  t.deepEqual(results, [
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'is',
      success: true,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'is',
      success: false,
    },
  ]);
});

test('method `not()` asserts that two values are not equal', async (t) => {
  const stage = new Stage<Data>(reporter);
  const context = new Context<Data>(stage);
  const results = [
    context.not('foo', 'bar'),
    context.not(100, 100, 'foo'),
  ];
  t.deepEqual(results, [
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'not',
      success: true,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'not',
      success: false,
    },
  ]);
});

test('method `throws()` asserts that function throws an error', async (t) => {
  const stage = new Stage<Data>(reporter);
  const context = new Context<Data>(stage);
  const results = [
    context.throws(() => { throw new Error(); }),
    await context.throws(() => Promise.reject(), 'foo'),
    context.throws(() => { return; }, 'foo'),
    await context.throws(() => Promise.resolve()),
  ];
  t.deepEqual(results, [
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'throws',
      success: true,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'throws',
      success: true,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'throws',
      success: false,
    },
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'throws',
      success: false,
    },
  ]);
});

test('method `notThrows()` asserts that function does not throw an error', async (t) => {
  const stage = new Stage<Data>(reporter);
  const context = new Context<Data>(stage);
  const results = [
    context.notThrows(() => { return; }),
    await context.notThrows(() => Promise.resolve(), 'foo'),
    context.notThrows(() => { throw new Error(); }, 'foo'),
    await context.notThrows(() => Promise.reject()),
  ];
  t.deepEqual(results, [
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'notThrows',
      success: true,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'notThrows',
      success: true,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'notThrows',
      success: false,
    },
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'notThrows',
      success: false,
    },
  ]);
});

test('method `regex()` asserts that string maches regular expression', async (t) => {
  const stage = new Stage<Data>(reporter);
  const context = new Context<Data>(stage);
  const results = [
    context.regex(/bar/, 'foo bar baz'),
    context.regex(/zed/, 'foo bar baz', 'zed'),
  ];
  t.deepEqual(results, [
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'regex',
      success: true,
    },
    {
      type: 'AssertionNote',
      message: 'zed',
      assertion: 'regex',
      success: false,
    },
  ]);
});

test('method `notRegex()` asserts that string does not maches regular expression', async (t) => {
  const stage = new Stage<Data>(reporter);
  const context = new Context<Data>(stage);
  const results = [
    context.notRegex(/bar/, 'foo bar baz'),
    context.notRegex(/zed/, 'foo bar baz', 'zed'),
  ];
  t.deepEqual(results, [
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'notRegex',
      success: false,
    },
    {
      type: 'AssertionNote',
      message: 'zed',
      assertion: 'notRegex',
      success: true,
    },
  ]);
});

test('method `deepEqual()` asserts that two objects are equal', async (t) => {
  const stage = new Stage<Data>(reporter);
  const context = new Context<Data>(stage);
  const results = [
    context.deepEqual({ a: 1 }, { a: 1 }),
    context.deepEqual({ a: 1 }, { a: 2 }, 'foo'),
  ];
  t.deepEqual(results, [
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'deepEqual',
      success: true,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'deepEqual',
      success: false,
    },
  ]);
});

test('method `notDeepEqual()` asserts that two objects are equal', async (t) => {
  const stage = new Stage<Data>(reporter);
  const context = new Context<Data>(stage);
  const results = [
    context.notDeepEqual({ a: 1 }, { a: 2 }),
    context.notDeepEqual({ a: 1 }, { a: 1 }, 'foo'),
  ];
  t.deepEqual(results, [
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'notDeepEqual',
      success: true,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'notDeepEqual',
      success: false,
    },
  ]);
});
