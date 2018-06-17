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

    const performNoteHandler = (handler, args) => {
      if (typeof handler === 'function') {
        handler.call(this, ...args);
      }
    };

    if (note.type === 'SpecStartNote') {
      this.currentLevel++;
      this.specCount++;
      performNoteHandler(this.recipe.onSpecStartNote, [note]);
    } else if (note.type === 'SpecEndNote') {
      this.currentLevel--;
      performNoteHandler(this.recipe.onSpecEndNote, [note]);
    } else if (note.type === 'TestStartNote') {
      this.testCount++;
      this.currentLevel++;
      performNoteHandler(this.recipe.onTestStartNote, [note]);
    } else if (note.type === 'TestEndNote') {
      this.currentLevel--;
      performNoteHandler(this.recipe.onTestEndNote, [note]);
    } else if (note.type === 'AssertionNote') {
      this.assertionCount++;
      performNoteHandler(this.recipe.onAssertionNote, [note]);
    }

    const change = (currentLevel - this.currentLevel) as ReporterLevelChange;
    performNoteHandler(this.recipe.onNote, [note, change]);
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

}
