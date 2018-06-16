Inspired by http://testanything.org/.

```ts
import { Spec } from '@hayspec/core';


export interface Data {
  id?: number;
  name?: string;
}


export const colors = new Spec<Data>();

colors.test('has white doors', (context, stage) => {});

colors.test('has green doors', (context, stage) => {});


export const weights = new Spec<Data>();

weights.test('is too heavy', (context, stage) => {});

weights.test('is too light', (context, stage) => {});


export const spec = new Spec<Data>();

spec.before((stage) => {
  stage.set('id', 100);
  stage.get('id');
});

spec.beforeEach((context, stage) => {});

spec.test('has cars', (context, stage) => {});

spec.skip('has trucks', (context, stage) => {});

spec.only('has planes', (context, stage) => {});

spec.spec('colors', colors);

spec.spec('weights', weights);

spec.afterEach((context, stage) => {});

spec.after((stage) => {});


export default spec;
```
