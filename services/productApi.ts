import { type IProduct, type IProductChartItem } from '../models/product.model';
import { CrudBaseService } from './crudBaseServices';

class ProductApi extends CrudBaseService<IProduct> {
  constructor() {
    super();
    this.basePath = 'products';
  }

  import(data: any, token: string) {
    return this.baseHttp.postRequest(
      this.basePath + '/many',
      data,
      'post',
      token
    );
  }

  async getProductChart(
    query: any,
    token: string
  ): Promise<IProductChartItem[]> {
    const result = await this.baseHttp.getRequest(
      this.basePath + '/chart',
      query,
      'get',
      token
    );

    return result;
  }
}

export const productApi = new ProductApi();
