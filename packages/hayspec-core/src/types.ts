/**
 * 
 */
export interface SpecResult {
  type: 'SpecResult';
  name?: string;
  results: (TestResult | SpecResult)[];
}

/**
 * 
 */
export interface TestResult {
  type: 'TestResult';
  name: string;
  messages: TestMessage[];
  tests: TestResult[];
  duration: number;
}

/**
 * 
 */
export interface TestMessage {
  type: 'TestMessage';
  name: string;
  status: TestStatus;
}

/**
 * 
 */
export enum TestStatus {
  SKIP = 0,
  PASS = 1,
  FAIL = 2,
}

