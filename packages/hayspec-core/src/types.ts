/**
 * 
 */
export interface TestResult {
  name: string;
  messages: TestMessage[];
}

/**
 * 
 */
export interface TestMessage {
  name: string;
  passed: boolean;
}
