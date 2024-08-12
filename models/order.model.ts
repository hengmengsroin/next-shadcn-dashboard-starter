import { IIndex, ITimestamp } from './general.model';
export interface OrderItemSchema {
  product?: string;
  code?: string;
  name: string;
  uom?: string;
  quantity: number;
  price: number;
  cost: number;
  discount?: number;
  discount_type?: string;
  total_discount?: number;
  total_amount: number;
  total_cost: number;
  total_revenue: number;
}

export interface OrderModel {
  number: number;
  items: OrderItemSchema[];
  remark?: string;
  total_cost: number;
  total_amount: number;
  total_revenue: number;
  organization?: string;
  payment_method?: string;
  discount?: number;
  discount_amount?: number;
  discount_type?: string;
  total_discount?: number;
}

export interface IRevenueItem {
  date: Date;
  revenue: number;
}

export interface ISaleItem {
  date: Date;
  revenue: number;
  cost: number;
  sale: number;
}

export interface IOrder extends OrderModel, IIndex, ITimestamp {}
