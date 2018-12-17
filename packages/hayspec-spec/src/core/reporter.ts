import { SpecStartNote, SpecEndNote, TestStartNote, TestEndNote, AssertionNote } from './types';

/**
 * 
 */
export type ReporterNote = SpecStartNote | SpecEndNote | TestStartNote | TestEndNote | AssertionNote;

/**
 * 
 */
export interface ReporterRecipe {
  onBegin?: () => void;
  onEnd?: () => void;
  onNote?: (note: ReporterNote, change: ReporterLevelChange) => void;
  onSpecStartNote?: (note: SpecStartNote) => void;
  onSpecEndNote?: (note: SpecEndNote) => void;
  onTestStartNote?: (note: TestStartNote) => void;
  onTestEndNote?: (note: TestEndNote) => void;
  onAssertionNote?: (note: AssertionNote) => void;
}

/**
 * 
 */
export type ReporterLevelChange = -1 | 0 | 1;

/**
 * 
 */
export class Reporter {
  protected recipe: ReporterRecipe;
  public level: number = 0;

  /**
   * 
   */
  public constructor(recipe?: ReporterRecipe) {
    this.recipe = recipe || {};
  }

  /**
   * 
   */
  public begin() {
    this.onBegin();
  }

  /**
   * 
   */
  public end() {
    this.onEnd();
  }

  /**
   * 
   */
  public note(note: ReporterNote) {
    const level = this.level;

    if (note.type === 'SpecStartNote') {
      this.level++;
      this.onSpecStartNote(note);
    }
    else if (note.type === 'SpecEndNote') {
      this.level--;
      this.onSpecEndNote(note);
    }
    else if (note.type === 'TestStartNote') {
      this.level++;
      this.onTestStartNote(note);
    }
    else if (note.type === 'TestEndNote') {
      this.level--;
      this.onTestEndNote(note);
    }
    else if (note.type === 'AssertionNote') {
      this.onAssertionNote(note);
    }

    const change = (level - this.level) as ReporterLevelChange;
    this.onNote(note, change);
  }

  /**
   * 
   */
  public reset() {
    this.level = 0;
  }

  /**
   * 
   */
  protected onBegin() {
    if (typeof this.recipe.onBegin === 'function') {
      this.recipe.onBegin();
    }
  }

  /**
   * 
   */
  protected onEnd() {
    if (typeof this.recipe.onEnd === 'function') {
      this.recipe.onEnd();
    }
  }

  /**
   * 
   */
  protected onSpecStartNote(note: SpecStartNote) {
    if (typeof this.recipe.onSpecStartNote === 'function') {
      this.recipe.onSpecStartNote(note);
    }
  }

  /**
   * 
   */
  protected onSpecEndNote(note: SpecEndNote) {
    if (typeof this.recipe.onSpecEndNote === 'function') {
      this.recipe.onSpecEndNote(note);
    }
  }

  /**
   * 
   */
  protected onTestStartNote(note: TestStartNote) {
    if (typeof this.recipe.onTestStartNote === 'function') {
      this.recipe.onTestStartNote(note);
    }
  }

  /**
   * 
   */
  protected onTestEndNote(note: TestEndNote) {
    if (typeof this.recipe.onTestEndNote === 'function') {
      this.recipe.onTestEndNote(note);
    }
  }

  /**
   * 
   */
  protected onAssertionNote(note: AssertionNote) {
    if (typeof this.recipe.onAssertionNote === 'function') {
      this.recipe.onAssertionNote(note);
    }
  }

  /**
   * 
   */
  protected onNote(note: ReporterNote, change: ReporterLevelChange) {
    if (typeof this.recipe.onNote === 'function') {
      this.recipe.onNote(note, change);
    }
  }

}
