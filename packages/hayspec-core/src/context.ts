import { Stage } from './stage';
import { TestMessage } from './types';

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
      name: `assert ${message}`,
      passed: value === result,
    });
  }

}
