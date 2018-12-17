import { Spec } from '@hayspec/spec';
import * as glob from 'fast-glob';

/**
 *
 */
export interface RunnerResult {
  file: string;
  spec: Spec;
}

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
  protected onlyEnabled: boolean = false;
  public results: RunnerResult[] = [];

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
      const spec = this.loadSpec(file);

      if (!spec) {
        return;
      }
      else if (spec.spec.hasOnly() && !this.onlyEnabled) {
        this.onlyEnabled = true;
        this.results = [];
      }

      if (this.onlyEnabled && spec.spec.hasOnly()) {
        this.results.push(spec);
      }
      else if (!this.onlyEnabled) {
        this.results.push(spec);
      }

    });
  }

  /**
   *
   */
  public clear () {
    this.results = [];
    return this;
  }

  /**
   * 
   * NOTE: Due to different NPM package managers, the `instanceof` check my be
   * inconsistent thus the function checks for presence of the `test` method.
   */
  protected loadSpec(file: string) {
    const spec = require(file);

    if (spec instanceof Spec) {
      return { file, spec };
    } else if (spec.default  instanceof Spec) {
      return { file, spec: spec.default };
    }
    else {
      return null;
    }
  }

}
