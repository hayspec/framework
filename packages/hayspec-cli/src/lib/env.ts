import * as pt from 'path';

/**
 * Returns package.json data.
 */
export function getPackage() {
  try {
    return require(pt.join(process.cwd(), 'package.json')) || {};
  } catch (e) {
    return {};
  }
}

/**
 * Returns Hayspec options.
 */
export function getConfig(argv?: any) {
  const defaults = getPackage()['hayspec'] || {};
  const custom = argv || {};
  return {
    name: custom['name'] || defaults['name'] || '',
    description: custom['description'] || defaults['description'] || '',
    require: custom['require'] || defaults['require'] || [],
    match: custom['match'] || defaults['match'] || [],
  };
}
