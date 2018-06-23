![Build Status](https://travis-ci.org/hayspec/core.svg?branch=master)&nbsp;[![NPM Version](https://badge.fury.io/js/@hayspec%2Fcore.svg)](https://badge.fury.io/js/hayspec%2Fcore)&nbsp;[![Dependencies Status](https://david-dm.org/hayspec/core.svg)](https://david-dm.org/hayspec/core)&nbsp;

# [@hayspec](https://github.com/hayspec/monorepo)/core

This package provides the main framework features for writing automatic tests.

## Installation

Run the command below to install the package.

```
npm install --save @hayspec/core
```

This package uses promises thus you need to use [Promise polyfill](https://github.com/taylorhakes/promise-polyfill) when promises are not supported.

## Usage

The Hayspec interface is designed to fully support the power of [TypeScript](https://www.typescriptlang.org/). It is magic-free which means you have a complete control and visibility of what the code does and how tests are executed.

Below we explain some of the most important parts of this framework. You should check the API section to see a complete list of features. 

### Initializing specs

The framework provides a `Spec` class which holds basically the whole testing power. You start your test by creating an instance of that class.

```ts
import { Spec } from '@hayspec/core';

const spec = new Spec();
```

### Writting tests

The Spec instance provide methods that you can use when writting tests. Most of the time you will use the `test` method which performs the test you write.

```ts
spec.test('is true', async (ctx) => {
  ctx.true(true);
});
```

There is also the `skip` method which prevents a test te be performed, and the `only` method which includes itself into the test process but excludes all other tests.

### Nested specs

Tests can be nested using the `spec` method.

```ts
const colors = new Spec();
...
spec.spec('colors', colors);
```

### Using callbacks

The framework provides `before` and `after` methods which are execute at the beginning and at the end of the spec case. These methods have access to the context of the spec instance.

```ts
spec.before((ctx) => {
  // execute before all tests
});
...
spec.after((ctx) => {
  // execute after all tests
});
```

There are also the `beforeEach` and `afterEach` methods which are triggered before and after each test. These methods have access to the context of the test instance.

Callback functions can be called multiple times and the execution will happen in a defined sequence.

### Shared data

Although it is highly recommended to write atomic tests, sharing data between tests and callbacks is totally valid and a desirable feature. The context provides a way to `set` and `get` values with proper TypeScript types.

```ts
interface Data {
  id: number;
  name: string;
}

const spec = new Spec<Data>();

spec.beforeEach((ctx) => {
  ctx.set('id', 100);
  ctx.set('name', 'John');
})

spec.test('is John with id=100', (ctx) => {
  const id = ctx.get('id');
  const name = ctx.get('name');
  ctx.is(id, 100);
  ctx.is(name, 'John');
})
```

Values set inside the `before` and `after` blocks are available to all `spec` methods. Values set in the `beforeEach` and `afterEach` blocks are available only on the context of each test.
