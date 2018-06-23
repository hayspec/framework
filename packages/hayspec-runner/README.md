![Build Status](https://travis-ci.org/hayspec/runner.svg?branch=master)&nbsp;[![NPM Version](https://badge.fury.io/js/@hayspec%2Frunner.svg)](https://badge.fury.io/js/hayspec%2Frunner)&nbsp;[![Dependencies Status](https://david-dm.org/hayspec/runner.svg)](https://david-dm.org/hayspec/runner)&nbsp;

# [@hayspec](https://github.com/hayspec/monorepo)/runner

This package provides the logic for discovering and performing test files.

## Usage

The package provides the `Runner` class which can load and perform test files.

```ts
import { Spec } from '@hayspec/core';
import { Runner } from '@hayspec/runner';

const runner = new Runner();
runner.require('./foo/**/*.test.js', '!./foo/**/foo.test.js');
runner.require('./bar/*.hay.js');

const spec = new Spec();
runner.specs.forEach((folder, spec) => {
  spec.spec(filder, spec);
});
spec.perform();
```
