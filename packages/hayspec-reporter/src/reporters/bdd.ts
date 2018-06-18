import { Reporter, SpecStartNote, SpecEndNote, TestStartNote, TestEndNote, AssertionNote } from '@hayspec/core';
import chalk from 'chalk';
import { Printer } from '../lib/printer';

/**
 * 
 */
export class BddReporter extends Reporter {
  protected printer: Printer;

  /**
   * 
   */
  public constructor() {
    super();
    this.printer = new Printer();
  }

  /**
   * 
   */
  protected onBegin() {
    this.printer.end();
  }

  /**
   * 
   */
  protected onEnd() {
    this.printer.end();
  }

  /**
   * 
   */
  protected onSpecStartNote(note: SpecStartNote) {
    this.printer.write([
      Array(this.currentLevel * 3).join(' '),
      note.message,
      ':',
    ].join(''));
    this.printer.end();
  }

  /**
   * 
   */
  protected onTestStartNote(note: TestStartNote) {
    this.printer.write([
      Array(this.currentLevel * 3).join(' '),
      '',
      chalk.gray(note.message),
      note.perform ? '' : chalk.yellowBright(' ✖'),
    ].join(''));
  }

  /**
   * 
   */
  protected onTestEndNote(note: TestEndNote) {
    this.printer.write([
      ' ',
      chalk[this.findDurationColor(note.duration)](`${note.duration}ms`),
    ].join(''));
    this.printer.end();
  }

  /**
   * 
   */
  protected onAssertionNote(note: AssertionNote) {
    this.printer.write([
      ' ',
      note.success ? chalk.greenBright('✓') : chalk.redBright('✖'),
    ].join(''));
  }

  /**
   * 
   */
  protected findDurationColor(duration: number) {
    if (duration > 100) {
      return 'redBright';
    } else if (duration > 50) {
      return 'yellowBright';
    } else {
      return 'greenBright'
    }
  }

}
