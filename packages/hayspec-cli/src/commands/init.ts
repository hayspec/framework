import * as inquirer from 'inquirer';
import { Generator } from '@hayspec/init';
import { Printer } from '@hayspec/reporter';
import { getConfig } from '../lib/env';

/**
 * Initializes project directory.
 */
export default async function (argv) {
  const { name, description } = getConfig(argv);
  const root = process.cwd();
  const printer = new Printer();

  let answers = {};
  if (!(name && description)) {
    answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "Project name:",
        default: name || 'myproject',
      },
      {
        type: 'input',
        name: 'description',
        message: "Project description:",
        default: description || '.',
      },
    ]);
  } else {
    answers = { name, description };
  }
  
  const generator = new Generator({
    root,
    name: (answers['name'] || process.cwd().split(/\\|\//).reverse()[0]).toLowerCase(),
    description: answers['description'],
  });
  try {
    printer.end();
    await generator.build();

    printer.end(
      printer.indent(1, ''),
      `Continue by running the commands below:`
    );
    printer.end(
      printer.indent(2, ''),
      printer.colorize('gray', `$ npm install`)
    );
    printer.end(
      printer.indent(2, ''),
      printer.colorize('gray', `$ npm test`)
    );
    printer.end();
    process.exit(0);
  
  } catch (e) {
    console.error(e);
    process.exit(2);
  }
}
