/**
 * File recipe interface.
 */
export interface FileRecipe {
  path: string[];
  content: string[];
}

/**
 * Project files.
 */
export const files = [
  {
    path: ['.gitignore'],
    content: [
      `.DS_Store`,
      `.vscode`,
      `node_modules`,
      `dist`,
    ],
  },
  {
    path: ['.npmignore'],
    content: [
      `.DS_Store`,
      `.vscode`,
      `node_modules`,
    ],
  },
  {
    path: ['package.json'],
    content: [
      `{`,
      `  "name": "{{ name }}",`,
      `  "version": "0.0.0",`,
      `  "description": "{{ description }}",`,
      `  "scripts": {`,
      `    "transpile": "tsc",`,
      `    "prepare": "npm run transpile",`,
      `    "test": "hayspec test --require ts-node/register --match ./src/tests/**/*.test.ts"`,
      `  },`,
      `  "license": "MIT",`,
      `  "devDependencies": {`,
      `    "@hayspec/cli": "latest",`,
      `    "@hayspec/spec": "latest",`,
      `    "ts-node": "latest",`,
      `    "typescript": "latest"`,
      `  }`,
      `}`,
    ],
  },
  {
    path: ['src', 'index.ts'],
    content: [
      `/**`,
      ` * Example function simply returning true.`,
      ` */`,
      `export function isHay() {`,
      `  return true;`,
      `}`,
    ],
  },
  {
    path: ['src', 'tests', 'index.test.ts'],
    content: [
      `import { Spec } from '@hayspec/spec';`,
      `import * as index from '..';`,
      ``,
      `/**`,
      ` * Testing module interface.`,
      ` */`,
      ``,
      `const spec = new Spec();`,
      ``,
      `spec.test('isHay() returns true', (ctx) => {`,
      `  ctx.true(index.isHay());`,
      `});`,
      ``,
      `export default spec;`,
    ],
  },
  {
    path: ['tsconfig.json'],
    content: [
      `{`,
      `  "compilerOptions": {`,
      `    "module": "commonjs",`,
      `    "outDir": "dist",`,
      `    "target": "es6"`,
      `  }`,
      `}`,
    ],
  },
] as FileRecipe[];
