import { IIndex, ITimestamp } from './general.model';
export interface QuestionModel {
  _id: string;
  name: string;
  phone: string;
  subject: string;
}

export interface IQuestion extends QuestionModel, IIndex, ITimestamp {}
