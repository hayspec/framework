import { SpecStartNote, SpecEndNote, TestStartNote, TestEndNote, AssertionNote } from './types';

/**
 * 
 */
export type ReporterNote = SpecStartNote | SpecEndNote | TestStartNote | TestEndNote | AssertionNote;

/**
 * 
 */
export interface ReporterRecipe {
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
  public currentLevel: number = 0;
  public specCount: number = 0;
  public testCount: number = 0;
  public assertionCount: number = 0;

  /**
   * 
   */
  public constructor(recipe?: ReporterRecipe) {
    this.recipe = recipe || {};
  }

  /**
   * 
   */
  public handle(note: ReporterNote) {
    const currentLevel = this.currentLevel;

    if (note.type === 'SpecStartNote') {
      this.currentLevel++;
      this.specCount++;
      this.onSpecStartNote(note);
    } else if (note.type === 'SpecEndNote') {
      this.currentLevel--;
      this.onSpecEndNote(note);
    } else if (note.type === 'TestStartNote') {
      this.testCount++;
      this.currentLevel++;
      this.onTestStartNote(note);
    } else if (note.type === 'TestEndNote') {
      this.currentLevel--;
      this.onTestEndNote(note);
    } else if (note.type === 'AssertionNote') {
      this.assertionCount++;
      this.onAssertionNote(note);
    }

    const change = (currentLevel - this.currentLevel) as ReporterLevelChange;
    this.onNote(note, change);
  }

  /**
   * 
   */
  public reset() {
    this.currentLevel = 0;
    this.specCount = 0;
    this.testCount = 0;
    this.assertionCount = 0;  
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
