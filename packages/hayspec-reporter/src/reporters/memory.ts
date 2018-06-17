import { Reporter, ReporterNote } from '@hayspec/core';

/**
 * 
 */
export class MemoryReporter implements Reporter {
  protected notes: ReporterNote[] = [];
  protected level: number = 0;
  public report

  /**
   * 
   */
  public handle(input: ReporterNote) {

    this.notes.push(input);
  }

  /**
   * 
   */
  public serialize() {
    // const report: MemoryBlock[] = [];
    let level = 0;

    this.notes.forEach((note) => {

      if (note.type === 'SpecStartNote') {
        level++;
      } else if (note.type === 'SpecEndNote') {
        level--;
      } else if (note.type === 'TestStartNote') {
        level++;
      } else if (note.type === 'TestEndNote') {
        level--;
      } else if (note.type === 'AssertionNote') {
        //
      }

      console.log(level, note.type);
    });
  }

}
