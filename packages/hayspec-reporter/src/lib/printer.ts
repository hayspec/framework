import * as chalk from 'chalk';

/**
 *
 */
export class Printer {
  protected muted: boolean;

  /**
   * 
   */
  public constructor({ mute = false } = {}) {
    this.muted = mute;
  }

  /**
   *
   */
  public mute() {
    this.muted = true;
  }

  /**
   *
   */
  public unmute() {
    this.muted = false;
  }

  /**
   *
   */
  public write(...input: any[]) {
    if (!this.muted) {
      process.stdout.write(input.join(''));
    }
  }

  /**
   *
   */
  public end(...input: any[]) {
    if (!this.muted) {
      this.write(...input, '\n\r');
    }
  }

  /**
   * 
   */
  public colorize(color: string, text: string | number) {
    return chalk[color](`${text}`);
  }

  /**
   * 
   */
  public indent(times: number = 1, text: string | number) {
    return `${Array(times * 3).join(' ')}${text}`;
  }

}
