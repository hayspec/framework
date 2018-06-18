import { Reporter, SpecStartNote, SpecEndNote, TestStartNote, TestEndNote, AssertionNote } from '@hayspec/core';
import chalk from 'chalk';
import { Printer } from '../lib/printer';

/**
 * 
 */
export class DefaultReporter extends Reporter {
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
        this.getIndentSpaces(1),
        this.getColoredText('greenBright', this.passedCount),
        ' passing',
      );
    }
    if (this.skippedCount) {
      messages.push(
        this.getIndentSpaces(1),
        this.getColoredText('yellowBright', this.skippedCount),
        ' skipped',
      );
    }
    if (this.failedCount) {
      messages.push(
        this.getIndentSpaces(1),
        this.getColoredText('redBright', this.failedCount),
        ' failed',
      );
    }
    if (messages.length) {
      this.printer.end(...messages);
    }

    this.printer.end();
  }

  /**
   * 
   */
  protected onSpecStartNote(note: SpecStartNote) {
    this.printer.write(
      this.getIndentSpaces(this.level),
      note.message,
    );
    this.printer.end();
  }

  /**
   * 
   */
  protected onTestStartNote(note: TestStartNote) {
    const skipped = !note.perform;
    if (skipped) {
      this.skippedCount++;
    }

    this.printer.write(
      this.getIndentSpaces(this.level),
      '→ ',
      this.getColoredText('gray', note.message),
      ' ',
      skipped ? this.getColoredText('yellowBright', '✖ ') : '',
    );
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

    const color = this.getDurationColor(note.duration);
    if (color) {
      this.printer.write(
        this.getColoredText(color, `${note.duration}ms`)
      );
    }

    this.printer.end();
  }

  /**
   * 
   */
  protected onAssertionNote(note: AssertionNote) {
    this.assertionResults.push(note.success);

    const passing = note.success;
    if (passing) {
      this.printer.write(
        this.getColoredText('greenBright', '✓ ')
      );
    } else {
      this.printer.write(
        this.getColoredText('redBright', '✖ ')
      );
    }
  }

  /**
   * 
   */
  protected getIndentSpaces(level: number) {
    return Array(level * 3).join(' ');
  }

  /**
   * 
   */
  protected getDurationColor(duration: number) {
    if (duration > 200) {
      return 'redBright';
    } else if (duration > 100) {
      return 'yellowBright';
    } else {
      return null;
    }
  }

  /**
   * 
   */
  protected getColoredText(color: string, text: any) {
    return chalk[color](`${text}`);
  }

}
