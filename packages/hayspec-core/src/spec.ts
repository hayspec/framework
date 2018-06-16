import { Stage } from './stage';
import { Context } from './context';
import { SpecResult, TestResult } from './types';

/**
 * 
 */
type StageHandler<Data> = (stage: Stage<Data>) => (void | Promise<void>);

/**
 * 
 */
type ContextHandler<Data> = (context: Context<Data>, stage: Stage<Data>) => (void | Promise<void>);

/**
 * 
 */
interface TestRecipe<Data> {
  name: string;
  handler: ContextHandler<Data> | Spec<Data>;
}

/**
 * 
 */
export class Spec<Data = {}> {
  protected beforeHandlers: StageHandler<Data>[] = [];
  protected beforeEachHandlers: ContextHandler<Data>[] = [];
  protected afterHandlers: StageHandler<Data>[] = [];
  protected afterEachHandlers: ContextHandler<Data>[] = [];
  protected testRecipes: TestRecipe<Data>[] = [];
  protected onlyEnabled: boolean = false;
  protected stage: Stage<Data> = null;

  /**
   * 
   */
  public constructor (stage?: Stage<Data>) {
    this.stage = stage || new Stage();
  }

  /**
   * 
   */
  public before (handler: StageHandler<Data>) {
    this.beforeHandlers.push(handler);
    return this;
  }

  /**
   * 
   */
  public beforeEach (handler: ContextHandler<Data>) {
    this.beforeEachHandlers.push(handler);
    return this;
  }

  /**
   * 
   */
  public after (handler: StageHandler<Data>) {
    this.afterHandlers.push(handler);
    return this;
  }

  /**
   * 
   */
  public afterEach (handler: ContextHandler<Data>) {
    this.afterEachHandlers.push(handler);
    return this;
  }

  /**
   * 
   */
  public spec (name: string, spec: Spec<Data>) {
    const sub = spec.clone();

    this.beforeHandlers.forEach((h) => sub.before(h));
    this.beforeEachHandlers.forEach((h) => sub.beforeEach(h));
    this.afterHandlers.forEach((h) => sub.after(h));
    this.afterEachHandlers.forEach((h) => sub.afterEach(h));

    this.testRecipes.push({ name, handler: sub });

    return this;
  }

  /**
   * 
   */
  public test (name: string, handler: ContextHandler<Data>) {
    if (!this.onlyEnabled) {
      this.testRecipes.push({ name, handler });
    }
    return this;
  }

  /**
   * 
   */
  public skip (name: string, handler: ContextHandler<Data>) {
    this.testRecipes.push({ name, handler });
    return this;
  }

  /**
   * 
   */
  public only (name: string, handler: ContextHandler<Data>) {
    this.onlyEnabled = true;
    this.testRecipes.push({ name, handler });
    return this;
  }

  /**
   *
   */
  public clone () {
    const spec = new Spec(this.stage);
  
    this.beforeHandlers.forEach((h) => spec.before(h));
    this.afterHandlers.forEach((h) => spec.after(h));
    this.beforeEachHandlers.forEach((h) => spec.beforeEach(h));
    this.afterEachHandlers.forEach((h) => spec.afterEach(h));

    this.testRecipes.forEach((r) => {
      if (r.handler instanceof Spec) {
        spec.spec(r.name, r.handler)
      } else {
        spec.test(r.name, r.handler)
      }
    });

    return spec;
  }

  /**
   * 
   */
  public async perform () {
    const results: (TestResult | SpecResult)[] = [];

    await this.performBefore();
    results.push(
      ...await this.performBatch(this.testRecipes)
    );
    await this.performAfter();

    return {
      type: 'SpecResult',
      results
    } as SpecResult;
  }

  /**
   * 
   */
  protected async performBatch (handlers: TestRecipe<Data>[]) {
    const results: (TestResult | SpecResult)[] = [];

    for (const handler of handlers) {
      const test = await this.performOne(handler);
      results.push(test);
    }

    return results;
  }

  /**
   * 
   */
  protected async performOne (handler: TestRecipe<Data>) {
    if (handler.handler instanceof Spec) {
      return await handler.handler.perform();
    } else {
      const context = new Context<Data>();
      await this.performBeforeEach(context);
      await handler.handler(context, this.stage);
      await this.performAfterEach(context);
      return {
        type: 'TestResult',
        name: handler.name,
        messages: context.messages,
      } as TestResult;
    }
  }

  /**
   * 
   */
  protected async performBefore () {
    for (const before of this.beforeHandlers) {
      await before(this.stage);
    }
  }

  /**
   * 
   */
  protected async performAfter () {
    for (const after of this.afterHandlers) {
      await after(this.stage);
    }
  }

  /**
   * 
   */
  protected async performBeforeEach (context: Context<Data>) {
    for (const beforeEach of this.beforeEachHandlers) {
      await beforeEach(context, this.stage);
    }
  }

  /**
   * 
   */
  protected async performAfterEach (context: Context<Data>) {
    for (const afterEach of this.afterEachHandlers) {
      await afterEach(context, this.stage);
    }
  }

};
