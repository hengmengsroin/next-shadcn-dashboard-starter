import { IIndex, ITimestamp } from './general.model';
import { IOrg } from './org.model';

export interface SocialAccount {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}

export interface UserModel {
  id?: string;
  name: string;
  email: string;
  role: string;
  organization?: string;
  image?: string;
  status?: string;
}

export interface IUser extends UserModel, IIndex, ITimestamp {}
