![Build Status](https://travis-ci.org/hayspec/framework.svg?branch=master)&nbsp;[![NPM Version](https://badge.fury.io/js/@hayspec%2Frunner.svg)](https://badge.fury.io/js/%40hayspec%2Frunner)

This package provides the logic for discovering and performing test files. It's included in the Hayspec CLI, but you can use it to run tests directly from your NodeJS application.

```ts
import { Spec } from '@hayspec/spec';
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
