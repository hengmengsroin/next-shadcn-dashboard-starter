import { IIndex, ITimestamp } from './general.model';
import { IPlan, PlanModel } from './plan.model';
export interface OrgModel {
  _id: string;
  name: string;
  scheme?: number;
  subscription?: IPlan;
  subscribedAt?: string;
  expiredAt?: string;
  status?: string;
}

export interface IOrg extends OrgModel, IIndex, ITimestamp {}
