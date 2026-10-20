import {register0} from './services/foundation.js';
import {register1} from './services/calculation.js';
import {register2} from './services/data-and-editors.js';
import {register3} from './services/files-and-planning.js';
import {register4} from './services/review.js';
import {steps0} from './initializers/core-tools.js';
import {steps1} from './initializers/workflows.js';
import {steps2} from './initializers/device-controls.js';
import {steps3} from './initializers/workspace-refinements.js';

export const id="shared/utilities";
export function register(__studio33){
  register0(__studio33);
  register1(__studio33);
  register2(__studio33);
  register3(__studio33);
  register4(__studio33);
}
export const steps=[...steps0,...steps1,...steps2,...steps3];
