import test from 'ava';
import { Stage } from '../..';

interface Data {
  id: number;
  name: string;
}

test('sets and gets values', async (t) => {
  const stage = new Stage<Data>();
  stage.set('id', 100);
  stage.set('name', 'foo');
  const id = stage.get('id'); // typescript should show `integer` type
  const name = stage.get('name'); // typescript should show `string` type
  t.is(id, 100);
  t.is(name, 'foo');
});
