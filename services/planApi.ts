import { type IPlan } from '../models/plan.model';
import { CrudBaseService } from './crudBaseServices';

class PlanApi extends CrudBaseService<IPlan> {
  constructor() {
    super();
    this.basePath = 'plans';
  }
}

export const planAPI = new PlanApi();
