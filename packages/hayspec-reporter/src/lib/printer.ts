/**
 *
 */
export class Printer {

  public write(str?: string) {
    if (str) {
      process.stdout.write(str);
    }
  }

  public end(str?: string) {
    this.write(str);
    this.write('\n\r');
  }

}
