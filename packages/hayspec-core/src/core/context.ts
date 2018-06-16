import { Stage } from './stage';
import { TestMessage, TestStatus } from './types';

/**
 * 
 */
export class Context<Data = {}> extends Stage<Data> {
  public messages: TestMessage[] = [];

  /**
   * 
   */
  public isEqual(value: any, result: any, name?: any) {
    this.messages.push({
      type: 'TestMessage',
      name,
      assertion: 'isEqual',
      status: value === result ? TestStatus.PASS : TestStatus.FAIL,
    });
  }

  /**
   * 
   */
  public isNotEqual(value: any, result: any, name?: any) {
    this.messages.push({
      type: 'TestMessage',
      name,
      assertion: 'isNotEqual',
      status: value !== result ? TestStatus.PASS : TestStatus.FAIL,
    });
  }

  /**
   * 
   */
  public pass(name?: any) {
    this.messages.push({
      type: 'TestMessage',
      name,
      assertion: 'pass',
      status: TestStatus.PASS,
    });
  }

  /**
   * 
   */
  public fail(name?: any) {
    this.messages.push({
      type: 'TestMessage',
      name,
      assertion: 'fail',
      status: TestStatus.FAIL,
    });
  }

}
