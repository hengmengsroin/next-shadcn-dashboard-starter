import { type IUnit } from '../models/unit.model';
import { CrudBaseService } from './crudBaseServices';

class UnitApi extends CrudBaseService<IUnit> {
  constructor() {
    super();
    this.basePath = 'units';
  }
}

export const unitAPI = new UnitApi();
