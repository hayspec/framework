import { Spec } from '@hayspec/core';
import * as glob from 'fast-glob';

/**
 *
 */
export interface RunnerOptions {
  cwd?: string;
  deep?: boolean;
  dot?: boolean;
}

 /**
 *
 */
export class Runner {
  protected options: RunnerOptions;
  public specs: Spec[] = [];

  /**
   * 
   */
  public constructor(options?: RunnerOptions) {
    this.options = {
      cwd: process.cwd(),
      deep: true,
      dot: false,
      ...options,
    };
  }

  /**
   * 
   */
  public async require(...patterns: string[]) {
    const options = {
      absolute: true,
      ...this.options,
    };
    const files = await glob(patterns, options) as string[];

    files.forEach((file) => {
      this.loadSpec(file);
    });
  }

  /**
   * 
   */
  public async loadSpec(file: string) {
    const def = require(file);

    if (def instanceof Spec) {
      this.specs.push(def);
    } else if (def.default instanceof Spec) {
      this.specs.push(def.default);
    }
  }

}
