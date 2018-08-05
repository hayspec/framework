![Build Status](https://travis-ci.org/hayspec/monorepo.svg?branch=master)&nbsp;[![NPM Version](https://badge.fury.io/js/@hayspec%2Freporter.svg)](https://badge.fury.io/js/hayspec%2Freporter)

# [@hayspec](https://github.com/hayspec/monorepo)/reporter

This package provides the default framework command-line reporter.

## Usage

The reporter is attached to the `stage` object which can be further passed into the root `Spec` instance.

```ts
import { Spec, Stage } from '@hayspec/spec';
import { Reporter } from '@hayspec/reporter';

const reporter = new Reporter();
const stage = new Stage(reporter);
const spec = new Spec(stage);

spec.test(...);
```
