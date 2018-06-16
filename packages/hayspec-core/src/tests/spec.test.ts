import test from 'ava';
import { Spec } from '..';

interface Data {
  id: number;
  name: string;
}

test('handles nested `describe` blocks', async (t) => {
  const spec1 = new Spec<Data>();
  spec1.test('foo1', (context, stage) => {
    stage.set('id', 100);
    const id = stage.get('id');
    context.assert(1, 0, 'foo1')
  });
  spec1.test('bar1', (context) => {
    context.assert(1, 0, 'bar1')
  });

  const spec0 = new Spec<Data>();
  spec0.test('foo0', (context, stage) => {
    context.assert(1, 0, 'foo0A')
    context.assert(1, 1, 'foo0B')
  });
  spec0.spec('spec1', spec1);
  spec0.test('bar0', (context, stage) => {
    context.assert(1, 0, 'bar0')
  });

  const data = await spec0.perform();
  console.log(JSON.stringify(data, null, 2));

  t.pass();
});
