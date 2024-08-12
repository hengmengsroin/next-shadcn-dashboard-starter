import { type IUser } from '../models/user.model';
import { CrudBaseService } from './crudBaseServices';

class UserApi extends CrudBaseService<IUser> {
  constructor() {
    super();
    this.basePath = 'users';
  }

  async resetPassword(input: {
    email: string;
    password: string;
    code: string;
  }): Promise<IUser> {
    const result = await this.baseHttp.postRequest(
      '/users/reset-password',
      input,
      'post',
      ''
    );
    return result;
  }

  async signUp(input: {
    email: string;
    name: string;
    password: string;
    code: string;
  }): Promise<IUser> {
    const result = await this.baseHttp.postRequest(
      '/signUp',
      input,
      'post',
      ''
    );
    return result;
  }
}

export const userAPI = new UserApi();
