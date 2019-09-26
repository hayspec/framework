import { Reporter } from "./reporter";
import { exec } from '../methods/exec';
import { sleep } from '../methods/sleep';
import { request, AxiosRequestConfig } from '../methods/request';

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
  public async request(config: AxiosRequestConfig) {
    return request(config);
  }

  /**
   * 
   */
  public async exec(command: string) {
    return exec(command);
  }

}
