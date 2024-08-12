import { IIndex, ITimestamp } from './general.model';
export interface ItemModel {
  name: string;
  code: string;
  description?: string | null;
  side_effect?: string | null;
  usage?: string | null;
  active_ingredient?: string | null;
  drug_interactions?: string | null;
  category?: string | null;
  image?: string | null;
  status?: string | null;
}

export interface IItem extends ItemModel, IIndex, ITimestamp {}
