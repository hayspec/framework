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
