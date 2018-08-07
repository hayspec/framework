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

}
