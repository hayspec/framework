import { Stage } from './stage';
import { Context } from './context';
import { Reporter } from './reporter';

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
interface SpecRecipe<Data> {
  stage?: Stage<Data>;
  reporter?: Reporter;
}

/**
 * 
 */
interface TestRecipe<Data> {
  message: string;
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
  public constructor(stage?: Stage<Data>) {
    this.stage = stage ? stage : new Stage<Data>();
  }

  /**
   * 
   */
  public before(handler: StageHandler<Data>) {
    this.beforeHandlers.push(handler);
    return this;
  }

  /**
   * 
   */
  public beforeEach(handler: ContextHandler<Data>) {
    this.beforeEachHandlers.push(handler);
    return this;
  }

  /**
   * 
   */
  public after(handler: StageHandler<Data>) {
    this.afterHandlers.push(handler);
    return this;
  }

  /**
   * 
   */
  public afterEach(handler: ContextHandler<Data>) {
    this.afterEachHandlers.push(handler);
    return this;
  }

  /**
   * 
   */
  public spec(message: string, spec: Spec<Data>) {
    const handler = spec.clone();

    this.beforeHandlers.forEach((h) => handler.before(h));
    this.beforeEachHandlers.forEach((h) => handler.beforeEach(h));
    this.afterHandlers.forEach((h) => handler.after(h));
    this.afterEachHandlers.forEach((h) => handler.afterEach(h));

    this.testRecipes.push({ message, handler });

    return this;
  }

  /**
   * 
   */
  public test(message: string, handler: ContextHandler<Data>) {
    if (!this.onlyEnabled) {
      this.testRecipes.push({ message, handler });
    }
    return this;
  }

  /**
   * 
   */
  public skip(message: string, handler: ContextHandler<Data>) {
    this.testRecipes.push({ message, handler: null });
    return this;
  }

  /**
   * 
   */
  public only(message: string, handler: ContextHandler<Data>) {
    this.onlyEnabled = true;
    this.testRecipes.push({ message, handler });
    return this;
  }

  /**
   *
   */
  public clone() {
    const spec = new Spec(this.stage);
  
    this.beforeHandlers.forEach((h) => spec.before(h));
    this.afterHandlers.forEach((h) => spec.after(h));
    this.beforeEachHandlers.forEach((h) => spec.beforeEach(h));
    this.afterEachHandlers.forEach((h) => spec.afterEach(h));

    this.testRecipes.forEach((r) => {
      if (r.handler instanceof Spec) {
        spec.spec(r.message, r.handler)
      } else {
        spec.test(r.message, r.handler)
      }
    });

    return spec;
  }

  /**
   * 
   */
  public async perform() {
    await this.performBefore();

    for (const recipe of this.testRecipes) {
      if (recipe.handler instanceof Spec) {
        await this.performSpec(recipe);
      } else {
        await this.performTest(recipe);
      }
    }

    await this.performAfter();
  }

  /**
   * 
   */
  protected async performSpec(recipe: TestRecipe<Data>) {
    const start = Date.now();

    this.stage.reporter.handle({
      type: 'SpecStartNote',
      message: recipe.message,
    });

    const spec = recipe.handler as Spec<Data>;
    await spec.perform();

    this.stage.reporter.handle({
      type: 'SpecEndNote',
      duration: Date.now() - start,
    });
  }

  /**
   * 
   */
  protected async performTest(recipe: TestRecipe<Data>) {
    const start = Date.now();

    this.stage.reporter.handle({
      type: 'TestStartNote',
      message: recipe.message,
      perform: !!recipe.handler,
    });

    if (recipe.handler) {
      const context = new Context<Data>(this.stage);
      const handler = recipe.handler as ContextHandler<Data>;
      await this.performBeforeEach(context);
      await handler(context, this.stage);
      await this.performAfterEach(context);
    }

    this.stage.reporter.handle({
      type: 'TestEndNote',
      duration: Date.now() - start,
    });
  }

  /**
   * 
   */
  protected async performBefore() {
    for (const handler of this.beforeHandlers) {
      await handler(this.stage);
    }
  }

  /**
   * 
   */
  protected async performAfter() {
    for (const handler of this.afterHandlers) {
      await handler(this.stage);
    }
  }

  /**
   * 
   */
  protected async performBeforeEach(context: Context<Data>) {
    for (const handler of this.beforeEachHandlers) {
      await handler(context, this.stage);
    }
  }

  /**
   * 
   */
  protected async performAfterEach(context: Context<Data>) {
    for (const handler of this.afterEachHandlers) {
      await handler(context, this.stage);
    }
  }

};
