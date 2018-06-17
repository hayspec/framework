import { SpecStartNote, SpecEndNote, TestStartNote, TestEndNote, AssertionNote } from './types';

/**
 * 
 */
export type ReporterNote = SpecStartNote | SpecEndNote | TestStartNote | TestEndNote | AssertionNote;

/**
 * 
 */
export class Reporter {

  /**
   * 
   */
  public handle(input: ReporterNote) {
    console.log(JSON.stringify(input));
  }

}
