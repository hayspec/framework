import { Stage } from './stage';
import { TestMessage, TestStatus } from './types';
import truthy from '../asserts/truthy';
import is from '../asserts/is';
import throws from '../asserts/throws';

/**
 * 
 */
export class Context<Data = {}> extends Stage<Data> {
  readonly messages: TestMessage[] = [];

  /**
   * 
   */
  public pass(name?: string) {
    this.messages.push(
      this.formatMessage('pass', true, name)
    );
  }

  /**
   * 
   */
  public fail(name?: any) {
    this.messages.push(
      this.formatMessage('fail', false, name)
    );
  }

  /**
   * 
   */
  public truthy(value: any, name?: any) {
    this.messages.push(
      this.formatMessage('truthy', truthy(value), name)
    );
  }

  /**
   * 
   */
  public falsy(value: any, name?: any) {
    this.messages.push(
      this.formatMessage('falsy', !truthy(value), name)
    );
  }

  /**
   * 
   */
  public true(value: any, name?: any) {
    this.messages.push(
      this.formatMessage('true', !!value, name)
    );
  }

  /**
   * 
   */
  public false(value: any, name?: any) {
    this.messages.push(
      this.formatMessage('false', !value, name)
    );
  }

  /**
   * 
   */
  public is(value: any, expected: any, name?: any) {
    this.messages.push(
      this.formatMessage('is', is(value, expected), name)
    );
  }

  /**
   * 
   */
  public not(value: any, expected: any, name?: any) {
    this.messages.push(
      this.formatMessage('not', !is(value, expected), name)
    );
  }

  /**
   * 
   */
  public throws(fn: () => any, name?: any) {
    const res = throws(fn);

    if (res instanceof Promise) {
      return res.then((res) => {
        this.messages.push(
          this.formatMessage('throws', res, name)
        );    
      });
    }
    else {
      this.messages.push(
        this.formatMessage('throws', res, name)
      );
    }
  }

  /**
   * 
   */
  public notThrows(fn: () => any, name?: any) {
    const res = throws(fn);

    if (res instanceof Promise) {
      return res.then((res) => {
        this.messages.push(
          this.formatMessage('notThrows', !res, name)
        );    
      });
    }
    else {
      this.messages.push(
        this.formatMessage('notThrows', !res, name)
      );
    }
  }

  /**
   * 
   */
  public regex(exp: RegExp, value: string, name?: any) {
    this.messages.push(
      this.formatMessage('regex', exp.test(value), name)
    );
  }

  /**
   * 
   */
  public notRegex(exp: RegExp, value: string, name?: any) {
    this.messages.push(
      this.formatMessage('notRegex', !exp.test(value), name)
    );
  }

  // deepEqual
  // netDeepEqual

  /**
   * 
   */
  protected formatMessage(assertion: string, success: boolean, name: string) {
    return {
      type: 'TestMessage',
      name: name || null,
      assertion,
      status: success ? TestStatus.PASS : TestStatus.FAIL,
    } as TestMessage;
  }

}
