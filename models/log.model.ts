import { IIndex, ITimestamp } from './general.model';
export interface LogModel {
  _id: string;
  action: string;
  description: string;
  model: string;
  record: string;
  user: string;
  status: string;
  organization?: string;
}

export interface ILogItem {
  date: Date;
  count: number;
}
export interface ILog extends LogModel, IIndex, ITimestamp {}
