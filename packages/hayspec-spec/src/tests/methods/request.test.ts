import test from 'ava';
import { request } from '../../methods/request';

test('continues with timeout', async (t) => {
  const res = await request({ url: 'https://jsonplaceholder.typicode.com/todos/1' });
  t.is(res.status, 200);
  t.is(res.data.userId, 1);
});
