import { IIndex, ITimestamp } from './general.model';
export interface ListItemSchema {
  product: string;
  name: string;
  code: string;
  quantity: number;
  uom: string;
  cost: number;
  multiplier: number;
  status: string;
}

export interface ListModel {
  seller: string;
  items: ListItemSchema[];
  remark?: string;
  ordered_date?: string;
  organization?: string;
  received_date?: string;
  synced_date?: string;
  status: string;
}

export interface IList extends ListModel, IIndex, ITimestamp {}
