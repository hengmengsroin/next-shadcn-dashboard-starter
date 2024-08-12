import { BaseHttp } from './baseHttp';
import type { IUser } from '../models/user.model';
import type { IDashboard, ISetting } from '../models/general.model';
import type { AuthModel } from '../models/auth.model';

class GeneralApi {
  protected baseHttp: BaseHttp;

  constructor() {
    this.baseHttp = new BaseHttp();
  }

  async getDashboardInfo(token: string): Promise<IDashboard> {
    const result = await this.baseHttp.getRequest(
      '/dashboard',
      {},
      'get',
      token
    );
    return result;
  }

  async loginWithEmail(email: string, password: string): Promise<AuthModel> {
    const result = await this.baseHttp.postRequest('/auth/login', {
      email,
      password
    });
    return result;
  }

  async loginWithGoogle(
    id: string,
    name?: string,
    email?: string,
    image?: string
  ): Promise<IUser> {
    const result = await this.baseHttp.postRequest('/login-google', {
      email,
      id,
      name,
      image
    });
    return result;
  }

  getImageUrl(id?: string) {
    if (!id) return undefined;
    return `${this.baseHttp.baseUrl}/files/${id}`;
  }

  async changePassword(
    current_pwd: string,
    new_pwd: string,
    token: string
  ): Promise<boolean> {
    const result = await this.baseHttp.postRequest(
      '/change-pwd',
      { current_pwd, new_pwd },
      'post',
      token
    );
    return result;
  }

  async sendResetPwdEmailVerificationMail(email: string): Promise<boolean> {
    const result = await this.baseHttp.postRequest(
      '/send-reset-email-verification-code',
      { email },
      'post',
      ''
    );
    return result;
  }

  async sendVerificationCodeMail(email: string): Promise<boolean> {
    const result = await this.baseHttp.postRequest(
      '/send-verification-code',
      { email },
      'post',
      ''
    );
    return result;
  }

  async addEmail(email: string, token: string): Promise<boolean> {
    const result = await this.baseHttp.postRequest(
      '/settings/add-email',
      { email },
      'post',
      token
    );
    return result;
  }

  async sendContact(input: {
    name: string;
    phone: string;
    subject: string;
  }): Promise<boolean> {
    const result = await this.baseHttp.postRequest(
      '/contact',
      input,
      'post',
      ''
    );
    return result;
  }

  async uploadQrcode(file: string, token: string): Promise<boolean> {
    const result = await this.baseHttp.postRequest(
      '/settings/upload-qrcode',
      { file },
      'post',
      token
    );
    return result;
  }

  async getSettings(key: string, token: string): Promise<ISetting[]> {
    const result = await this.baseHttp.getRequest(
      `/settings/${key}`,
      {},
      'get',
      token
    );
    return result;
  }

  async deleteSetting(id: string, token: string): Promise<ISetting[]> {
    const result = await this.baseHttp.getRequest(
      `/settings/${id}`,
      {},
      'delete',
      token
    );
    return result;
  }

  // refresh token
  async refreshToken(refreshToken: string): Promise<{
    access_token: string;
    access_expires: string;
    refresh_token: string;
    refresh_expires: string;
  }> {
    const result = await this.baseHttp.postRequest(
      '/auth/refresh-tokens',
      {
        refreshToken
      },
      'post'
    );
    return result;
  }
}

export const generalApi = new GeneralApi();
