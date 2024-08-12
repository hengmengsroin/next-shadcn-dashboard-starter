import { type ILog, type ILogItem } from '../models/log.model';
import { CrudBaseService } from './crudBaseServices';

class LogApi extends CrudBaseService<ILog> {
  constructor() {
    super();
    this.basePath = 'logs';
  }

  async getModels(query: any, token: string): Promise<string[]> {
    const result = await this.baseHttp.getRequest(
      this.basePath + '/models',
      query,
      'get',
      token
    );
    return result;
  }

  async getActions(query: any, token: string): Promise<string[]> {
    const result = await this.baseHttp.getRequest(
      this.basePath + '/actions',
      query,
      'get',
      token
    );
    return result;
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

export const logAPI = new LogApi();
