import axios, {
  AxiosError,
  type AxiosResponse,
  type AxiosInstance
} from 'axios';
import { env } from '@/env';

export class BaseHttp {
  baseUrl: string;
  apiClient: AxiosInstance;
  constructor() {
    this.baseUrl = `${env.API_URL}/api`;
    this.apiClient = axios.create({ baseURL: this.baseUrl });
  }

  async postRequest(
    path: string,
    data: unknown,
    method?: string,
    token?: string
  ) {
    try {
      let res: AxiosResponse;
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      switch (method) {
        case 'put':
          res = await this.apiClient.put(path, data, {
            headers: headers
          });
          break;
        case 'patch':
          res = await this.apiClient.patch(path, data, {
            headers: headers
          });
          break;
        default:
          res = await this.apiClient.post(path, data, {
            headers: headers
          });
      }
      const result = res.data;
      console.log({ result });

      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error as AxiosError;
        const data: any = err.response?.data;
        console.error(data);
        throw new Error(data.message);
      }
      throw error;
    }
  }

  async getRequest(
    path: string,
    params?: unknown,
    method = 'get',
    token?: string
  ) {
    try {
      let res: AxiosResponse;
      const option = {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        params: params
      };
      // console.log("option", params);
      switch (method) {
        case 'delete':
          res = await this.apiClient.delete(path, option);
        default:
          res = await this.apiClient.get(path, option);
      }
      const result = res.data;
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error as AxiosError;
        const data: any = err.response?.data;
        console.error({ message: data.message });
        throw data.message;
      } else {
        throw error;
      }
    }
  }
}
