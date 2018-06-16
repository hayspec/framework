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
  public assert(value: any, result: any, message?: any) {
    this.messages.push({
      type: 'TestMessage',
      name: `assert ${message}`,
      status: value === result ? TestStatus.PASS : TestStatus.FAIL,
    });
  }

  /**
   * 
   */
  public pass(message?: any) {
    this.messages.push({
      type: 'TestMessage',
      name: `assert ${message}`,
      status: TestStatus.PASS,
    });
  }

  /**
   * 
   */
  public fail(message?: any) {
    this.messages.push({
      type: 'TestMessage',
      name: `assert ${message}`,
      status: TestStatus.FAIL,
    });
  }

}
