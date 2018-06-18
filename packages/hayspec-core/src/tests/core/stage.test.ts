import test from 'ava';
import { Stage } from '../..';
import { Reporter } from '../../core/reporter';

const reporter = new Reporter();

interface Data {
  id: number;
  name: string;
}

test('methods `set()` and `get()` manages values', async (t) => {
  const stage = new Stage<Data>(reporter);
  stage.set('id', 100);
  stage.set('name', 'foo');
  const id = stage.get('id'); // typescript should show `integer` type
  const name = stage.get('name'); // typescript should show `string` type
  t.is(id, 100);
  t.is(name, 'foo');
});
