import * as cproc from 'child_process';
import * as util from 'util';

export const exec = util.promisify(cproc.exec);
