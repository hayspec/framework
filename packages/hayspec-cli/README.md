![Build Status](https://travis-ci.org/hayspec/cli.svg?branch=master)&nbsp;[![NPM Version](https://badge.fury.io/js/@hayspec%2Fcli.svg)](https://badge.fury.io/js/hayspec%2Fcli)&nbsp;[![Dependencies Status](https://david-dm.org/hayspec/cli.svg)](https://david-dm.org/hayspec/cli)&nbsp;

# [@hayspec](https://github.com/hayspec/monorepo)/cli

This package provides a command-line interface for running automated tests.

## Installation

Run the command below to install the package.

```
npm install -g @hayspec/cli
```

## Usage

After you successfully install the NPM package the `hayspec` command will become available in your terminal. You can use the `--help` command to display all the features.

### Running tests

To test the command, create a test file `./src/tests/index.test.js` and run the `hayspec` command. Use can customize the search scode by using the `--match` flag.

```
hayspec --match ./src/tests/**/*.test.*
```

Note that the test file must export the `spec` instance for the runner to be able to detect the test.

```ts
export default spec;
```

### TypeScript support

Install the [ts-node](https://www.npmjs.com/package/ts-node) NPM package then use the `--require` flag to enable [TypeScript](https://www.typescriptlang.org/) support.

```
hayspec --require ts-node/register
```
