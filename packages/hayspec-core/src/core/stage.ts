/**
 * 
 */
export class Stage<Data = {}> {
  protected data: Data = {} as any;

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

}
