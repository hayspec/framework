import { Reporter, SpecStartNote, SpecEndNote, TestStartNote, TestEndNote, AssertionNote } from '@hayspec/core';
import chalk from 'chalk';
import { Printer } from '../lib/printer';

/**
 * 
 */
export class BddReporter extends Reporter {
  protected printer: Printer;
  protected assertionResults: boolean[] = [];
  protected passedCount: number = 0;
  protected skippedCount: number = 0;
  protected failedCount: number = 0;

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
  public reset() {
    super.reset();
    this.passedCount = 0;
    this.skippedCount = 0;
    this.failedCount = 0;
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

    const messages = [];
    if (this.passedCount) {
      messages.push(
        Array(3).join(' '),
        chalk.greenBright(`${this.passedCount}`),
        ' passing',
      );
    }
    if (this.skippedCount) {
      messages.push(
        Array(3).join(' '),
        chalk.yellowBright(`${this.skippedCount}`),
        ' skipped',
      );
    }
    if (this.failedCount) {
      messages.push(
        Array(3).join(' '),
        chalk.redBright(`${this.failedCount}`),
        ' failed',
      );
    }
    if (messages.length) {
      this.printer.end(messages.join(''));
    }

    this.printer.end();
  }

  /**
   * 
   */
  protected onSpecStartNote(note: SpecStartNote) {
    this.printer.write([
      Array(this.level * 3).join(' '),
      note.message,
      ':',
    ].join(''));
    this.printer.end();
  }

  /**
   * 
   */
  protected onSpecEndNote(note: SpecEndNote) {
  }

  /**
   * 
   */
  protected onTestStartNote(note: TestStartNote) {
    const skipped = !note.perform;
    if (skipped) {
      this.skippedCount++;
    }

    this.printer.write([
      Array(this.level * 3).join(' '),
      '→ ',
      chalk.gray(note.message),
      ' ',
      note.perform ? '' : chalk.yellowBright('✖ '),
    ].join(''));
  }

  /**
   * 
   */
  protected onTestEndNote(note: TestEndNote) {
    const passing = this.assertionResults.indexOf(false) === -1;
    if (passing) {
      this.passedCount++;
    } else {
      this.failedCount++;
    }
    this.assertionResults = [];

    this.printer.write([
      chalk[this.findDurationColor(note.duration)](`${note.duration}ms`),
    ].join(''));
    this.printer.end();
  }

  /**
   * 
   */
  protected onAssertionNote(note: AssertionNote) {
    this.assertionResults.push(note.success);

    this.printer.write([
      note.success ? chalk.greenBright('✓ ') : chalk.redBright('✖ '),
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
