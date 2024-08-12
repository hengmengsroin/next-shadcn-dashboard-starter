import { type IResponse } from './../models/response.model';
import { BaseHttp } from './baseHttp';

export class CrudBaseService<T> {
  protected basePath: string;
  protected baseHttp: BaseHttp;
  constructor() {
    this.basePath = '';
    this.baseHttp = new BaseHttp();
  }

  getAll(params?: any, token?: string): Promise<IResponse<T>> {
    return this.baseHttp.getRequest(this.basePath, params, 'get', token);
  }

  getOne(id: string, token?: string): Promise<T> {
    return this.baseHttp.getRequest(this.basePath + '/' + id, {}, 'get', token);
  }

  create(data: any, token?: string): Promise<T> {
    return this.baseHttp.postRequest(this.basePath, data, 'post', token);
  }

  put(id: string, data: any): Promise<T> {
    return this.baseHttp.postRequest(this.basePath + '/' + id, data, 'put');
  }

  update(id: string, data: any, token?: string): Promise<T> {
    return this.baseHttp.postRequest(
      this.basePath + '/' + id,
      data,
      'patch',
      token
    );
  }

  delete(id: string, token?: string): Promise<T> {
    return this.baseHttp.getRequest(
      this.basePath + '/' + id,
      {},
      'delete',
      token
    );
  }
}
