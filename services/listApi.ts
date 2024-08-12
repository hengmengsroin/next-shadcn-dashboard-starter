import { type IList } from '../models/list.model';
import { type ILogItem } from '../models/log.model';
import { CrudBaseService } from './crudBaseServices';

class ListApi extends CrudBaseService<IList> {
  constructor() {
    super();
    this.basePath = 'lists';
  }

  async getLogChart(query: any, token: string): Promise<ILogItem[]> {
    const result = await this.baseHttp.getRequest(
      this.basePath + '/chart',
      query,
      'get',
      token
    );
    return result;
  }
}

export const listAPI = new ListApi();
