import { IIndex, ITimestamp } from './general.model';

export interface ProductModel {
  name: string;
  code?: string;
  cost?: number;
  price?: number;
  note?: string;
  quantity?: number;
  organization?: string;
  status?: string;
}

export interface IProductChartItem {
  name: string;
  _id: string;
  count: number;
}
export interface IProduct extends ProductModel, IIndex, ITimestamp {}
