```ts
import { Spec, Stage } from '@hayspec/core';
import { Reporter } from '@hayspec/reporter';

const reporter = new Reporter();
const stage = new Stage(reporter);
const spec = new Spec(stage);

spec.test(...);
```
