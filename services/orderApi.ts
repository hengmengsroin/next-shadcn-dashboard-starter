/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type IOrder,
  type IRevenueItem,
  type ISaleItem
} from '../models/order.model';
import { CrudBaseService } from './crudBaseServices';

class OrderApi extends CrudBaseService<IOrder> {
  constructor() {
    super();
    this.basePath = 'orders';
  }

  async getSaleChart(query: any, token: string): Promise<ISaleItem[]> {
    const result = await this.baseHttp.getRequest(
      this.basePath + '/sale-chart',
      query,
      'get',
      token
    );
    return result;
  }

  async getRevenueChart(query: any, token: string): Promise<IRevenueItem[]> {
    const result = await this.baseHttp.getRequest(
      this.basePath + '/revenue',
      query,
      'get',
      token
    );
    return result;
  }
}

export const orderApi = new OrderApi();
