import test from 'ava';
import { Reporter } from '../../core/reporter';

test('triggers recipe callbacks', async (t) => {
  const stat = {
    onNote: 0,
    onSpecStartNote: 0,
    onSpecEndNote: 0,
    onTestStartNote: 0,
    onTestEndNote: 0,
    onAssertionNote: 0,
  };
  const reporter = new Reporter({
    onNote: () => stat.onNote++,
    onSpecStartNote: () => stat.onSpecStartNote++,
    onSpecEndNote: () => stat.onSpecEndNote++,
    onTestStartNote: () => stat.onTestStartNote++,
    onTestEndNote: () => stat.onTestEndNote++,
    onAssertionNote: () => stat.onAssertionNote++,
  });
  reporter.handle({
    type: 'SpecStartNote',
    message: 'foo',
  });
  reporter.handle({
    type: 'SpecEndNote',
    duration: 0,
  });
  reporter.handle({
    type: 'TestStartNote',
    message: 'foo',
    perform: true,
  });
  reporter.handle({
    type: 'TestEndNote',
    duration: 0,
  });
  reporter.handle({
    type: 'AssertionNote',
    message: 'foo',
    assertion: 'is',
    success: true,
  });
  t.deepEqual(stat, {
    onNote: 5,
    onSpecStartNote: 1,
    onSpecEndNote: 1,
    onTestStartNote: 1,
    onTestEndNote: 1,
    onAssertionNote: 1,
  });
});

test('memorizes stats', async (t) => {
  const reporter = new Reporter();
  reporter.handle({
    type: 'SpecStartNote',
    message: 'foo',
  });
  reporter.handle({
    type: 'SpecStartNote',
    message: 'foo',
  });
  reporter.handle({
    type: 'SpecStartNote',
    message: 'foo',
  });
  reporter.handle({
    type: 'TestStartNote',
    message: 'foo',
    perform: true,
  });
  reporter.handle({
    type: 'SpecEndNote',
    duration: 0,
  });
  reporter.handle({
    type: 'AssertionNote',
    message: 'foo',
    assertion: 'is',
    success: true,
  });
  t.is(reporter.specCount, 3);
  t.is(reporter.testCount, 1);
  t.is(reporter.assertionCount, 1);
  t.is(reporter.currentLevel, 3);
});
