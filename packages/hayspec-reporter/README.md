![Build Status](https://travis-ci.org/hayspec/reporter.svg?branch=master)&nbsp;[![NPM Version](https://badge.fury.io/js/@hayspec%2Freporter.svg)](https://badge.fury.io/js/hayspec%2Freporter)&nbsp;[![Dependencies Status](https://david-dm.org/hayspec/reporter.svg)](https://david-dm.org/hayspec/reporter)&nbsp;

# [@hayspec](https://github.com/hayspec/monorepo)/reporter

This package provides the default framework command-line reporter.

## Usage

The reporter is attached to the `stage` object which can be further passed into the root `Spec` instance.

```ts
import { Spec, Stage } from '@hayspec/core';
import { Reporter } from '@hayspec/reporter';

const reporter = new Reporter();
const stage = new Stage(reporter);
const spec = new Spec(stage);

spec.test(...);
```
