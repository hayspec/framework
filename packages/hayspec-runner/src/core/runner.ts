import { Spec } from '@hayspec/core';
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
  protected results: RunnerResult[] = [];

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
  public serialize () {
    return JSON.parse(JSON.stringify(this.results));
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
   */
  protected async loadSpec(file: string) {
    const spec = require(file);

    if (spec instanceof Spec) {
      this.results.push({ file, spec });
    } else if (spec.default instanceof Spec) {
      this.results.push({ file, spec: spec.default });
    }
  }

}
