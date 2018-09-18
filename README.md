# Hayspec Framework

[![Build Status](https://travis-ci.org/hayspec/framework.svg?branch=master)](https://travis-ci.org/hayspec/framework)&nbsp;[![codecov](https://codecov.io/gh/hayspec/framework/branch/master/graph/badge.svg)](https://codecov.io/gh/hayspec/framework)

Hayspec is a lightweight, open source, magic-free framework for testing JavaScript and NodeJS applications. It's written in [TypeScript](https://www.typescriptlang.org/) and it's actively maintained. The source code is available on [GitHub](https://github.com/hayspec/framework) where you can also find our [issue tracker](https://github.com/hayspec/framework/issues).

## Installation of Hayspec

Start by installing the hayspec command-line tool.

```bash
$ npm install -g @hayspec/cli
```

This package uses promises thus you need to use [Promise polyfill](https://github.com/taylorhakes/promise-polyfill) when promises are not supported.

## Getting started

Hayspec automates the testing process of your JavaScript or TypeScript code. It doesn't require you to install certain applications in order to get started.

The Hayspec interface is designed to fully support the power of [TypeScript](https://www.typescriptlang.org/). It is magic-free which means you have a complete control and visibility of what the code does and how tests are executed. The code should look familiar to any JavaScript or TypeScript developer.

### Project initialization

Start by creating a new project folder.

```bash
$ mkdir myProject
$ cd myProject
```

Initialize the project and install the dependencies.

```bash
$ hayspec init
$ npm install
```

Run tests to verify everything works as expected.

```bash
$ npm test
```

### Writting tests

The core test functionality is provided by the `@hayspec/spec` module which is automatically attached to your project at initialization.

#### Initializing specs

The framework provides a `Spec` class which holds basically the whole testing power. You start your test by creating an instance of that class.

```ts
import { Spec } from '@hayspec/spec';

const spec = new Spec();
```

#### Testing features

The Spec instance provide methods that you can use when writting tests. Most of the time you will use the `test` method which performs the test you write.

```ts
spec.test('is true', async (ctx) => { // promise | function
  ctx.true(true);
});
```

There is also the `skip` method which prevents a test te be performed, and the `only` method which includes itself into the test process but excludes all other tests.

#### Nested specs

Tests can be nested using the `spec` method.

```ts
const colors = new Spec();
...
spec.spec('colors', colors);
```

#### Using callbacks

The framework provides `before` and `after` methods which are execute at the beginning and at the end of the spec case.

```ts
spec.before((stage) => {
  // execute before all tests
});
...
spec.after((stage) => {
  // execute after all tests
});
```

These methods have access to the `stage` of the spec instance. The stage is global to the whole spec stack which means that all settings are always preserved.

There are also the `beforeEach` and `afterEach` methods which are triggered before and after each test. These methods have access to the `context` and `stage` of the spec. The context represents a copy of a stage and is preserved between `beforeEach`, `test` and `afterEach` methods. This allows for testing atomic tests where the context is always reset for each test.

```ts
spec.beforeEach((context, stage) => {
  // execute before all tests
});
...
spec.afterEach((context, stage) => {
  // execute after all tests
});
```
Callback functions can be called multiple times and the execution will happen in a defined sequence.

#### Shared data

The `context` and the `stage` both provide a way to `set` and `get` values with proper TypeScript types.

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

Values set inside the `before` and `after` blocks are available to all `spec` methods. Values set in the `beforeEach` and `afterEach` blocks are available only on the context stack of each test.

### Using CLI

The `@hayspec/cli` module is automatically installed when you initialize the project. You can interact with the utility using the `npx hayspec` command in your terminal. 

To get a list of available features use the `--help` flag.

```
$ npx hayspec --help
```

#### Running tests

Every test file must export the `spec` instance for the CLI to be able to detect the test.

```ts
export default spec;
```

Run the `hayspec test` command to run tests. Customize the files search by using the `--match` flag.

```
$ npx hayspec test --match ./**/*.test.*
```

#### TypeScript support

Install the [ts-node](https://www.npmjs.com/package/ts-node) NPM package then use the `--require` flag to enable [TypeScript](https://www.typescriptlang.org/) support.

```
hayspec --require ts-node/register
```

## Hayspec packages

| Package | Description | Version
|-|-|-
| [@hayspec/cli](https://github.com/hayspec/framework/tree/master/packages/hayspec-cli) | Command-line interface. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Fcli.svg)](https://badge.fury.io/js/hayspec%2Fcli)
| [@hayspec/init](https://github.com/hayspec/framework/tree/master/packages/hayspec-init) | Project initializer. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Finit.svg)](https://badge.fury.io/js/hayspec%2Finit)
| [@hayspec/reporter](https://github.com/hayspec/framework/tree/master/packages/hayspec-reporter) | Default command-line reporter. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Freporter.svg)](https://badge.fury.io/js/hayspec%2Freporter)
| [@hayspec/runner](https://github.com/hayspec/framework/tree/master/packages/hayspec-runner) | Helper for loading and performing test files. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Frunner.svg)](https://badge.fury.io/js/hayspec%2Frunner)
| [@hayspec/spec](https://github.com/hayspec/framework/tree/master/packages/hayspec-spec) | Main framework features for writing tests. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Fspec.svg)](https://badge.fury.io/js/hayspec%2Fspec)

## Contributing

See [CONTRIBUTING.md](https://github.com/hayspec/framework/blob/master/CONTRIBUTING.md) for how to help out.

## Licence

See [LICENSE](https://github.com/hayspec/framework/blob/master/LICENCE) for details.
