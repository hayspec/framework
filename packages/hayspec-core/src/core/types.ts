/**
 * 
 */
export interface SpecStartNote {
  type: 'SpecStartNote';
  message: string;
}

/**
 * 
 */
export interface SpecEndNote {
  type: 'SpecEndNote';
  duration: number;
}

/**
 * 
 */
export interface TestStartNote {
  type: 'TestStartNote';
  message: string;
  perform: boolean;
}

/**
 * 
 */
export interface TestEndNote {
  type: 'TestEndNote';
  duration: number;
}

/**
 * 
 */
export interface AssertionNote {
  type: 'AssertionNote';
  message: string;
  assertion: string;
  success: boolean;
}
