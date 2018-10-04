import * as pt from 'path';

export function getConfig(argv?: any) {
  const defaults = require(pt.join(process.cwd(), 'package.json'))['hayspec'] || {};
  const custom = argv || {};
  return {
    name: custom['name'] || defaults['name'] || '',
    description: custom['description'] || defaults['description'] || '',
    require: custom['require'] || defaults['require'] || [],
    match: custom['match'] || defaults['match'] || [],
  };
}
