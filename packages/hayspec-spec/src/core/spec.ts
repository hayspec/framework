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
interface PerformRecipes<Data> {
  message: string;
  handler?: ContextHandler<Data>
  spec?: Spec<Data>;
}

/**
 * 
 */
export class Spec<Data = {}> {
  protected beforeHandlers: StageHandler<Data>[] = [];
  protected beforeEachHandlers: ContextHandler<Data>[] = [];
  protected afterHandlers: StageHandler<Data>[] = [];
  protected afterEachHandlers: ContextHandler<Data>[] = [];
  protected performRecipes: PerformRecipes<Data>[] = [];
  protected onlyEnabled: boolean = false;
  protected _stage: Stage<Data>;
  public parent: Spec<Data>;

  /**
   * 
   */
  public constructor(stage?: Stage<Data>, parent?: Spec<Data>) {
    this.parent = parent || null;
    this.stage = stage || this.createStage();
  }

  /**
   * 
   */
  public set stage(s: Stage<Data>) {
    if (this.parent) {
      this.parent.stage = s;
    } else {
      this._stage = s;
    }
  }

  /**
   * 
   */
  public get stage() {
    if (this.parent) {
      return this.parent.stage;
    } else {
      return this._stage;
    }
  }

  /**
   * 
   */
  public isRoot() {
    return !this.parent;
  }

  /**
   * 
   */
  public before(handler: StageHandler<Data>, append: boolean = true) {
    if (append) {
      this.beforeHandlers.push(handler);
    } else {
      this.beforeHandlers.unshift(handler);
    }
    return this;
  }

  /**
   * 
   */
  public beforeEach(handler: ContextHandler<Data>, append: boolean = true) {
    if (append) {
      this.beforeEachHandlers.push(handler);
    } else {
      this.beforeEachHandlers.unshift(handler);
    }
    return this;
  }

  /**
   * 
   */
  public after(handler: StageHandler<Data>, append: boolean = true) {
    if (append) {
      this.afterHandlers.push(handler);
    } else {
      this.afterHandlers.unshift(handler);
    }
    return this;
  }

  /**
   * 
   */
  public afterEach(handler: ContextHandler<Data>, append: boolean = true) {
    if (append) {
      this.afterEachHandlers.push(handler);
    } else {
      this.afterEachHandlers.unshift(handler);
    }
    return this;
  }

  /**
   * 
   */
  public spec(message: string, spec: Spec<Data>) {
    spec.parent = this;
    spec.stage = this.stage;
  
    this.beforeHandlers.forEach((h) => spec.before(h, false));
    this.beforeEachHandlers.forEach((h) => spec.beforeEach(h, false));
    this.afterHandlers.forEach((h) => spec.after(h));
    this.afterEachHandlers.forEach((h) => spec.afterEach(h));
    this.performRecipes.push({ message, spec });

    return this;
  }

  /**
   * 
   */
  public test(message: string, handler: ContextHandler<Data>) {
    if (!this.onlyEnabled) {
      this.performRecipes.push({ message, handler });
    }
    return this;
  }

  /**
   * 
   */
  public skip(message: string, handler?: ContextHandler<Data>) {
    this.performRecipes.push({ message, handler: null });
    return this;
  }

  /**
   * 
   */
  public only(message: string, handler: ContextHandler<Data>) {
    this.onlyEnabled = true;
    this.performRecipes.push({ message, handler });
    return this;
  }

  /**
   * 
   */
  public async perform() {
    await this.performBegin();
    await this.performBefore();

    for (const recipe of this.performRecipes) {
      if (recipe.spec) {
        await this.performSpec(recipe);
      } else {
        await this.performTest(recipe);
      }
    }

    await this.performAfter();
    await this.performEnd();
  }

  /**
   * 
   */
  protected async performBegin() {
    if (this.isRoot()) {
      this.stage.reporter.begin();
    }
  }

  /**
   * 
   */
  protected async performEnd() {
    if (this.isRoot()) {
      this.stage.reporter.end();
    }
  }

  /**
   * 
   */
  protected async performSpec(recipe: PerformRecipes<Data>) {
    const start = Date.now();

    this.stage.reporter.note({
      type: 'SpecStartNote',
      message: recipe.message,
    });

    await recipe.spec.perform();

    this.stage.reporter.note({
      type: 'SpecEndNote',
      duration: Date.now() - start,
    });
  }

  /**
   * 
   */
  protected async performTest(recipe: PerformRecipes<Data>) {
    const start = Date.now();

    this.stage.reporter.note({
      type: 'TestStartNote',
      message: recipe.message,
      perform: !!recipe.handler,
    });

    if (recipe.handler) {
      const context = this.createContext();
      await this.performBeforeEach(context);
      await recipe.handler(context, this.stage);
      await this.performAfterEach(context);
    }

    this.stage.reporter.note({
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

  /**
   * 
   */
  protected createStage() {
    const reporter = new Reporter();
    return new Stage<Data>(reporter);
  }

  /**
   * 
   */
  protected createContext() {
    return new Context<Data>(this.stage);
  }

};
