# Hayspec Framework

Hayspec is a lightweight, open source, magic-free framework for testing JavaScript and NodeJS applications. It's written in [TypeScript](https://www.typescriptlang.org/) and it's actively maintained. The source code is available on [GitHub](https://github.com/hayspec/monorepo) where you can also find our [issue tracker](https://github.com/hayspec/monorepo/issues).

## Example

The framework consists of multiple packages which are described in the table below. 

```ts
import { Spec } from '@hayspec/core';

const spec = new Spec();

spec.test('is true', async (ctx) => {
  ctx.true(true);
});

export default spec;
```

## Usage

| Package | Description | Version
|-|-|-
| [@hayspec/core](https://github.com/hayspec/monorepo/tree/master/packages/hayspec-core) | Main framework features for writing automatic tests. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Fcore.svg)](https://badge.fury.io/js/hayspec%2Fcore)
| [@hayspec/cli](https://github.com/hayspec/monorepo/tree/master/packages/hayspec-cli) | Command-line interface. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Fcli.svg)](https://badge.fury.io/js/hayspec%2Fcli)
| [@hayspec/reporter](https://github.com/hayspec/monorepo/tree/master/packages/hayspec-reporter) | Default command-line reporter. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Freporter.svg)](https://badge.fury.io/js/hayspec%2Freporter)
| [@hayspec/runner](https://github.com/hayspec/monorepo/tree/master/packages/hayspec-runner) | Helper for loading and performing test files. | [![NPM Version](https://badge.fury.io/js/@hayspec%2Frunner.svg)](https://badge.fury.io/js/hayspec%2Frunner)

Don't know where to start? See the [example](https://github.com/hayspec/monorepo/tree/master/packages/hayspec-example).

## Contributing

See [CONTRIBUTING.md](https://github.com/hayspec/monorepo/blob/master/CONTRIBUTING.md) for how to help out.

## Licence

See [LICENSE](https://github.com/hayspec/monorepo/blob/master/LICENCE) for details.
