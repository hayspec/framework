import * as supertest from 'supertest';
import { Reporter } from "./reporter";
import sleep from '../methods/sleep';

/**
 * 
 */
export class Stage<Data = {}> {
  protected data: Data = {} as any;
  public reporter: Reporter;

  /**
   * 
   */
  public constructor (reporter: Reporter) {
    this.reporter = reporter;
  }

  /**
   * 
   */
  public set<Key extends string, Value>(k: Key, v: Value) {
    (this.data as any)[k] = v;
  }

  /**
   * 
   */
  public get<Key extends keyof Data>(k: Key) {
    return this.data[k];
  }

  /**
   * 
   */
  public async sleep(time: number) {
    return sleep(time);
  }

  /**
   * 
   */
  public request(target: any) {
    return supertest(target);
  }

}
