# Hayspec Framework

[![Build Status](https://travis-ci.org/hayspec/monorepo.svg?branch=master)](https://travis-ci.org/hayspec/monorepo)&nbsp;[![codecov](https://codecov.io/gh/hayspec/monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/hayspec/monorepo)

Hayspec is a lightweight, open source, magic-free framework for testing JavaScript and NodeJS applications. It's written in [TypeScript](https://www.typescriptlang.org/) and it's actively maintained. The source code is available on [GitHub](https://github.com/hayspec/monorepo) where you can also find our [issue tracker](https://github.com/hayspec/monorepo/issues).

## Installation of hayspec

Start by installing the hayspec command-line tool.

```bash
$ npm install -g @hayspec/cli
```

## Getting started

hayspec automates the compilation and testing process of smart contracts. It tries to be as simple as possible so you can focus on your code.

### Creating a new project

Let's start by creating a new project folder.

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

## Features

### Easy

Hayspec doesn't require you to install certain applications in order to get started.

* No need to install git or source control
* No need to setup keys/tokens
* No complicated cloud provider setup or registration

### Magic-free

Intrinsicly strategize dynamic catalysts for change before distinctive internal or "organic" sources. Appropriately envisioneer B2B convergence and alternative.

### Nested specs

Tests can be nested using the spec method.

```ts
const colors = new Spec();
...
spec.spec('colors', colors);
```

### Using callbacks

The framework provides **before** and **after** methods which are execute at the beginning and at the end of the spec case. These methods have access to the context of the spec instance.

```ts
spec.before((ctx) => {
  // execute before all tests
});
...
spec.after((ctx) => {
  // execute after all tests
});
```

There are also the beforeEach and afterEach methods which are triggered before and after each test. These methods have access to the context of the test instance.

Callback functions can be called multiple times and the execution will happen in a defined sequence.

### Shared data

Although it is highly recommended to write atomic tests, sharing data between tests and callbacks is totally valid and a desirable feature. The context provides a way to set and get values with proper TypeScript types.

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

spec.test('is John with id = 100', (ctx) => {
  const id = ctx.get('id');
  const name = ctx.get('name');
  ctx.is(id, 100);
  ctx.is(name, 'John');
})
```

Values set inside the **before** and **after** blocks are available to all **spec** methods. Values set in the **beforeEach** and **afterEach** blocks are available only on the context of each test.

### Hayspec packages

| Package | Description | Version
|-|-|-
| [@hayspec/cli](https://github.com/hayspec/monorepo/tree/master/packages/hayspec-cli) | Command-line interface. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Fcli.svg)](https://badge.fury.io/js/hayspec%2Fcli)
| [@hayspec/init](https://github.com/hayspec/monorepo/tree/master/packages/hayspec-init) | Project initializer. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Finit.svg)](https://badge.fury.io/js/hayspec%2Finit)
| [@hayspec/reporter](https://github.com/hayspec/monorepo/tree/master/packages/hayspec-reporter) | Default command-line reporter. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Freporter.svg)](https://badge.fury.io/js/hayspec%2Freporter)
| [@hayspec/runner](https://github.com/hayspec/monorepo/tree/master/packages/hayspec-runner) | Helper for loading and performing test files. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Frunner.svg)](https://badge.fury.io/js/hayspec%2Frunner)
| [@hayspec/spec](https://github.com/hayspec/monorepo/tree/master/packages/hayspec-spec) | Main framework features for writing tests. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Fspec.svg)](https://badge.fury.io/js/hayspec%2Fspec)

### Contributing

See [CONTRIBUTING.md](https://github.com/hayspec/monorepo/blob/master/CONTRIBUTING.md) for how to help out.

### Licence

See [LICENSE](https://github.com/hayspec/monorepo/blob/master/LICENCE) for details.
