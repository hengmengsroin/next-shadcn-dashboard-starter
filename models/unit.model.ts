import { IIndex, ITimestamp } from './general.model';
export interface UnitModel {
  _id: string;
  name: string;
  nameEn?: string;
  status?: string;
}

export interface IUnit extends UnitModel, IIndex, ITimestamp {}
