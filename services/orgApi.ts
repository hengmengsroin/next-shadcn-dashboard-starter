import { type IOrg } from '../models/org.model';
import { CrudBaseService } from './crudBaseServices';

class OrgApi extends CrudBaseService<IOrg> {
  constructor() {
    super();
    this.basePath = 'organizations';
  }

  async subscribePlan(
    id: string,
    plan: string,
    startDate: string,
    token: string
  ): Promise<boolean> {
    const result = await this.baseHttp.postRequest(
      `${this.basePath}/${id}/plan`,
      {
        plan,
        startDate
      },
      'put',
      token
    );
    return result;
  }
}

export const orgAPI = new OrgApi();
