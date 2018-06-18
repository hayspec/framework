/**
 *
 */
export class Printer {

  public write(...input: any[]) {
    process.stdout.write(input.join(''));
  }

  public end(...input: any[]) {
    this.write(...input, '\n\r');
  }

}
