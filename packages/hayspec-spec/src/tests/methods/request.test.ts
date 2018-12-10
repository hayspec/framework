import test from 'ava';
import { request } from '../../methods/request';

test('performs a http request', async (t) => {
  const res = await request({ url: 'https://jsonplaceholder.typicode.com/todos/1' });
  t.is(res.status, 200);
  t.is(res.data.userId, 1);
});

test('handles errors', async (t) => {
  const res = await request({ url: 'https://jsonplaceholder.typicode.com/foo', method: 'post' });
  t.is(res.status, 404);
});
