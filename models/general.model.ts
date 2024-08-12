export interface ITimestamp {
  createdAt: string;
  updatedAt: string;
}

export interface IIndex {
  index: number;
  _id: string;
}

export interface IDashboard {
  totalUser: number;
  totalProduct: number;
  totalOrganization: number;
  totalOrder: number;
  totalItem: number;
  totalList: number;
  totalToken: number;
  totalExpense: number;
  totalLog: number;
}
export interface ISetting {
  _id: string;
  key: string;
  value: string;
}
