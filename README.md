# Hayspec Framework

Hayspec is a lightweight, open source, magic-free framework for testing JavaScript and NodeJS applications. It's written in [TypeScript](https://www.typescriptlang.org/) and it's actively maintained. The source code is available on [GitHub](https://github.com/hayspec/monorepo) where you can also find our [issue tracker](https://github.com/hayspec/monorepo/issues).

## Example

The framework consists of multiple packages which are described in the table below. 

```ts
import { Spec } from '@hayspec/spec';

const spec = new Spec();

spec.test('is true', async (ctx) => {
  ctx.true(true);
});

export default spec;
```

## Usage

[![Build Status](https://travis-ci.org/hayspec/monorepo.svg?branch=master)](https://travis-ci.org/hayspec/monorepo)&nbsp;[![codecov](https://codecov.io/gh/hayspec/monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/hayspec/monorepo)

| Package | Description | Version
|-|-|-
| [@hayspec/cli](https://github.com/hayspec/monorepo/tree/master/packages/hayspec-cli) | Command-line interface. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Fcli.svg)](https://badge.fury.io/js/hayspec%2Fcli)
| [@hayspec/init](https://github.com/hayspec/monorepo/tree/master/packages/hayspec-init) | Project initializer. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Finit.svg)](https://badge.fury.io/js/hayspec%2Finit)
| [@hayspec/reporter](https://github.com/hayspec/monorepo/tree/master/packages/hayspec-reporter) | Default command-line reporter. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Freporter.svg)](https://badge.fury.io/js/hayspec%2Freporter)
| [@hayspec/runner](https://github.com/hayspec/monorepo/tree/master/packages/hayspec-runner) | Helper for loading and performing test files. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Frunner.svg)](https://badge.fury.io/js/hayspec%2Frunner)
| [@hayspec/spec](https://github.com/hayspec/monorepo/tree/master/packages/hayspec-spec) | Main framework features for writing tests. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Fspec.svg)](https://badge.fury.io/js/hayspec%2Fspec)

## Installation

Start by installing the hayspec command-line tool.

```
$ npm install -g @hayspec/cli
```

## Getting started

hayspec automates the compilation and testing process of smart contracts. It tries to be as simple as possible so you can focus on your code.

### Creating a new project

Let's start by creating a new project folder.

```
$ mkdir project1
$ cd project1
```

Initialize the project and install the dependencies.

```
$ hayspec init
$ npm install
```

Run tests to verify everything works as expected.

```
$ npm test
```

## Contributing

See [CONTRIBUTING.md](https://github.com/hayspec/monorepo/blob/master/CONTRIBUTING.md) for how to help out.

## Licence

See [LICENSE](https://github.com/hayspec/monorepo/blob/master/LICENCE) for details.

## TODO

Documentation:
```
spec.spec('perform an atomic swap', perform);
perform.test(...) WORKS
```
```
perform.test(...)  DOES NOT
spec.spec('perform an atomic swap', perform);
```
Sequence matters.
