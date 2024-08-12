import { IIndex, ITimestamp } from './general.model';
export interface PlanModel {
  _id: string;
  name: string;
  price: number;
  duration: number;
  status?: string;
}

export interface IPlan extends PlanModel, IIndex, ITimestamp {}
