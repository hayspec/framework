import { Reporter, SpecStartNote, SpecEndNote, TestStartNote, TestEndNote, AssertionNote } from '@hayspec/spec';
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
  public constructor({ mute = false } = {}) {
    super();
    this.printer = new Printer({ mute });
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
        this.printer.indent(1, ''),
        this.printer.colorize('greenBright', this.passedCount),
        ' passing',
      );
    }
    if (this.skippedCount) {
      messages.push(
        this.printer.indent(1, ''),
        this.printer.colorize('yellowBright', this.skippedCount),
        ' skipped',
      );
    }
    if (this.failedCount) {
      messages.push(
        this.printer.indent(1, ''),
        this.printer.colorize('redBright', this.failedCount),
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
      this.printer.indent(this.level, ''),
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
      this.printer.indent(this.level, ''),
      this.printer.colorize('gray', note.message),
      ' ',
      skipped ? this.printer.colorize('yellowBright', '⚑ ') : '',
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
        this.printer.colorize(color, `${note.duration}ms`)
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
        this.printer.colorize('greenBright', '⚑ ')
      );
    } else {
      this.printer.write(
        this.printer.colorize('redBright', '⚑ ')
      );
    }
  }

  /**
   * 
   */
  protected getDurationColor(duration: number) {
    if (duration > 1000) {
      return 'redBright';
    } else if (duration > 500) {
      return 'yellowBright';
    } else {
      return null;
    }
  }

}
