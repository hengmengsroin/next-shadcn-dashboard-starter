import { type IItem } from '../models/item.model';
import { CrudBaseService } from './crudBaseServices';

class ItemApi extends CrudBaseService<IItem> {
  constructor() {
    super();
    this.basePath = 'items';
  }
}

export const itemAPI = new ItemApi();
